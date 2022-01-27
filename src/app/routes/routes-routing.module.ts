import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '../theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { AuthGuard } from '@core/authentication/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard', titleI18n: 'dashboard' },canActivate: [AuthGuard]
      },
      {
        path: 'dossier',
        loadChildren: () => import('./dossier/dossier.module').then(m => m.DossierModule),
        data: { title: 'Gestion des dossiers', titleI18n: 'dossier' },canActivate: [AuthGuard]
      },
      {
        path: 'utilisateur',
        loadChildren: () =>
          import('./utilisateur/utilisateur.module').then(m => m.UtilisateurModule),
        data: { title: 'Gestion des utilisateurs', titleI18n: 'utilisateur' },canActivate: [AuthGuard]
      },
      {
        path: 'clients',
        loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule),
        data: { title: 'Gestion des clients', titleI18n: 'clients' },/* canActivateChild: [AuthGuard] */
      },
      {
        path: 'documents',
        loadChildren: () => import('./document/document.module').then(m => m.DocumentModule),
        data: { title: 'Gestion des Documents', titleI18n: 'documents' },canActivate: [AuthGuard]
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: LoginComponent, data: { title: 'Login', titleI18n: 'login' } },
    ],
  },
  { path: '**', redirectTo: 'dashboard' ,canActivateChild: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class RoutesRoutingModule {}
