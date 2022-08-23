import { LoginGuard } from './autenticacao/login.guard';
import { AutenticacaoGuard } from './autenticacao/autenticacao.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'login',
  },
  {
    path:'login',
    loadChildren:()=> import('./login/login.module').then((m)=>m.LoginModule),
    canLoad:[LoginGuard],
  },
  {
    path:'home',
    loadChildren:()=> import('./pages/pages.module').then((m)=>m.PagesModule)
  },
  {
    path:'dashboard',
    loadChildren:()=> import('./pages/dashboard/dashboard.module').then((m)=>m.DashboardModule),
    canLoad:[AutenticacaoGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
