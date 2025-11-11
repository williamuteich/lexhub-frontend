import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchInput } from "src/app/components/search-input/search-input";
import { TableSkeleton } from "src/app/components/table-skeleton/table-skeleton";
import { User } from 'src/app/models/auth.model';
import { UserService } from 'src/app/services/user.service';
import { Table } from "src/app/components/table/table";

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.html',
  imports: [SearchInput, Table, TableSkeleton],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Equipe implements OnInit {
  private usersService = inject(UserService);
  private destroyRef = inject(DestroyRef);
  
  protected tableData = signal<User[]>([]);
  protected isLoading = signal(true);
  protected hasError = signal(false);

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.usersService.getAllUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (users) => {
          this.tableData.set(users);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error("Erro ao buscar Usuários", error);
          this.hasError.set(true);
          this.isLoading.set(false);
        }
      });
  }

  protected tableHeaders = [
    { title: 'Avatar', key: 'avatar' },
    { title: 'Nome', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'Cargo', key: 'role' },
    { title: 'Status', key: 'status' },
    { title: 'Ações', key: 'acoes' }
  ]

}
