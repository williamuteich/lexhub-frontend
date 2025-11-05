import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError, shareReplay } from 'rxjs/operators';
import { LoginUserRequest, LoginTeamRequest, LoginResponse, User } from '../models/auth.model';
import { environment } from '../../environments/environment';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenValidationCache$: Observable<{ user: User }> | null = null;

  readonly currentUser = signal<User | null>(null);
  
  readonly isAuthenticated = computed(() => !!this.currentUser());
  readonly userRole = computed(() => this.currentUser()?.role ?? null);
  readonly userName = computed(() => this.currentUser()?.name ?? 'Usuário');
  readonly userEmail = computed(() => this.currentUser()?.email);
  
  readonly currentUser$ = toObservable(this.currentUser);

  constructor(private http: HttpClient) {}

  loginUser(cpf: string, password: string): Observable<LoginResponse> {
    const cleanCpf = cpf.replace(/\D/g, '');
    const body: LoginUserRequest = { cpf: cleanCpf, password };

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth`,
      body,
      { withCredentials: true }
    ).pipe(
      tap((response) => {
        if (response.user) {
          this.currentUser.set(response.user);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
        }
        this.clearTokenCache();
      })
    );
  }

  loginTeam(email: string, password: string): Observable<LoginResponse> {
    const body: LoginTeamRequest = { email, password };

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth`,
      body,
      { withCredentials: true }
    ).pipe(
      tap((response) => {
        if (response.user) {
          this.currentUser.set(response.user);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
        }
        this.clearTokenCache();
      })
    );
  }

  validateToken(): Observable<{ user: User }> {
    if (this.tokenValidationCache$) return this.tokenValidationCache$;

    this.tokenValidationCache$ = this.http.get<{ user: User }>(
      `${this.apiUrl}/auth/me`,
      { withCredentials: true }
    ).pipe(
      tap(res => this.currentUser.set(res.user)), 
      catchError(err => {
        this.tokenValidationCache$ = null;
        this.currentUser.set(null);
        throw err;
      }),
      shareReplay(1)
    );

    return this.tokenValidationCache$;
  }

  logout(): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/auth/logout`,
      {},
      { withCredentials: true }
    ).pipe(
      tap(() => {
        this.clearTokenCache();
      })
    );
  }

  clearTokenCache(): void {
    this.tokenValidationCache$ = null;
    this.currentUser.set(null);
  }
}
