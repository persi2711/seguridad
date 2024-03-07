import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../Service/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { LoginUser } from '../../Interface/login-interface';

@Component({
  selector: 'app-login-page',
  templateUrl: 'login-auth-page.component.html',
})
export class LoginAuthComponent implements OnInit {
  public myForm: FormGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public loginError: boolean = false;
  ngOnInit(): void {}
  constructor(
    private fb: FormBuilder,
    private login: LoginService,
    private cookie: CookieService,
    private router: Router,
  ) {}

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    let palabracifrada: number[] = this.login.RSA(
      this.myForm.controls['password'].value,
    );
    let palabraFinal = palabracifrada.toString();
    palabraFinal = palabraFinal.replace(/,/g, '');
    let user = new User(this.myForm.controls['email'].value, palabraFinal);

    this.login
      .loginEmail(user)
      .pipe(
        tap((resultado) =>
          this.login.crearcookie('Token', palabracifrada.toString(), 2, '/'),
        ),
        tap(() => this.router.navigateByUrl('/dash')),
      )
      .subscribe({
        error: (error) => ((this.loginError = true), this.myForm.reset()),
      }).unsubscribe;
  }
  onclick(): void {
    this.router.navigateByUrl('/auth/newuser');
  }
}

class User implements LoginUser {
  email: string;
  password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
