import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../Interface/login-interface';
import { Observable, of } from 'rxjs';
import { TokenUser } from '../Interface/token-interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NewUserInterface } from '../Interface/newUser-interface';

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
  newUser(user: NewUserInterface): Observable<string | null> {
    const url = `${this.apiUrl}/InsertarUsuario`;
    return this.http.post<string>(url, user);
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
  expmod(base: number, exp: number, mod: number): number {
    if (exp == 0) return 1;
    if (exp % 2 == 0) {
      return Math.pow(this.expmod(base, exp / 2, mod), 2) % mod;
    } else {
      return (base * this.expmod(base, exp - 1, mod)) % mod;
    }
  }
  StringArray(texto: string): number[] {
    const numerosComoTexto: string[] = texto.split(',');
    const numeros: number[] = numerosComoTexto.map((numeroTexto) =>
      parseInt(numeroTexto.trim()),
    );
    return numeros;
  }

  RSA(password: string): number[] {
    let p: number = 0;
    let q: number = 0;
    let n: number = 0;
    let phiN: number = 0;
    let e: number = 0;
    let llavepublica: number[] = [];
    let d: number = 0;
    let k: number = 0;
    let llaveprivada: number[] = [];
    let palabra: string = 'hola';
    let palabraNumero: number[] = [];
    let eBin: number[] = [];
    let pow1: number = 0;
    let pow2: number = 0;
    let pow3: number = 0;
    let pow4: number = 0;
    let palabraCifrada: number[] = [];
    let palabraFinal: string = '';

    palabra = password;

    //paso 1 determinar p y q dos numero primos para calcular n
    p = 83;
    q = 97;
    // paso 2 calcular n igual a la multiplicacion de p y q
    n = p * q;

    //paso 3 calcular phi de n que es igual a la multiplicacion de p-1*q-1
    phiN = (p - 1) * (q - 1);

    // paso 4 deternimar el valor de e tiene que se mayor a 1 y que el maximo comun divisor de phi  de n y e sea 1
    e = 11;
    // paso 5 derterminar la llave publica llave publica es igual a (e,n)
    llavepublica[0] = e;
    llavepublica[1] = n;

    // paso 6 determinar k que es igual a un numero entero mallor a 1 y entero
    k = 3;
    // paso 7 determinar la congruencia lineal
    d = (1 + 3 * 7872) / 11;

    // paso 8 determinar la llave privada que es igual a (d,n)
    llaveprivada[0] = d;
    llaveprivada[1] = n;

    // paso 9 calcular el los valores numericos de la palabra
    palabra = palabra.toUpperCase();

    palabraNumero = this.StringToNumbers(palabra);

    // paso 10 asiganmos el valor binario de e
    eBin = [1, 1, 0, 1];
    // paso 11 calculamos las potencias modulares de dependiedo el valor de las letras
    for (let i = 0; palabraNumero.length > i; i++) {
      pow1 = 0;
      pow2 = 0;
      pow3 = 0;
      pow4 = 0;
      pow1 = palabraNumero[i] % n;

      pow2 = pow1 ** 2 % n;

      pow3 = pow2 ** 2 % n;

      pow4 = pow3 ** 2 % n;

      // paso 12 calculamos el valor encriptado de la letra dependiendo de los bits activos del binario
      palabraCifrada[i] = (pow1 * pow2 * pow4) % n;
    }
    // paso 13 se calculan el cifrado de todas las lestras y se devulve el arreglo cifrado

    return palabraCifrada;
  }
  StringToNumbers(palabra: string): number[] {
    let palabraNumero: number[] = [];
    for (let i = 0; !(palabra.charAt(i) === ''); i++) {
      switch (palabra.charAt(i)) {
        case 'A':
          palabraNumero[i] = 1;
          break;
        case 'B':
          palabraNumero[i] = 2;
          break;
        case 'C':
          palabraNumero[i] = 3;
          break;
        case 'D':
          palabraNumero[i] = 4;
          break;
        case 'E':
          palabraNumero[i] = 5;
          break;
        case 'F':
          palabraNumero[i] = 6;
          break;
        case 'G':
          palabraNumero[i] = 7;
          break;
        case 'H':
          palabraNumero[i] = 8;
          break;
        case 'I':
          palabraNumero[i] = 9;
          break;
        case 'J':
          palabraNumero[i] = 10;
          break;
        case 'K':
          palabraNumero[i] = 11;
          break;
        case 'L':
          palabraNumero[i] = 12;
          break;
        case 'M':
          palabraNumero[i] = 13;
          break;
        case 'N':
          palabraNumero[i] = 14;
          break;
        case 'O':
          palabraNumero[i] = 15;
          break;
        case 'P':
          palabraNumero[i] = 16;
          break;
        case 'Q':
          palabraNumero[i] = 17;
          break;
        case 'R':
          palabraNumero[i] = 18;
          break;
        case 'S':
          palabraNumero[i] = 19;
          break;
        case 'T':
          palabraNumero[i] = 20;
          break;
        case 'U':
          palabraNumero[i] = 21;
          break;
        case 'V':
          palabraNumero[i] = 22;
          break;
        case 'W':
          palabraNumero[i] = 23;
          break;
        case 'X':
          palabraNumero[i] = 24;
          break;
        case 'Y':
          palabraNumero[i] = 25;
          break;
        case 'Z':
          palabraNumero[i] = 26;
          break;
        case '0':
          palabraNumero[i] = 27;
          break;
        case '1':
          palabraNumero[i] = 28;
          break;
        case '2':
          palabraNumero[i] = 29;
          break;
        case '3':
          palabraNumero[i] = 30;
          break;
        case '4':
          palabraNumero[i] = 31;
          break;
        case '5':
          palabraNumero[i] = 32;
          break;
        case '6':
          palabraNumero[i] = 33;
          break;
        case '7':
          palabraNumero[i] = 34;
          break;
        case '8':
          palabraNumero[i] = 35;
          break;
        case '9':
          palabraNumero[i] = 36;
          break;
        case '_':
          palabraNumero[i] = 37;
          break;
        default:
          palabraNumero[i] = 0;
      }
    }
    return palabraNumero;
  }
  NumbersToString(palabra: number[]): string {
    let palabraNumero: string = '';
    for (let i = 0; palabra.length > i; i++) {
      switch (palabra[i]) {
        case 1:
          palabraNumero = palabraNumero + 'A';
          break;
        case 2:
          palabraNumero = palabraNumero + 'B';
          break;
        case 3:
          palabraNumero = palabraNumero + 'C';
          break;
        case 4:
          palabraNumero = palabraNumero + 'D';
          break;
        case 5:
          palabraNumero = palabraNumero + 'E';
          break;
        case 6:
          palabraNumero = palabraNumero + 'F';
          break;
        case 7:
          palabraNumero = palabraNumero + 'G';
          break;
        case 8:
          palabraNumero = palabraNumero + 'H';
          break;
        case 9:
          palabraNumero = palabraNumero + 'I';
          break;
        case 10:
          palabraNumero = palabraNumero + 'J';
          break;
        case 11:
          palabraNumero = palabraNumero + 'K';
          break;
        case 12:
          palabraNumero = palabraNumero + 'L';
          break;
        case 13:
          palabraNumero = palabraNumero + 'M';
          break;
        case 14:
          palabraNumero = palabraNumero + 'N';
          break;
        case 15:
          palabraNumero = palabraNumero + 'O';
          break;
        case 16:
          palabraNumero = palabraNumero + 'P';
          break;
        case 17:
          palabraNumero = palabraNumero + 'Q';
          break;
        case 18:
          palabraNumero = palabraNumero + 'R';
          break;
        case 19:
          palabraNumero = palabraNumero + 'S';
          break;
        case 20:
          palabraNumero = palabraNumero + 'T';
          break;
        case 21:
          palabraNumero = palabraNumero + 'U';
          break;
        case 22:
          palabraNumero = palabraNumero + 'V';
          break;
        case 23:
          palabraNumero = palabraNumero + 'W';
          break;
        case 24:
          palabraNumero = palabraNumero + 'X';
          break;
        case 25:
          palabraNumero = palabraNumero + 'Y';
          break;
        case 26:
          palabraNumero = palabraNumero + 'Z';
          break;
        case 27:
          palabraNumero = palabraNumero + '0';
          break;
        case 28:
          palabraNumero = palabraNumero + '1';
          break;
        case 29:
          palabraNumero = palabraNumero + '2';
          break;
        case 30:
          palabraNumero = palabraNumero + '3';
          break;
        case 31:
          palabraNumero = palabraNumero + '4';
          break;
        case 32:
          palabraNumero = palabraNumero + '5';
          break;
        case 33:
          palabraNumero = palabraNumero + '6';
          break;
        case 34:
          palabraNumero = palabraNumero + '7';
          break;
        case 35:
          palabraNumero = palabraNumero + '8';
          break;
        case 36:
          palabraNumero = palabraNumero + '9';
          break;
        case 37:
          palabraNumero = palabraNumero + '_';
          break;

        default:
          palabraNumero = palabraNumero + '?';
      }
    }
    return palabraNumero;
  }
}
