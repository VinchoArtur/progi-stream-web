import {Component, inject, OnInit} from '@angular/core';
import {VideoCallsComponent} from "@app/modules/calls/video.calls/video-calls.component";
import {ButtonComponent} from "@shared/elements/buttton/button.component";
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {ToogleComponent} from "@shared/elements/toogle/toogle.component";
import {UserDto} from "@app/models/users/dto/user.dto";

@Component({
	selector: 'progi-general-page',
	standalone: true,
	templateUrl: './general-page.component.html',
	imports: [
		VideoCallsComponent,
		ButtonComponent,
		FormsModule,
		ReactiveFormsModule,
		NgClass,
		ToogleComponent
	],
	styleUrls: ['./general-page.component.scss']
})
export class GeneralPageComponent implements OnInit {

	private readonly router = inject(Router);

	constructor() {
	}

	public isToggle: boolean = false;
	public userData: FormGroup = new FormGroup({});
	public generalTitle: FormControl = new FormControl<string>('', Validators.required);
	public generalName: FormControl = new FormControl<string>('', Validators.required);
	public generalPassword: FormControl = new FormControl<string>({value: '', disabled: true}, Validators.required);
	public isFlipped: boolean = false;
	public isValidCreate: boolean = false;
	public joinedToRoomTitle: string =  '';

	public ngOnInit() {
		this.userData.addControl('generalTitle', this.generalTitle);
		this.userData.addControl('generalName', this.generalName);
		this.userData.addControl('generalPassword', this.generalPassword);
		this.userData.controls['generalPassword'].disable();
	}

	onIsActive(event: boolean) {
		this.isToggle = event;
		if(event){
			this.userData.controls['generalPassword'].enable();
		} else {
			this.userData.controls['generalPassword'].disable();
		}
	}
	toCalls() {
		this.isValidCreate = false;
		const title = this.userData.controls['generalTitle'].value;
		const name = this.userData.controls['generalName'].value;
		const password = this.userData.controls['generalPassword'].value;
		if (title && name && !this.isToggle) {
			this.isValidCreate = true;
		}
		if (title && name && this.isToggle && password) {
			this.isValidCreate = true;
		}
		if (this.isValidCreate) {
			const sentObject = {title, name, password};
			this.router.navigate(['video-calls', sentObject]);
		}
	}

	joinToCalls() {
		this.router.navigate(['video-calls']);
	}

	toggleFlip() {
		this.isFlipped = !this.isFlipped;
		const animateContainerFront = document.getElementsByClassName('general-front')[0] as HTMLElement;
		const animateContainerBack = document.getElementsByClassName('general-back')[0] as HTMLElement;
		if (this.isFlipped) {
			animateContainerFront.style.animationName = 'bounceOutDown';
			setTimeout(() => {
				animateContainerBack.style.visibility = 'visible'
				animateContainerBack.style.animationName = 'bounceInDown';
				animateContainerFront.style.visibility = 'hidden';
			}, 1000);
		} else {
			animateContainerBack.style.animationName = 'bounceOutDown';

			setTimeout(() => {
				animateContainerBack.style.visibility = 'hidden';
				animateContainerFront.style.animationName = 'bounceInDown';
				animateContainerFront.style.visibility = 'visible';
			}, 1000);
		}

	}

}
