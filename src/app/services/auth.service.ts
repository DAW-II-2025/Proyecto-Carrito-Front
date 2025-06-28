import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  login(token: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  }
}
