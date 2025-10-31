import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardIconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [ZardButtonComponent, ZardIconComponent],
  template: `
    <button class="bg-white transform transition-transform duration-200 hover:scale-102" z-button zSize="lg" (click)="onLogout()" [disabled]="isLoading">
      <z-icon zType="log-out" />
      Sair
    </button>
  `
})
export class LogoutButton {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogout() {
    this.isLoading = true;
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearTokenCache();
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
