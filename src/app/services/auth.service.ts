import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError, shareReplay } from 'rxjs/operators';
import { LoginUserRequest, LoginTeamRequest, LoginResponse, User } from '../models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private tokenValidationCache$: Observable<{ user: User }> | null = null;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  loginUser(cpf: string, password: string): Observable<LoginResponse> {
    const cleanCpf = cpf.replace(/\D/g, '');
    const body: LoginUserRequest = { cpf: cleanCpf, password };

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth`,
      body,
      { withCredentials: true }
    ).pipe(
      tap(() => this.clearTokenCache())
    );
  }

  loginTeam(email: string, password: string): Observable<LoginResponse> {
    const body: LoginTeamRequest = { email, password };

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth`,
      body,
      { withCredentials: true }
    ).pipe(
      tap(() => this.clearTokenCache())
    );
  }

  validateToken(): Observable<{ user: User }> {
    if (this.tokenValidationCache$) return this.tokenValidationCache$;

    this.tokenValidationCache$ = this.http.get<{ user: User }>(
      `${this.apiUrl}/auth/me`,
      { withCredentials: true }
    ).pipe(
      tap(res => this.currentUserSubject.next(res.user)), 
      catchError(err => {
        this.tokenValidationCache$ = null;
        this.currentUserSubject.next(null);
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
    this.currentUserSubject.next(null);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
