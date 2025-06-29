import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private router: Router, private authService: AuthService) {}

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
        this.authService.login(data.token, data.username);
        this.router.navigate(['/']);
      } else {
        this.error = 'Correo o contraseña incorrectos';
      }
    } catch {
      this.error = 'Error al conectar con el servidor';
    }
  }
}
