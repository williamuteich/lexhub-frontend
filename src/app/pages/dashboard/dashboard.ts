import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutButton } from "../../components/logout-button/logout-button";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, LogoutButton],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  
}
