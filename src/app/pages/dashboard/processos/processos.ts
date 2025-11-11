import { Component, computed, inject, signal } from '@angular/core';
import { ItemsProcesso } from 'src/app/models/processo.model';
import { ProcessoService } from 'src/app/services/processo.service';
import { SearchInput } from "src/app/components/search-input/search-input";
import { TableSkeleton } from "src/app/components/table-skeleton/table-skeleton";
import { Table, TableData } from "src/app/components/table/table";

@Component({
  selector: 'app-processos',
  templateUrl: './processos.html',
  imports: [SearchInput, TableSkeleton, Table]
})
export class Processos {
  private processoService = inject(ProcessoService)

  protected tableData = signal<ItemsProcesso[]>([]);
  protected isLoading = signal(true);
  protected hasError = signal(false);

  constructor() {
    this.loadProcessos();
  }

  private loadProcessos(): void {
    this.processoService.getAllProcessos().subscribe({
      next: (response) => {
        this.tableData.set(response.processo);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error("Erro ao buscar todos os processos", error);
        this.hasError.set(true);
        this.isLoading.set(false);
      }
    });
  }

  protected tableDataFormatted = computed<TableData[]>(() => {
    return this.tableData().map(processo => ({
      id: processo.id,
      numeroProcesso: processo.numeroProcesso,
      client: processo.client.name,
      parteContraria: processo.parteContraria,
      tipo: processo.tipo,
      dataAbertura: this.formatDate(processo.dataAbertura),
      dataEncerramento: processo.dataEncerramento 
        ? this.formatDate(processo.dataEncerramento) 
        : 'Em andamento',
      responsavel: processo.responsavel.name
    }));
  });

  protected tableHeaders = [
    { title: 'Nº Processo', key: 'numeroProcesso' },
    { title: 'Reclamante', key: 'client' },
    { title: 'Reclamada', key: 'parteContraria' },
    { title: 'Tipo', key: 'tipo' },
    { title: 'Data Abertura', key: 'dataAbertura' },
    { title: 'Data Encerramento', key: 'dataEncerramento' },
    { title: 'Advogado', key: 'responsavel' },
    { title: 'Ações', key: 'acoes' }
  ]

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

}
