import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  template: `
    <button
      (click)="onLogout()"
      [disabled]="isLoading()"
      class="
        flex items-center gap-2
        px-5 py-2.5
        bg-red-600 text-white font-medium
        rounded-xl shadow-md
        transition-all duration-200
        hover:bg-red-700 hover:scale-[1.03]
        active:scale-[0.97]
        disabled:opacity-60 disabled:cursor-not-allowed
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
      </svg>
      <span>{{ isLoading() ? 'Saindo...' : 'Sair' }}</span>
    </button>
  `
})
export class LogoutButton {
  private destroyRef = inject(DestroyRef);
  isLoading = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogout() {
    this.isLoading.set(true);
    this.authService.logout()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.authService.clearTokenCache();
          this.isLoading.set(false);
          this.router.navigate(['/login']);
        },
        error: () => {
          this.isLoading.set(false);
        }
      });
  }
}
