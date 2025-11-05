import { Component, inject } from '@angular/core';
import { LogoutButton } from '../../../../components/logout-button/logout-button';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [LogoutButton],
  templateUrl: './header.html'
})
export class DashboardHeader {
  protected authService = inject(AuthService);
  
  protected userName = this.authService.userName;
  protected userRole = this.authService.userRole;
  protected userEmail = this.authService.userEmail;
}
