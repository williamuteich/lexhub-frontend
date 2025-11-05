import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login),
    canActivate: [loginGuard]
  },
  {
    path: 'login-team',
    loadComponent: () => import('./pages/login-team/login-team').then(m => m.LoginTeam),
    canActivate: [loginGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/layout/dashboard-layout').then(m => m.DashboardLayout),
    canActivate: [authGuard],
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
