import { Routes } from '@angular/router';
import { LoginPageComponent } from "./modules/auth/login-page/login-page.component";

export const routes: Routes = [
    {
        path: '',
        pathMatch: "full",
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginPageComponent
    }
];
