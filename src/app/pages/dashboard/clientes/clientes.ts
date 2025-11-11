import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SearchInput } from "src/app/components/search-input/search-input";
import { Table } from "src/app/components/table/table";
import { TableSkeleton } from "src/app/components/table-skeleton/table-skeleton";
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.html',
  imports: [SearchInput, Table, TableSkeleton, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Clientes { 
  private clientService = inject(ClientService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private debounceTimer?: ReturnType<typeof setTimeout>;

  protected tableData = signal<Client[]>([]);
  protected isLoading = signal(true);
  protected hasError = signal(false);
  protected searchTerm = signal<string>('');

  constructor() {
    const initialSearch = this.route.snapshot.queryParams['search'] || '';
    this.searchTerm.set(initialSearch);
    this.fetchClients(initialSearch);
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
    
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    
    this.debounceTimer = setTimeout(() => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { search: term.trim() || null },
        queryParamsHandling: 'merge'
      });
      
      this.fetchClients(term);
    }, 500);
  }

  onDeleteClient(clientId: string | number): void {
    this.clientService.deleteClient(clientId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          const updatedClients = this.tableData().filter(client => client.id !== clientId);
          this.tableData.set(updatedClients);
        },
        error: (error) => {
          console.error('Erro ao deletar cliente:', error);
        }
      });
  }

  private fetchClients(term: string): void {
    this.isLoading.set(true);
    this.hasError.set(false);

    const normalized = term.trim();
    const search = normalized ? normalized : undefined;

    this.clientService.getAllClients(search)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (clients) => {
          this.tableData.set(clients);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Erro ao buscar clientes:', error);
          this.hasError.set(true);
          this.isLoading.set(false);
        }
      });
  }

  protected tableHeaders = [
    { title: 'Avatar', key: 'avatar' },
    { title: 'Nome', key: 'name' },
    { title: 'CPF', key: 'cpf' },
    { title: 'Telefone', key: 'phone' },
    { title: 'Email', key: 'email' },
    { title: 'Status', key: 'status' },
    { title: 'Ações', key: 'acoes' }
  ]
}
