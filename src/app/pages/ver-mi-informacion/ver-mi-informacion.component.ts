import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-ver-mi-informacion',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './ver-mi-informacion.component.html',
  styleUrls: ['./ver-mi-informacion.component.css']
})
export class VerMiInformacionComponent {
  fields = [
    { label: 'Apellidos', id: 'apellidos' },
    { label: 'Nombres', id: 'nombres' },
    { label: 'Dirección', id: 'direccion' },
    { label: 'Fecha de Nacimiento', id: 'fechaNacimiento' },
    { label: 'Sexo', id: 'sexo' },
    { label: 'Correo', id: 'correo' },
    { label: 'Contraseña', id: 'password' },
    { label: 'Estado', id: 'estado' },
  ];
}
