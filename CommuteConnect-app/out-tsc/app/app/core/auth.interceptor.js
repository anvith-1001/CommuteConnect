import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, from, switchMap, throwError, timeout } from 'rxjs';
import { AuthService } from './auth.service';
import { isApiRequest, isAuthRequest } from '../utils/api';
export const authInterceptor = (req, next) => {
    if (!isApiRequest(req.url) || isAuthRequest(req.url)) {
        return next(req).pipe(timeout(20000));
    }
    const auth = inject(AuthService);
    const router = inject(Router);
    const authorize = () => req.clone({
        setHeaders: auth.token() ? { Authorization: `Bearer ${auth.token()}` } : {},
    });
    return next(authorize()).pipe(timeout(20000), catchError((error) => {
        if (error.status !== 401) {
            return throwError(() => error);
        }
        return from(auth.refresh()).pipe(switchMap((ok) => {
            if (ok) {
                return next(authorize()).pipe(timeout(20000));
            }
            void router.navigate(['/login'], { queryParams: { returnUrl: router.url } });
            return throwError(() => error);
        }));
    }));
};