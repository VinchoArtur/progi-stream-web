import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { UserDto } from "@app/models/users/dto/user.dto";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // private readonly URL: string = 'http://165.232.131.67/api' // test link
    private readonly URL: string = 'http://localhost:3000' // test link

    constructor(private readonly httpClient: HttpClient){
    }


    public login(userEmail: string, password: string): Observable<any>{
        return this.httpClient.post<any>(`${this.URL}/auth/login`, {userEmail, password}).pipe(
            tap(response => {
                if(response.status === 200) {
                    const token = response.token;
                    sessionStorage.setItem('accessToken', token);
                } else {
                    throw new Error('invalid login');
                }

            })
        );
    }

    public register(userDto: UserDto): Observable<{message: string, status: number}>{
        return this.httpClient.post<{message: string, status: number}>(`${this.URL}/auth/create`, {...userDto});
    }
}
