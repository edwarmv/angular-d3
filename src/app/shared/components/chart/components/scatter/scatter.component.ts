import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scatter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScatterComponent {

}
