import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CombinedComponent } from './layouts/combined/combined.component';

export const routes: Routes = [
 
  {
    path: '',
    component: CombinedComponent,
    data: { showTopNavigation: true },
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.routes').then((m) => m.DashboardRoutes),
        canActivate: [AuthGuard, RoleGuard], // Protect this route
        data: { roles: ['moderator'] } // Only accessible by admin
      },
    ],
  },
  {
    path: '',
    component: CombinedComponent,
    data: { showTopNavigation: false },
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '',
    component: CombinedComponent,
    data: { showTopNavigation: true },
    children: [
      {
        path: 'trading',
        loadChildren: () =>
          import('./pages/trading/trading.routes').then(
            (m) => m.TradingRoutes
          ),
        canActivate: [AuthGuard, RoleGuard], // Protect this route
        data: { roles: ['moderator'] } // Only accessible by admin
      },
    ],
  },
  {
    path: '',
    component: CombinedComponent,
    data: { showTopNavigation: true },
    children: [
      {
        path: 'account',
        loadChildren: () =>
          import('./pages/account/account.routes').then(
            (m) => m.AccountRoutes
          ),
        canActivate: [AuthGuard, RoleGuard], // Protect this route
        data: { roles: ['moderator'] } // Only accessible by admin
      },
    ],
  },
  {
    path: '',
    component: CombinedComponent,
    data: { showTopNavigation: false },
    children: [
      {
        path: 'verify',
        loadChildren: () =>
          import('./pages/verify-user/verify-user.routes').then(
            (m) => m.VerifyRoutes
          ),
      },
    ],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent // Generic unauthorized page
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];