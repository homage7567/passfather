import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { EntriesViewBuilderService } from './services/entries-view-builder.service';
import { TableModule } from 'primeng/table';
import { EntryTableInterface } from './models/entry-table.interface';
import { CardModule } from 'primeng/card';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  standalone: true,
  imports: [CommonModule, TranslocoModule, CardModule, TableModule],
  templateUrl: './entries-view.component.html',
  styleUrl: './entries-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EntriesViewBuilderService]
})
export class EntriesViewComponent {
  public readonly table$: Observable<EntryTableInterface[]> = this.activatedRoute.data.pipe(
    map(({ entries }) => this.entriesViewBuilderService.makeEntriesTree(entries))
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly entriesViewBuilderService: EntriesViewBuilderService
  ) {}
}
