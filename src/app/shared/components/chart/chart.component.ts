import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent, PieComponent, ScatterComponent } from './components';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, BarComponent, PieComponent, ScatterComponent],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent {}
