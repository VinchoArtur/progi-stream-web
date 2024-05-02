import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserDto } from "@app/models/users/dto/user.dto";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL: string = 'http://localhost:3001' // test link

  constructor(private readonly httpClient: HttpClient) { }


  public login(userName: string, password: string): Observable<UserDto> {
    return this.httpClient.post<UserDto>(`${this.URL}/auth/login`, { userName, password });
  }

  public register(userDto: UserDto): Observable<{status: number}> {
    return this.httpClient.post<{status: number}>(`${this.URL}/auth/create`, { ...userDto });
  }
}
