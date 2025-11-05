import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink, NgxMaskDirective],
  templateUrl: './login.html',
})
export class Login {
  private destroyRef = inject(DestroyRef);
  
  cpf: string = '';
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

    if (!this.cpf || !this.password) {
      this.errorMessage.set('Por favor, preencha todos os campos.');
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage.set('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    this.isLoading.set(true);

    this.authService.loginUser(this.cpf, this.password)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage.set(error.error?.message || 'CPF ou senha inválidos. Tente novamente.');
          this.isLoading.set(false);
        }
      });
  }
}
