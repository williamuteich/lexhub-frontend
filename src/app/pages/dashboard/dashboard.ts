import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutButton } from "../../components/logout-button/logout-button";
import { DashboardHeader } from './components/header/header';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardHeader],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  
}
