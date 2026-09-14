import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (_route, state) =>
  inject(AuthService).signedIn() ||
  inject(Router).createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });

export const guestGuard: CanActivateFn = () =>
  !inject(AuthService).signedIn() || inject(Router).createUrlTree(['/commutes']);