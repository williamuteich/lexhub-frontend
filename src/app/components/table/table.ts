import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Edit } from "../edit/edit";
import { Delete } from "../delete/delete";

export interface TableHeader {
  title: string;
  key: string;
}

export interface TableData {
  id: string | number;
  [key: string]: any;
}

@Component({
  selector: 'app-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
  <table class="min-w-full text-sm text-left text-gray-700">
    <thead class="bg-slate-800 text-white text-xs uppercase tracking-wider">
      <tr>
        @for (header of headers(); track header.key) {
          <th scope="col" class="px-6 py-3 font-semibold">{{ header.title }}</th>
        }
      </tr>
    </thead>

    <tbody class="divide-y divide-gray-200 bg-white">
      @for (item of data(); track item.id) {
        <tr class="hover:bg-gray-50 transition-colors font-medium">
          @for (header of headers(); track header.key) {
            <td class="px-6 py-4">
              @if (header.key === 'acoes') {
                <details class="dropdown dropdown-end p-0">
                  <summary class="btn btn-ghost btn-circle text-gray-600 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                         stroke-width="2" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" 
                            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                  </summary>
                  <ul class="menu gap-1 dropdown-content bg-white rounded-lg z-[100] w-auto  shadow-xl border border-gray-200 mt-1">
                    <li class="">
                      <app-edit class="p-0"></app-edit>
                    </li>
                    <li>
                      <app-delete 
                        class="p-0" 
                        [itemId]="item.id"
                        (deleteConfirmed)="onDeleteConfirmed($event)">
                      </app-delete>
                    </li>
                  </ul>
                </details>
              } @else if (header.key === 'avatar') {
                <img [src]="item[header.key]" [alt]="item['name']" class="w-13 h-13 rounded-full object-cover border-2 border-gray-200" />
              } @else if (header.key === 'status') {
                <div class="flex items-center gap-2">
                  <span [class]="item[header.key] ? 'w-3 h-3 rounded-full bg-green-500' : 'w-3 h-3 rounded-full bg-red-500'"></span>
                  <span [class]="item[header.key] ? 'text-green-600 font-medium' : 'text-red-600 font-medium'">
                    {{ item[header.key] ? 'Ativo' : 'Inativo' }}
                  </span>
                </div>
              } @else {
                {{ item[header.key] }}
              }
            </td>
          }
        </tr>
      }
    </tbody>
  </table>
</div>
  `,
  imports: [Edit, Delete]
})
export class Table {
  headers = input<TableHeader[]>([]);
  data = input<TableData[]>([]);
  
  deleteItem = output<string | number>();
  
  onDeleteConfirmed(itemId: string | number): void {
    this.deleteItem.emit(itemId);
  }
}
