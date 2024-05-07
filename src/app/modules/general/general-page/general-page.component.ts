import {Component, inject} from '@angular/core';
import { VideoCallsComponent } from "@app/modules/calls/video.calls/video-calls.component";
import {ButtonComponent} from "@shared/elements/buttton/button.component";
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'progi-general-page',
  standalone: true,
  templateUrl: './general-page.component.html',
  imports: [
    VideoCallsComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrl: './general-page.component.scss'
})
export class GeneralPageComponent {

  private readonly router = inject(Router);

  constructor() {
  }

  public userData: FormGroup = new FormGroup({
    title: new FormControl<string>(''),
    name: new FormControl<string>(''),
    password: new FormControl<string>('')
  });
  public isFlipped: boolean = false;

  toCalls() {
    this.router.navigate(['video-calls']);
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

}
