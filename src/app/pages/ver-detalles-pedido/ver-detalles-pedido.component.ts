import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-ver-detalles-pedido',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './ver-detalles-pedido.component.html',
  styleUrls: ['./ver-detalles-pedido.component.css']
})
export class VerDetallesPedidoComponent implements OnInit {
  fields = [
    { label: 'ID de Venta', id: 'idVenta', value: '' },
    { label: 'Fecha de Compra', id: 'fechaCompra', value: '' },
    { label: 'Monto', id: 'monto', value: '' },
    { label: 'ID del Producto', id: 'idProducto', value: '' },
    { label: 'Nombre del Producto', id: 'nombreProducto', value: '' },
    { label: 'ID de Cliente', id: 'idCliente', value: '' },
    { label: 'Nombre del Cliente', id: 'nombreCliente', value: '' },
    { label: 'Apellido', id: 'apellido', value: '' },
    { label: 'DNI', id: 'dni', value: '' },
    { label: 'Dirección', id: 'direccion', value: '' },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Simulación: en un caso real, obtendrías el id de la venta por params y harías fetch a la API
    const example: Record<string, string> = {
      idVenta: '123',
      fechaCompra: '2025-06-01',
      monto: '250.00',
      idProducto: 'A001',
      nombreProducto: 'Teclado Mecánico RGB',
      idCliente: 'C100',
      nombreCliente: 'Juan',
      apellido: 'Pérez',
      dni: '12345678',
      direccion: 'Av. Siempre Viva 123',
    };
    this.fields.forEach(f => f.value = example[f.id] || '');
  }
}
