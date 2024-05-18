import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'progi-input',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input()
  type: 'text' | 'password' = "text";
  @Input()
  placeholder: string = '';
  @Input()
  label: string = 'label';
  @Input()
  name!: string;
}
