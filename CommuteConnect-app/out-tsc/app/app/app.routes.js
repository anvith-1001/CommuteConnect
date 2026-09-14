import { authGuard, guestGuard } from './core/auth.guard';
export const routes = [
    {
        path: 'login',
        canActivate: [guestGuard],
        loadComponent: () => import('./features/auth/auth.page').then((m) => m.AuthPage),
    },
    {
        path: 'register',
        canActivate: [guestGuard],
        loadComponent: () => import('./features/auth/auth.page').then((m) => m.AuthPage),
    },
    {
        path: 'commutes',
        canActivate: [authGuard],
        loadComponent: () => import('./features/posts/list.page').then((m) => m.ListPage),
    },
    {
        path: 'commutes/new',
        canActivate: [authGuard],
        loadComponent: () => import('./features/posts/editor.page').then((m) => m.EditorPage),
    },
    {
        path: 'commutes/:id/edit',
        canActivate: [authGuard],
        loadComponent: () => import('./features/posts/editor.page').then((m) => m.EditorPage),
    },
    {
        path: 'commutes/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./features/posts/detail.page').then((m) => m.DetailPage),
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./features/dashboard/dashboard.page').then((m) => m.DashboardPage),
    },
    {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () => import('./features/profile/profile.page').then((m) => m.ProfilePage),
    },
    {
        path: 'history',
        canActivate: [authGuard],
        loadComponent: () => import('./features/profile/history.component').then((m) => m.HistoryComponent),
    },
    { path: '', pathMatch: 'full', redirectTo: 'commutes' },
    {
        path: '**',
        loadComponent: () => import('./shared/not-found.page').then((m) => m.NotFoundPage),
    },
];