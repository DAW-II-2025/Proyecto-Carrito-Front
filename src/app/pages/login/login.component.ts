import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  async handleLogin() {
    this.error = '';
    try {
      const response = await fetch(`${environment.apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          correo: this.email,
          password: this.password
        })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        // Aquí se podría integrar un AuthService para el estado global
        this.router.navigate(['/']);
      } else {
        this.error = 'Correo o contraseña incorrectos';
      }
    } catch {
      this.error = 'Error al conectar con el servidor';
    }
  }
}
