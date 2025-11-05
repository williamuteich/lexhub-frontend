import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUser()) {
    router.navigate(['/dashboard']);
    return false;
  }

  return authService.validateToken().pipe(
    map(() => {
      router.navigate(['/dashboard']);
      return false;
    }),
    catchError(() => {
      return of(true);
    })
  );
};
