import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  cliente = {
    IdCliente: null,
    Nombres: '',
    Apellidos: '',
    Direccion: '',
    FechaNacimiento: '',
    Sexo: '',
    dni: '',
    telefono: '',
    correo: '',
    Password: '',
    termsAccepted: false,
  };

  error: string = '';
  loading: boolean = false;

  async handleSubmit() {
    if (!this.cliente.termsAccepted) {
      alert('Debes aceptar los términos y condiciones.');
      return;
    }
    const payload = {
      idCliente: 0,
      nombres: this.cliente.Nombres,
      apellidos: this.cliente.Apellidos,
      direccion: this.cliente.Direccion,
      fechaNacimiento: this.cliente.FechaNacimiento,
      sexo: this.cliente.Sexo === 'male' ? 'm' : 'f',
      dni: this.cliente.dni,
      telefono: this.cliente.telefono,
      correo: this.cliente.correo,
      password: this.cliente.Password,
      estado: 'A'
    };
    this.loading = true;
    this.error = '';
    try {
      const response = await fetch(`${environment.apiUrl}/api/Cliente/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });
      if (response.ok) {
        alert('Registro exitoso');
        this.cliente = {
          IdCliente: null,
          Nombres: '',
          Apellidos: '',
          Direccion: '',
          FechaNacimiento: '',
          Sexo: '',
          dni: '',
          telefono: '',
          correo: '',
          Password: '',
          termsAccepted: false,
        };
      } else {
        const errorData = await response.json();
        this.error = errorData.message || 'No se pudo registrar';
        alert(`Error: ${this.error}`);
      }
    } catch (error: any) {
      this.error = 'Error al conectar con el servidor';
      alert(this.error);
    } finally {
      this.loading = false;
    }
  }
}
