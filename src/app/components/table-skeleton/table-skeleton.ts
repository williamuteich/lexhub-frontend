import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-table-skeleton',
  templateUrl: './table-skeleton.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableSkeleton {
  rows = input<number>(5);
  
  rowsArray = computed(() => Array(this.rows()).fill(0));
}
