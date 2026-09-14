import { Component, inject, input, output, signal, viewChild, } from '@angular/core';
import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import * as L from 'leaflet';
import { GOOGLE_MAPS_API_KEY } from '../generated-config';
import { ApiService } from '../utils/api';
import * as i0 from "@angular/core";
const _c0 = ["map"];
function MapPickerComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 9);
    i0.ɵɵtext(1, "Loading map\u2026");
    i0.ɵɵdomElementEnd();
} }
function MapPickerComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 10);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error());
} }
function MapPickerComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " OpenStreetMap fallback \u00B7 ");
} }
export class MapPickerComponent {
    api = inject(ApiService);
    mode = input('route', ...(ngDevMode ? [{ debugName: "mode" }] : /* istanbul ignore next */ []));
    initialPoints = input({}, ...(ngDevMode ? [{ debugName: "initialPoints" }] : /* istanbul ignore next */ []));
    pointSelected = output();
    closed = output();
    mapElement = viewChild.required('map');
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    error = signal('', ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    provider = signal(null, ...(ngDevMode ? [{ debugName: "provider" }] : /* istanbul ignore next */ []));
    selectedKind = signal('origin', ...(ngDevMode ? [{ debugName: "selectedKind" }] : /* istanbul ignore next */ []));
    googleMap;
    googleMarkers = new Map();
    googleRoute;
    googleProjection;
    leafletMap;
    leafletMarkers = new Map();
    leafletRoute;
    mainElement;
    previousMainOverflow = '';
    savedScrollTop = 0;
    previousHtmlOverflow = '';
    previousBodyOverflow = '';
    destroyed = false;
    previousGoogleAuthFailure;
    async ngAfterViewInit() {
        this.lockPageScroll();
        this.selectedKind.set('origin');
        if (GOOGLE_MAPS_API_KEY) {
            try {
                const googleWindow = window;
                this.previousGoogleAuthFailure = googleWindow.gm_authFailure;
                googleWindow.gm_authFailure = () => this.useOpenStreetMapFallback();
                await Promise.race([
                    this.initializeGoogleMaps(),
                    new Promise((_resolve, reject) => {
                        window.setTimeout(() => reject(new Error('Google Maps timed out.')), 6000);
                    }),
                ]);
                this.provider.set('google');
                this.loading.set(false);
                return;
            }
            catch {
                this.destroyGoogleMaps();
            }
        }
        try {
            this.mapElement().nativeElement.replaceChildren();
            this.initializeOpenStreetMap();
            this.provider.set('openstreetmap');
        }
        catch {
            this.error.set('The map could not be loaded. Please try again.');
        }
        finally {
            this.loading.set(false);
        }
    }
    ngOnDestroy() {
        this.destroyed = true;
        this.destroyGoogleMaps();
        this.leafletMap?.remove();
        this.unlockPageScroll();
        const googleWindow = window;
        googleWindow.gm_authFailure = this.previousGoogleAuthFailure;
    }
    choose(kind) {
        this.selectedKind.set(kind);
    }
    async initializeGoogleMaps() {
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
            this.placeGoogleMarker(kind, coordinates);
        }
        this.fitGoogleMarkers();
        await this.drawGoogleRoute();
    }
    initializeOpenStreetMap() {
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
            this.placeLeafletMarker(kind, coordinates);
        }
        this.fitLeafletMarkers();
        void this.drawLeafletRoute();
    }
    useOpenStreetMapFallback() {
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
        }
        catch {
            this.error.set('The map could not be loaded. Please try again.');
        }
        finally {
            this.loading.set(false);
        }
    }
    placeFromPointer(event) {
        if (this.mode() === 'view' || this.loading() || this.error()) {
            return;
        }
        const target = event.target;
        if (target?.closest('.gm-control-active, .gmnoprint, .leaflet-control')) {
            return;
        }
        const element = this.mapElement().nativeElement;
        const bounds = element.getBoundingClientRect();
        const point = {
            x: event.clientX - bounds.left,
            y: event.clientY - bounds.top,
        };
        let coordinates = null;
        if (this.googleMap && this.googleProjection) {
            const latLng = this.googleProjection
                .getProjection()
                .fromContainerPixelToLatLng(new google.maps.Point(point.x, point.y));
            if (latLng) {
                coordinates = { lat: latLng.lat(), lng: latLng.lng() };
            }
        }
        else if (this.leafletMap) {
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
        }
        else {
            this.placeLeafletMarker(kind, coordinates);
            this.fitLeafletMarkers();
            void this.drawLeafletRoute();
        }
        this.pointSelected.emit({ kind, coordinates });
    }
    onBackdropScroll(event) {
        const target = event.target;
        if (!target?.closest('.map-canvas')) {
            event.preventDefault();
        }
    }
    markerColor(kind) {
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
    googleMarkerIcon(kind) {
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
    placeGoogleMarker(kind, coordinates) {
        if (!this.googleMap) {
            return;
        }
        this.googleMarkers.get(kind)?.setMap(null);
        this.googleMarkers.set(kind, new google.maps.Marker({
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
        }));
    }
    placeLeafletMarker(kind, coordinates) {
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
    fitGoogleMarkers() {
        if (!this.googleMap || !this.googleMarkers.size) {
            return;
        }
        const bounds = new google.maps.LatLngBounds();
        this.googleMarkers.forEach((marker) => bounds.extend(marker.getPosition()));
        this.googleMap.fitBounds(bounds, 44);
    }
    fitLeafletMarkers() {
        if (!this.leafletMap || !this.leafletMarkers.size) {
            return;
        }
        const bounds = L.latLngBounds([...this.leafletMarkers.values()].map((marker) => marker.getLatLng()));
        this.leafletMap.fitBounds(bounds, { padding: [44, 44], maxZoom: 16 });
    }
    destroyGoogleMaps() {
        this.googleMarkers.forEach((marker) => marker.setMap(null));
        this.googleMarkers.clear();
        this.googleRoute?.setMap(null);
        this.googleProjection?.setMap(null);
        this.googleProjection = undefined;
        this.googleMap = undefined;
    }
    async drawGoogleRoute() {
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
        }
        catch {
            // Fall through to straight-line polyline
        }
        this.setGoogleRoute(points, true);
    }
    async drawLeafletRoute() {
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
        }
        catch {
            // Fall through
        }
        this.setLeafletRoute(points, true);
    }
    googleRoutePoints() {
        return ['origin', 'via', 'destination']
            .map((kind) => this.googleMarkers.get(kind)?.getPosition())
            .filter((position) => !!position)
            .map((position) => ({ lat: position.lat(), lng: position.lng() }));
    }
    leafletRoutePoints() {
        return ['origin', 'via', 'destination']
            .map((kind) => this.leafletMarkers.get(kind)?.getLatLng())
            .filter((position) => !!position)
            .map((position) => ({ lat: position.lat, lng: position.lng }));
    }
    setGoogleRoute(points, fallback) {
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
    setLeafletRoute(points, fallback) {
        if (!this.leafletMap || points.length < 2) {
            return;
        }
        this.leafletRoute?.remove();
        this.leafletRoute = L.polyline(points.map((point) => [point.lat, point.lng]), {
            color: '#1d4ed8',
            dashArray: fallback ? '8 8' : undefined,
            opacity: fallback ? 0.75 : 0.9,
            weight: 5,
        }).addTo(this.leafletMap);
        this.leafletMap.fitBounds(this.leafletRoute.getBounds(), {
            padding: [44, 44],
            maxZoom: 16,
        });
    }
    lockPageScroll() {
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
    unlockPageScroll() {
        if (this.mainElement) {
            this.mainElement.style.overflow = this.previousMainOverflow;
            this.mainElement.scrollTop = this.savedScrollTop;
        }
        document.documentElement.style.overflow = this.previousHtmlOverflow;
        document.body.style.overflow = this.previousBodyOverflow;
        document.body.classList.remove('map-modal-open');
    }
    shortLabel(kind) {
        return { origin: 'O', via: 'V', destination: 'D', pickup: 'P' }[kind];
    }
    label(kind) {
        return kind === 'pickup'
            ? 'Passenger pickup'
            : kind.charAt(0).toUpperCase() + kind.slice(1);
    }
    googleStyles() {
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
    static ɵfac = function MapPickerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MapPickerComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MapPickerComponent, selectors: [["cc-map-picker"]], viewQuery: function MapPickerComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuerySignal(ctx.mapElement, _c0, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance();
        } }, inputs: { mode: [1, "mode"], initialPoints: [1, "initialPoints"] }, outputs: { pointSelected: "pointSelected", closed: "closed" }, decls: 21, vars: 4, consts: [["map", ""], [1, "dialog-backdrop", "map-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "map-title", 1, "map-dialog", 3, "click"], [1, "map-dialog-heading"], [1, "eyebrow"], ["id", "map-title"], ["type", "button", "aria-label", "Close map", 1, "icon-button", 3, "click"], [1, "map-stage"], ["aria-label", "Interactive commute map", 1, "map-canvas", 3, "click"], ["role", "status", 1, "map-status"], ["role", "alert", 1, "map-status"], [1, "map-dialog-footer"], ["type", "button", 1, "button", 3, "click"]], template: function MapPickerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 1);
            i0.ɵɵdomListener("click", function MapPickerComponent_Template_div_click_0_listener() { return ctx.closed.emit(); });
            i0.ɵɵdomElementStart(1, "section", 2);
            i0.ɵɵdomListener("click", function MapPickerComponent_Template_section_click_1_listener($event) { return $event.stopPropagation(); });
            i0.ɵɵdomElementStart(2, "header", 3)(3, "div")(4, "p", 4);
            i0.ɵɵtext(5, "COMMUTE ORIGIN");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(6, "h2", 5);
            i0.ɵɵtext(7);
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(8, "button", 6);
            i0.ɵɵdomListener("click", function MapPickerComponent_Template_button_click_8_listener() { return ctx.closed.emit(); });
            i0.ɵɵtext(9, " \u00D7 ");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(10, "div", 7)(11, "div", 8, 0);
            i0.ɵɵdomListener("click", function MapPickerComponent_Template_div_click_11_listener($event) { return ctx.placeFromPointer($event); });
            i0.ɵɵdomElementEnd();
            i0.ɵɵconditionalCreate(13, MapPickerComponent_Conditional_13_Template, 2, 0, "div", 9)(14, MapPickerComponent_Conditional_14_Template, 2, 1, "div", 10);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(15, "footer", 11)(16, "p");
            i0.ɵɵconditionalCreate(17, MapPickerComponent_Conditional_17_Template, 1, 0);
            i0.ɵɵtext(18);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(19, "button", 12);
            i0.ɵɵdomListener("click", function MapPickerComponent_Template_button_click_19_listener() { return ctx.closed.emit(); });
            i0.ɵɵtext(20, "Done");
            i0.ɵɵdomElementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate1(" ", ctx.mode() === "route" ? "Pin your starting point" : "Starting point", " ");
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(ctx.loading() ? 13 : ctx.error() ? 14 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.provider() === "openstreetmap" ? 17 : -1);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.mode() === "view" ? "The pin marks the driver\u2019s starting point." : "Tap the map to place the commute origin.", " ");
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MapPickerComponent, [{
        type: Component,
        args: [{ selector: 'cc-map-picker', template: "<div\n  class=\"dialog-backdrop map-backdrop\"\n  (click)=\"closed.emit()\"\n>\n  <section\n    class=\"map-dialog\"\n    role=\"dialog\"\n    aria-modal=\"true\"\n    aria-labelledby=\"map-title\"\n    (click)=\"$event.stopPropagation()\"\n  >\n    <header class=\"map-dialog-heading\">\n      <div>\n        <p class=\"eyebrow\">COMMUTE ORIGIN</p>\n        <h2 id=\"map-title\">\n          {{ mode() === 'route' ? 'Pin your starting point' : 'Starting point' }}\n        </h2>\n      </div>\n      <button class=\"icon-button\" type=\"button\" aria-label=\"Close map\" (click)=\"closed.emit()\">\n        \u00D7\n      </button>\n    </header>\n\n    <div class=\"map-stage\">\n      <div\n        #map\n        class=\"map-canvas\"\n        aria-label=\"Interactive commute map\"\n        (click)=\"placeFromPointer($event)\"\n      ></div>\n      @if (loading()) {\n        <div class=\"map-status\" role=\"status\">Loading map\u2026</div>\n      } @else if (error()) {\n        <div class=\"map-status\" role=\"alert\">{{ error() }}</div>\n      }\n    </div>\n\n    <footer class=\"map-dialog-footer\">\n      <p>\n        @if (provider() === 'openstreetmap') {\n          OpenStreetMap fallback \u00B7\n        }\n        {{\n          mode() === 'view'\n            ? 'The pin marks the driver\u2019s starting point.'\n            : 'Tap the map to place the commute origin.'\n        }}\n      </p>\n      <button class=\"button\" type=\"button\" (click)=\"closed.emit()\">Done</button>\n    </footer>\n  </section>\n</div>\n" }]
    }], null, { mode: [{ type: i0.Input, args: [{ isSignal: true, alias: "mode", required: false }] }], initialPoints: [{ type: i0.Input, args: [{ isSignal: true, alias: "initialPoints", required: false }] }], pointSelected: [{ type: i0.Output, args: ["pointSelected"] }], closed: [{ type: i0.Output, args: ["closed"] }], mapElement: [{ type: i0.ViewChild, args: ['map', { isSignal: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MapPickerComponent, { className: "MapPickerComponent", filePath: "src/app/shared/map-picker.component.ts", lineNumber: 29 }); })();