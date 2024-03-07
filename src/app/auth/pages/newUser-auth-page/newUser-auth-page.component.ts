import { NewUserInterface } from './../../Interface/newUser-interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../Service/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { LoginUser } from '../../Interface/login-interface';

@Component({
  selector: 'app-login-page',
  templateUrl: 'newUser-auth-page.component.html',
})
export class NewUserAuthComponent implements OnInit {
  public myForm: FormGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public loginError: boolean = false;
  public exito: boolean = false;
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
    console.log(user);

    this.login
      .newUser(user)
      .pipe(
        tap(() => (this.exito = true)),
        tap(() => (this.loginError = false)),
        tap(() => this.myForm.reset()),
      )
      .subscribe({
        error: (error) => (
          console.log(error),
          (this.exito = false),
          (this.loginError = true),
          this.myForm.reset()
        ),
      }).unsubscribe;
  }
  onclick(): void {
    this.router.navigateByUrl('/auth/login');
  }
}

class User implements NewUserInterface {
  usr_IdUsuario: number = 0;
  usr_Email: string;
  password: string;
  constructor(email: string, password: string) {
    this.usr_Email = email;
    this.password = password;
  }
}
