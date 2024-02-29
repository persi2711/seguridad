import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../Interface/login-interface';
import { Observable, of } from 'rxjs';
import { TokenUser } from '../Interface/token-interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private apiUrl: string = 'https://localhost:7245/api/Usuarios';
  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router,
  ) {}

  loginEmail(user: LoginUser): Observable<TokenUser | null> {
    const url = `${this.apiUrl}/Login`;
    return this.http.post<TokenUser>(url, user);
  }
  statusCheck(): boolean {
    return this.cookie.check('Token');
  }
  crearcookie(Name: string, Value: string, Expires: number, Path: string) {
    this.cookie.set(Name, Value, Expires, Path);
    if (this.cookie.check(Name)) {
      return true;
    } else {
      return false;
    }
  }
}
