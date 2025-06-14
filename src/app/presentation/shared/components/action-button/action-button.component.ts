import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionButtonComponent {
  @Input() text: string = '';
  @Output() buttonClick = new EventEmitter<void>();

  onClick(): void {
    this.buttonClick.emit();
  }
}
