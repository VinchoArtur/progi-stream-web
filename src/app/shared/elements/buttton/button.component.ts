import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input()
  color: string = 'purple';
  @Input()
  buttonText: string = 'button text';
  @Input()
  disabled: boolean = false;
}
