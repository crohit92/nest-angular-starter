import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((res) => res.LoginModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((res) => res.DashboardModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
