import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from "@shared/elements/buttton/button.component";
import { AuthService } from "@app/modules/auth/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "@shared/elements/input/input.component";
import { NgClass } from "@angular/common";
import { UserDto } from "@app/models/users/dto/user.dto";
import { Router } from "@angular/router";


@UntilDestroy()
@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [
        ButtonComponent,
        ReactiveFormsModule,
        InputComponent,
        NgClass,
    ],
    providers: [HttpClient],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

    private readonly router = inject(Router);

    constructor(){

    }
	//  ToDo надо переписать 1
    public userData: FormGroup = new FormGroup({})
    public userName: FormControl = new FormControl<string>('');
    public password: FormControl = new FormControl<string>('');
    public firstName: FormControl = new FormControl<string>('');
    public lastName: FormControl = new FormControl<string>('');
    public email: FormControl = new FormControl<string>('');
    public isFlipped: boolean = false;
    private authService = inject(AuthService);


    public ngOnInit(){
        this.userData.addControl('userName', this.userName);
        this.userData.addControl('password', this.password);
        this.userData.addControl('firstName', this.firstName);
        this.userData.addControl('lastName', this.lastName);
        this.userData.addControl('email', this.email);

    }


    onLogin(){
        this.authService.login(
            this.userData.get('email')?.value, this.userData.get('password')?.value
        ).pipe(untilDestroyed(this)).subscribe(value => {
            if( !!value.token) {
                this.router.navigate(['general']);
            }
        })
    }


    onRegister(){
        this.userData.markAllAsTouched();
        if(this.userData.valid) {
            const newUser: UserDto = {
                firstName: this.userData.controls['firstName'].value,
                lastName: this.userData.controls['lastName'].value,
                password: this.userData.controls['password'].value,
                email: this.userData.controls['email'].value
            }
            this.authService.register(newUser).pipe(untilDestroyed(this)).subscribe(({status, message}) => {
                if(status === 201) {
                    this.toggleFlip();
                }
            })
        }
    }

    toggleFlip(){
        this.isFlipped = !this.isFlipped;
    }
}
