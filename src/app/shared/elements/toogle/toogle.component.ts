import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
	selector: 'progi-toogle',
	standalone: true,
	imports: [
		FormsModule
	],
	templateUrl: './toogle.component.html',
	styleUrl: './toogle.component.scss'
})
export class ToogleComponent {
	@Input()
	color: string = 'purple';
	@Output()
	isActive:EventEmitter<boolean> = new EventEmitter();
	test(){
		this.isActive.emit(true);
	}

	protected readonly ontoggle = ontoggle;

	onToggle(event: Event) {
		const target = event.target as HTMLInputElement;
		this.isActive.emit(target.checked);
	}
}
