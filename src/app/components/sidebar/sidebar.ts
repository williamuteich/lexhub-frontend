import { Component, Input, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MenuItem } from '../../models/menu.model';
import { LogoutButton } from "../logout-button/logout-button";

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, LogoutButton],
  template: `
    <div class="drawer drawer-end z-50">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />

      <div class="drawer-content">
        <label for="my-drawer" class="btn btn-ghost btn-circle drawer-button hover:bg-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
      </div>

      <div class="drawer-side">
        <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        
        <div class="bg-white min-h-full w-72 shadow-2xl">
          <div class="p-6 border-b-2 border-gray-300 bg-gradient-to-br from-blue-50 to-white">
            <div class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                @if (logoUrl) {
                  <img [src]="logoUrl" [alt]="title" class="w-10 h-10 rounded-lg object-cover" />
                } @else {
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                }
              </div>
              
              <div class="flex-1">
                <h2 class="text-gray-900 font-bold text-base tracking-tight leading-tight">{{ title }}</h2>
                <p class="text-gray-600 text-xs font-medium">{{ description }}</p>
              </div>
            </div>
          </div>

          <nav class="p-3">
            <ul class="space-y-1">
              @for (item of menuItems; track item.route) {
                <li>
                  <a 
                    [routerLink]="item.route"
                    routerLinkActive="!bg-blue-600 !text-white shadow-md [&>div]:!text-white [&>svg]:!opacity-0"
                    [routerLinkActiveOptions]="{ exact: true }"
                    class="flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-150 hover:bg-gray-100 group text-gray-700"
                  >
                    <div class="flex-shrink-0 w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" [innerHTML]="getSafeIcon(item.icon)"></div>
                    
                    <span class="flex-1 font-medium text-sm">{{ item.label }}</span>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              }
              <li class="border-t-2 border-gray-300 pt-2 mt-2">
                <app-logout-button [animate]="false" [customClass]="'w-full cursor-pointer flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-150 hover:bg-gray-100 group text-gray-700'"></app-logout-button>
              </li>
            </ul>
          </nav>

          @if (showFooter) {
            <div class="absolute bottom-0 left-0 right-0 p-4 bg-gray-50 border-t border-gray-200">
              <div class="flex items-center space-x-2 text-gray-500 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ footerText || 'LexHub v1.0.0' }}</span>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class Sidebar {
  private sanitizer = inject(DomSanitizer);
  
  @Input() menuItems: MenuItem[] = [];
  @Input() title: string = 'Menu';
  @Input() description: string = 'Navegação';
  @Input() logoUrl?: string;
  @Input() showFooter: boolean = true;
  @Input() footerText?: string;

  getSafeIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}
