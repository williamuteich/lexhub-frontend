import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-button',
  imports: [],
  templateUrl: './logout-button.html'
})
export class LogoutButton {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogout() {
    this.isLoading = true
    this.authService.logout().subscribe({
      next: () => {
        this.isLoading = false
        this.router.navigate(['/login'])
      },
      error: () => {
        this.isLoading = false
      }
    })
  }
}
