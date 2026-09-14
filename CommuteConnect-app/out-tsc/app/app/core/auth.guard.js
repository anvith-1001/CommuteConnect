import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
export const authGuard = (_route, state) => inject(AuthService).signedIn() ||
    inject(Router).createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
export const guestGuard = () => !inject(AuthService).signedIn() || inject(Router).createUrlTree(['/commutes']);