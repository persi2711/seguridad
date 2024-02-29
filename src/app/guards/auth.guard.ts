import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../auth/Service/login.service';
import { delay } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authservice = inject(LoginService);
  const router = inject(Router);
  const logged = authservice.statusCheck();
  if (logged) {
    return true;
  } else {
    router.navigate(['./auth/login']);
    return false;
  }
};
export const sesionGuard: CanActivateFn = (route, state) => {
  const authservice = inject(LoginService);
  const router = inject(Router);
  if (!authservice.statusCheck()) {
    return true;
  } else {
    router.navigateByUrl('dash');
    return false;
  }
};
