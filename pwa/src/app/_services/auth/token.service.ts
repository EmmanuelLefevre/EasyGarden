import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  token: any;

  constructor(private router: Router) { }

  getToken(): string | null{
    return localStorage.getItem('token')
  }

  saveToken(token: string): void{
    localStorage.setItem('token', token)
  }

  isLogged(): boolean{
    const token = localStorage.getItem('token')
    return !! token
  }

  clearToken(): void{
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

}