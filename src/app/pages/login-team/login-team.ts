import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login-team',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login-team.html',
})
export class LoginTeam {
  private destroyRef = inject(DestroyRef);
  
  email: string = '';
  password: string = '';
  
  showPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword.update(value => !value);
  }

  onSubmit(): void {
    this.errorMessage.set('');

    if (!this.email || !this.password) {
      this.errorMessage.set('Por favor, preencha todos os campos.');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage.set('Por favor, insira um email válido.');
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage.set('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    this.isLoading.set(true);

    this.authService.loginTeam(this.email, this.password)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage.set(error.error?.message || 'Email ou senha inválidos. Tente novamente.');
          this.isLoading.set(false);
        }
      });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
