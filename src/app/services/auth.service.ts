import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userEmail: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    token: null,
    userEmail: null
  });
  authState$ = this.authStateSubject.asObservable();

  constructor() {
    const storedToken = localStorage.getItem('authToken');
    let userEmail: string | null = null;
    if (storedToken) {
      userEmail = this.decodeToken(storedToken)?.email || null;
    }
    this.authStateSubject.next({
      isAuthenticated: !!storedToken,
      token: storedToken,
      userEmail
    });
  }

  login(token: string) {
    localStorage.setItem('authToken', token);
    const userEmail = this.decodeToken(token)?.email || null;
    this.authStateSubject.next({
      isAuthenticated: true,
      token,
      userEmail
    });
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    this.authStateSubject.next({
      isAuthenticated: false,
      token: null,
      userEmail: null
    });
  }

  getAuthState(): AuthState {
    return this.authStateSubject.value;
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }
}
