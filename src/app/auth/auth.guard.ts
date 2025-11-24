import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLogged = localStorage.getItem('logged') === 'true';

    if (!isLogged) {
      this.router.navigate(['']); // manda pra Login (sua rota '')
      return false;
    }

    return true;
  }
};
