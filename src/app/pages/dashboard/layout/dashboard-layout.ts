import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardHeader } from '../components/header/header';

@Component({
  selector: 'app-dashboard-layout',
  imports: [DashboardHeader, RouterOutlet],
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout { }
