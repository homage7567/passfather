import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pf-entries-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entries-view.component.html',
  styleUrl: './entries-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntriesViewComponent {}
