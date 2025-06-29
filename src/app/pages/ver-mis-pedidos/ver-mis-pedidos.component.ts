import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

interface Venta {
  idVenta: number;
  monto: number;
  fechaVenta: string;
  pago: any;
  pedido: any;
  detalles: any[];
  paymentId: string | null;
}

@Component({
  selector: 'app-ver-mis-pedidos',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './ver-mis-pedidos.component.html',
  styleUrls: ['./ver-mis-pedidos.component.css']
})
export class VerMisPedidosComponent implements OnInit {
  ventas: Venta[] = [];
  error: string | null = null;

  async ngOnInit() {
    try {
      const token = localStorage.getItem('token');
      const headers: any = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      };
      const response = await fetch(`${environment.apiUrl}/Venta/mis-ventas`, {
        method: 'GET',
        headers,
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Error al cargar las ventas');
      const data = await response.json();
      if (Array.isArray(data)) {
        this.ventas = data;
      } else {
        this.error = 'La respuesta no es una lista';
      }
    } catch (error) {
      this.error = 'Error al cargar las ventas';
    }
  }
}
