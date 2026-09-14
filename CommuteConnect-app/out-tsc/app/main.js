import { bootstrapApplication } from '@angular/platform-browser';
import { inject, provideAppInitializer, provideZonelessChangeDetection, } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AuthService } from './app/core/auth.service';
import { authInterceptor } from './app/core/auth.interceptor';
bootstrapApplication(AppComponent, {
    providers: [
        provideZonelessChangeDetection(),
        provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideAppInitializer(() => inject(AuthService).refresh()),
    ],
}).catch(() => {
    document.body.textContent = 'CommuteConnect could not start. Please reload this page.';
});