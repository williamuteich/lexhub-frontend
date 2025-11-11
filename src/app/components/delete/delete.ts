import { ChangeDetectionStrategy, Component, ElementRef, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'app-delete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button class="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none px-10" (click)="openModal()">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
      Excluir
    </button>
    <dialog #deleteModal class="modal">
      <div class="modal-box bg-white">
        <h3 class="text-lg font-bold text-red-600">Excluir</h3>
        <p class="py-4">Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.</p>
        <div class="modal-action gap-2">
          <form method="dialog" class="flex gap-2">
            <button class="btn btn-ghost bg-gray-900 text-white border-none hover:bg-gray-700">Cancelar</button>
            <button type="button" (click)="confirmDelete()" class="btn bg-red-700 hover:bg-red-600 text-white border-none">Excluir</button>
          </form>
        </div>
      </div>
    </dialog>
  `
})
export class Delete {
  itemId = input.required<string | number>();
  
  deleteConfirmed = output<string | number>();
  
  modal = viewChild.required<ElementRef<HTMLDialogElement>>('deleteModal');

  openModal() {
    this.modal()?.nativeElement.showModal();
  }
  
  confirmDelete() {
    this.deleteConfirmed.emit(this.itemId());
    this.modal()?.nativeElement.close();
  }
}
