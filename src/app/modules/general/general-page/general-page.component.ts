import { Component } from '@angular/core';
import { VideoCallsComponent } from "@app/modules/calls/video.calls/video-calls.component";

@Component({
  selector: 'progi-general-page',
  standalone: true,
  templateUrl: './general-page.component.html',
  imports: [
    VideoCallsComponent
  ],
  styleUrl: './general-page.component.scss'
})
export class GeneralPageComponent {

}
