import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login),
    canActivate: [LoginGuard]
  },
  {
    path: 'login-team',
    loadComponent: () => import('./pages/login-team/login-team').then(m => m.LoginTeam),
    canActivate: [LoginGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/layout/dashboard-layout').then(m => m.DashboardLayout),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
      },
      {
        path: 'processos',
        loadComponent: () => import('./pages/dashboard/processos/processos').then(m => m.Processos),
      },
      {
        path: 'equipe',
        loadComponent: () => import('./pages/dashboard/equipe/equipe').then(m => m.Equipe),
      },
      {
        path: 'clientes',
        loadComponent: () => import('./pages/dashboard/clientes/clientes').then(m => m.Clientes),
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
