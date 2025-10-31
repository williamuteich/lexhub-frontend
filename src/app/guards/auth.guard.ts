import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.validateToken().pipe(
      tap((res: { user: User }) => {
        if (!res.user) {
          this.router.navigate(['/login']);
        }
      }),
      map((res: { user: User }) => !!res.user),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
