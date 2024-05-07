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
    },
    {
        path: 'general',
        loadComponent: () => import('@app/modules/general/general-page/general-page.component').then(mod => mod.GeneralPageComponent)
    },
    {
        path: 'video-calls',
        loadComponent: () => import('@app/modules/calls/video.calls/video-calls.component').then(mod => mod.VideoCallsComponent)
    }
];
