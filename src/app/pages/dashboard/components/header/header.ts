import { Component, inject } from '@angular/core';
import { LogoutButton } from 'src/app/components/logout-button/logout-button';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [LogoutButton],
  templateUrl: './header.html'
})
export class DashboardHeader {
  private authService = inject(AuthService);

  get currentUser() {
    console.log(this.authService.currentUser);
    return this.authService.currentUser;
  }
}
