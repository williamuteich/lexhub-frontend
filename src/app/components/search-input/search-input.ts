import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [],
  template: `
    <label class="floating-label relative inline-block">
      <input
        type="text"
        [value]="value()"
        (input)="onSearchInput($event)"
        placeholder="Buscar"
        class="input input-sm bg-gray-100 border border-gray-300 text-gray-700 
               focus:bg-white focus:outline-none focus:ring-0 
               w-64 text-base pr-9"
      />
      <span class="text-gray-700 bg-white text-base">Buscar</span>

      <svg xmlns="http://www.w3.org/2000/svg"
           fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
           class="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 pointer-events-none">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
      </svg>
    </label>
  `
})
export class SearchInput {
  value = input<string>('');

  searchChange = output<string>();

  onSearchInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchChange.emit(inputValue);
  }
}
