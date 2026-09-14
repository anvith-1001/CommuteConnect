import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import * as L from 'leaflet';
import { Coordinates } from '../core/models';
import { GOOGLE_MAPS_API_KEY } from '../generated-config';
import { ApiService } from '../utils/api';

export type MapPointKind = 'origin' | 'via' | 'destination' | 'pickup';

export interface MapSelection {
  kind: MapPointKind;
  coordinates: Coordinates;
}

@Component({
  selector: 'cc-map-picker',
  templateUrl: './map-picker.component.html',
})
export class MapPickerComponent implements AfterViewInit, OnDestroy {
  private api = inject(ApiService);

  mode = input<'route' | 'view'>('route');

  initialPoints = input<Partial<Record<MapPointKind, Coordinates>>>({});

  pointSelected = output<MapSelection>();

  closed = output<void>();

  mapElement = viewChild.required<ElementRef<HTMLElement>>('map');

  loading = signal(true);

  error = signal('');

  provider = signal<'google' | 'openstreetmap' | null>(null);

  selectedKind = signal<MapPointKind>('origin');

  private googleMap?: google.maps.Map;

  private googleMarkers = new Map<MapPointKind, google.maps.Marker>();

  private googleRoute?: google.maps.Polyline;

  private googleProjection?: google.maps.OverlayView;

  private leafletMap?: L.Map;

  private leafletMarkers = new Map<MapPointKind, L.Marker>();

  private leafletRoute?: L.Polyline;

  private mainElement?: HTMLElement;

  private previousMainOverflow = '';

  private savedScrollTop = 0;

  private previousHtmlOverflow = '';

  private previousBodyOverflow = '';

  private destroyed = false;

  private previousGoogleAuthFailure?: () => void;

  async ngAfterViewInit(): Promise<void> {
    this.lockPageScroll();
    this.selectedKind.set('origin');

    if (GOOGLE_MAPS_API_KEY) {
      try {
        const googleWindow = window as typeof window & {
          gm_authFailure?: () => void;
        };
        this.previousGoogleAuthFailure = googleWindow.gm_authFailure;
        googleWindow.gm_authFailure = () => this.useOpenStreetMapFallback();
        await Promise.race([
          this.initializeGoogleMaps(),
          new Promise<never>((_resolve, reject) => {
            window.setTimeout(() => reject(new Error('Google Maps timed out.')), 6000);
          }),
        ]);
        this.provider.set('google');
        this.loading.set(false);

        return;
      } catch {
        this.destroyGoogleMaps();
      }
    }

    try {
      this.mapElement().nativeElement.replaceChildren();
      this.initializeOpenStreetMap();
      this.provider.set('openstreetmap');
    } catch {
      this.error.set('The map could not be loaded. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.destroyGoogleMaps();
    this.leafletMap?.remove();
    this.unlockPageScroll();
    const googleWindow = window as typeof window & {
      gm_authFailure?: () => void;
    };
    googleWindow.gm_authFailure = this.previousGoogleAuthFailure;
  }

  choose(kind: MapPointKind): void {
    this.selectedKind.set(kind);
  }

  private async initializeGoogleMaps(): Promise<void> {
    setOptions({ key: GOOGLE_MAPS_API_KEY, v: 'weekly' });
    const { Map } = await importLibrary('maps');
    const map = new Map(this.mapElement().nativeElement, {
      center: { lat: 12.9716, lng: 77.5946 },
      zoom: 12,
      clickableIcons: false,
      disableDefaultUI: true,
      zoomControl: true,
      styles: this.googleStyles(),
    });
    this.googleMap = map;
    this.googleProjection = new google.maps.OverlayView();
    this.googleProjection.onAdd = () => undefined;
    this.googleProjection.draw = () => undefined;
    this.googleProjection.onRemove = () => undefined;
    this.googleProjection.setMap(map);

    requestAnimationFrame(() => {
      google.maps.event.trigger(map, 'resize');
      this.fitGoogleMarkers();
    });

    for (const [kind, coordinates] of Object.entries(this.initialPoints())) {
      this.placeGoogleMarker(kind as MapPointKind, coordinates);
    }

    this.fitGoogleMarkers();
    await this.drawGoogleRoute();

  }

  private initializeOpenStreetMap(): void {
    this.leafletMap = L.map(this.mapElement().nativeElement, {
      attributionControl: true,
      zoomControl: true,
    }).setView([12.9716, 77.5946], 12);

    requestAnimationFrame(() => {
      this.leafletMap?.invalidateSize();
      this.fitLeafletMarkers();
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.leafletMap);

    for (const [kind, coordinates] of Object.entries(this.initialPoints())) {
      this.placeLeafletMarker(kind as MapPointKind, coordinates);
    }

    this.fitLeafletMarkers();
    void this.drawLeafletRoute();

  }

  private useOpenStreetMapFallback(): void {
    if (this.destroyed || this.provider() === 'openstreetmap') {
      return;
    }

    try {
      this.destroyGoogleMaps();
      this.leafletMap?.remove();
      this.mapElement().nativeElement.replaceChildren();
      this.initializeOpenStreetMap();
      this.provider.set('openstreetmap');
      this.error.set('');
    } catch {
      this.error.set('The map could not be loaded. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }

  placeFromPointer(event: MouseEvent): void {
    if (this.mode() === 'view' || this.loading() || this.error()) {
      return;
    }

    const target = event.target as HTMLElement | null;

    if (target?.closest('.gm-control-active, .gmnoprint, .leaflet-control')) {
      return;
    }

    const element = this.mapElement().nativeElement;
    const bounds = element.getBoundingClientRect();
    const point = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
    let coordinates: Coordinates | null = null;

    if (this.googleMap && this.googleProjection) {
      const latLng = this.googleProjection
        .getProjection()
        .fromContainerPixelToLatLng(new google.maps.Point(point.x, point.y));

      if (latLng) {
        coordinates = { lat: latLng.lat(), lng: latLng.lng() };
      }
    } else if (this.leafletMap) {
      const latLng = this.leafletMap.containerPointToLatLng([point.x, point.y]);
      coordinates = { lat: latLng.lat, lng: latLng.lng };
    }

    if (!coordinates) {
      return;
    }

    const kind = this.selectedKind();

    if (this.googleMap) {
      this.placeGoogleMarker(kind, coordinates);
      this.fitGoogleMarkers();
      void this.drawGoogleRoute();
    } else {
      this.placeLeafletMarker(kind, coordinates);
      this.fitLeafletMarkers();
      void this.drawLeafletRoute();
    }

    this.pointSelected.emit({ kind, coordinates });
  }

  onBackdropScroll(event: Event): void {
    const target = event.target as HTMLElement | null;

    if (!target?.closest('.map-canvas')) {
      event.preventDefault();
    }
  }

  private markerColor(kind: MapPointKind): string {
    switch (kind) {
      case 'origin':
        return '#1e40af';
      case 'via':
        return '#7c3aed';
      case 'destination':
        return '#dc2626';
      case 'pickup':
        return '#059669';
    }
  }

  private googleMarkerIcon(kind: MapPointKind): google.maps.Symbol {
    return {
      path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
      fillColor: this.markerColor(kind),
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 2,
      scale: 1.6,
      anchor: new google.maps.Point(12, 22),
      labelOrigin: new google.maps.Point(12, 9),
    };
  }

  private placeGoogleMarker(kind: MapPointKind, coordinates: Coordinates): void {
    if (!this.googleMap) {
      return;
    }

    this.googleMarkers.get(kind)?.setMap(null);
    this.googleMarkers.set(
      kind,
      new google.maps.Marker({
        map: this.googleMap,
        position: coordinates,
        icon: this.googleMarkerIcon(kind),
        label: {
          text: this.shortLabel(kind),
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: '11px',
        },
        title: this.label(kind),
      }),
    );
  }

  private placeLeafletMarker(kind: MapPointKind, coordinates: Coordinates): void {
    if (!this.leafletMap) {
      return;
    }

    this.leafletMarkers.get(kind)?.remove();
    const marker = L.marker([coordinates.lat, coordinates.lng], {
      icon: L.divIcon({
        className: 'map-pin-wrapper',
        html: `<span class="map-pin map-pin-${kind}">${this.shortLabel(kind)}</span>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      }),
    }).addTo(this.leafletMap);
    marker.bindTooltip(this.label(kind));
    this.leafletMarkers.set(kind, marker);
  }

  private fitGoogleMarkers(): void {
    if (!this.googleMap || !this.googleMarkers.size) {
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    this.googleMarkers.forEach((marker) => bounds.extend(marker.getPosition()!));
    this.googleMap.fitBounds(bounds, 44);
  }

  private fitLeafletMarkers(): void {
    if (!this.leafletMap || !this.leafletMarkers.size) {
      return;
    }

    const bounds = L.latLngBounds(
      [...this.leafletMarkers.values()].map((marker) => marker.getLatLng()),
    );
    this.leafletMap.fitBounds(bounds, { padding: [44, 44], maxZoom: 16 });
  }

  private destroyGoogleMaps(): void {
    this.googleMarkers.forEach((marker) => marker.setMap(null));
    this.googleMarkers.clear();
    this.googleRoute?.setMap(null);
    this.googleProjection?.setMap(null);
    this.googleProjection = undefined;
    this.googleMap = undefined;
  }

  private async drawGoogleRoute(): Promise<void> {
    if (!this.googleMap) {
      return;
    }

    const points = this.googleRoutePoints();

    if (points.length < 2) {
      this.googleRoute?.setMap(null);

      return;
    }

    try {
      const route = await this.api.getRoute(points);

      if (route && route.length >= 2) {
        this.setGoogleRoute(route, route === points);

        return;
      }
    } catch {
      // Fall through to straight-line polyline
    }

    this.setGoogleRoute(points, true);
  }

  private async drawLeafletRoute(): Promise<void> {
    if (!this.leafletMap) {
      return;
    }

    const points = this.leafletRoutePoints();

    if (points.length < 2) {
      this.leafletRoute?.remove();

      return;
    }

    try {
      const route = await this.api.getRoute(points);

      if (route && route.length >= 2) {
        this.setLeafletRoute(route, route === points);

        return;
      }
    } catch {
      // Fall through
    }

    this.setLeafletRoute(points, true);
  }

  private googleRoutePoints(): Coordinates[] {
    return (['origin', 'via', 'destination'] as MapPointKind[])
      .map((kind) => this.googleMarkers.get(kind)?.getPosition())
      .filter((position): position is google.maps.LatLng => !!position)
      .map((position) => ({ lat: position.lat(), lng: position.lng() }));
  }

  private leafletRoutePoints(): Coordinates[] {
    return (['origin', 'via', 'destination'] as MapPointKind[])
      .map((kind) => this.leafletMarkers.get(kind)?.getLatLng())
      .filter((position): position is L.LatLng => !!position)
      .map((position) => ({ lat: position.lat, lng: position.lng }));
  }

  private setGoogleRoute(points: Coordinates[], fallback: boolean): void {
    if (!this.googleMap || points.length < 2) {
      return;
    }

    this.googleRoute?.setMap(null);
    this.googleRoute = new google.maps.Polyline({
      map: this.googleMap,
      path: points,
      strokeColor: '#1d4ed8',
      strokeOpacity: fallback ? 0.75 : 0.9,
      strokeWeight: 5,
    });
    const bounds = new google.maps.LatLngBounds();
    points.forEach((point) => bounds.extend(point));
    this.googleMap.fitBounds(bounds, 44);
  }

  private setLeafletRoute(points: Coordinates[], fallback: boolean): void {
    if (!this.leafletMap || points.length < 2) {
      return;
    }

    this.leafletRoute?.remove();
    this.leafletRoute = L.polyline(
      points.map((point) => [point.lat, point.lng] as L.LatLngTuple),
      {
        color: '#1d4ed8',
        dashArray: fallback ? '8 8' : undefined,
        opacity: fallback ? 0.75 : 0.9,
        weight: 5,
      },
    ).addTo(this.leafletMap);
    this.leafletMap.fitBounds(this.leafletRoute.getBounds(), {
      padding: [44, 44],
      maxZoom: 16,
    });
  }

  private lockPageScroll(): void {
    this.mainElement = document.querySelector('main') || undefined;

    if (this.mainElement) {
      this.savedScrollTop = this.mainElement.scrollTop;
      this.previousMainOverflow = this.mainElement.style.overflow;
      this.mainElement.style.overflow = 'hidden';
    }

    this.previousHtmlOverflow = document.documentElement.style.overflow;
    this.previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.classList.add('map-modal-open');
  }

  private unlockPageScroll(): void {
    if (this.mainElement) {
      this.mainElement.style.overflow = this.previousMainOverflow;
      this.mainElement.scrollTop = this.savedScrollTop;
    }

    document.documentElement.style.overflow = this.previousHtmlOverflow;
    document.body.style.overflow = this.previousBodyOverflow;
    document.body.classList.remove('map-modal-open');
  }

  private shortLabel(kind: MapPointKind): string {
    return { origin: 'O', via: 'V', destination: 'D', pickup: 'P' }[kind];
  }

  private label(kind: MapPointKind): string {
    return kind === 'pickup'
      ? 'Passenger pickup'
      : kind.charAt(0).toUpperCase() + kind.slice(1);
  }

  private googleStyles(): google.maps.MapTypeStyle[] {
    return [
      { elementType: 'geometry', stylers: [{ color: '#f2f2f0' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#555555' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
      { featureType: 'poi', stylers: [{ visibility: 'off' }] },
      { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
      { featureType: 'transit', stylers: [{ visibility: 'off' }] },
      { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#ddddda' }] },
    ];
  }
}