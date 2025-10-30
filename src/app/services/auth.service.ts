import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, shareReplay } from 'rxjs/operators';
import {
    LoginUserRequest,
    LoginTeamRequest,
    LoginResponse
} from '../models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000';
    private tokenValidationCache$: Observable<{ user: any }> | null = null;

    constructor(private http: HttpClient) { }

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

    validateToken(): Observable<{ user: any }> {
        if (this.tokenValidationCache$) {
            return this.tokenValidationCache$;
        }

        this.tokenValidationCache$ = this.http.get<{ user: any }>(
            `${this.apiUrl}/auth/me`,
            { withCredentials: true }
        ).pipe(
            tap(() => this.clearTokenCache()),
            catchError((error) => {
                this.tokenValidationCache$ = null;
                throw error;
            }),
            shareReplay(1)
        );

        return this.tokenValidationCache$;
    }

    clearTokenCache(): void {
        this.tokenValidationCache$ = null;
    }

    logout(): Observable<{ success: boolean; message: string }> {
        this.clearTokenCache();
        return this.http.post<{ success: boolean; message: string }>(
            `${this.apiUrl}/auth/logout`,
            {},
            { withCredentials: true }
        );
    }
}