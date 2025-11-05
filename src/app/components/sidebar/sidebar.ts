import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  template: `
    <div class="drawer">
      <input id="my-drawer-1" type="checkbox" class="drawer-toggle" />

      <div class="drawer-content">
        <label for="my-drawer-1" class="btn btn-ghost drawer-button">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
      </div>

      <div class="drawer-side">
        <label for="my-drawer-1" class="drawer-overlay"></label>
        <ul class="menu bg-base-200 min-h-full w-80 p-4">
          @for (item of items; track item) {
            <li>
              <a>{{ item }}</a>
            </li>
          }
        </ul>
      </div>
    </div>
  `
})
export class Sidebar {
  @Input() items: string[] = [];
}
