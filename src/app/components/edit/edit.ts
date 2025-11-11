import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';

@Component({
  selector: 'app-edit',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button class="btn btn-sm bg-green-600 hover:bg-green-700 text-white border-none px-[42px]" (click)="openModal()">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
      Editar
    </button>
    <dialog #editModal class="modal">
      <div class="modal-box bg-white focus:outline-none">
        <h3 class="text-lg font-bold">Editar</h3>
        <p class="py-4">Faça as alterações necessárias</p>
        <div class="modal-action gap-2">
          <form method="dialog" class="flex gap-2">
            <button class="btn btn-ghost bg-gray-900 text-white border-none hover:bg-gray-700">Cancelar</button>
            <button class="btn bg-green-700 hover:bg-green-600 text-white border-none">Salvar</button>
          </form>
        </div>
      </div>
    </dialog>
  `
})
export class Edit {
  modal = viewChild.required<HTMLDialogElement>('editModal');

  openModal() {
    this.modal()?.showModal();
  }
}
