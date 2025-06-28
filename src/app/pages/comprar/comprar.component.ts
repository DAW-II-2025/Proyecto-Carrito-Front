import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-comprar',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent, FormsModule],
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {
  direccion: string = '';
  distrito: string = '';
  nombreReceptor: string = '';
  referencia: string = '';
  telefono: string = '';
  total: number = 0;
  cartItems: CartItem[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => this.cartItems = items);
    this.cartService.total$.subscribe(total => this.total = total);
  }

  async confirmarCompra() {
    this.error = '';
    this.loading = true;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Debes iniciar sesión para realizar una compra.');
        this.loading = false;
        return;
      }
      const body = {
        ventaDTO: {
          fechaVenta: new Date(),
          cli: '', // Aquí deberías poner el correo del usuario autenticado
        },
        detallesDTO: this.cartItems.map((item) => ({
          cant: item.quantity,
          producto: item.id,
        })),
        pedidoDTO: {
          distrito: this.distrito,
          direccion: this.direccion,
          referencia: this.referencia,
          nombreReceptor: this.nombreReceptor,
          telefono: this.telefono,
        },
      };
      // Obtener correo del usuario autenticado si está disponible en localStorage
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        body.ventaDTO.cli = userEmail;
      } else {
        body.ventaDTO.cli = 'correo@ejemplo.com'; // Valor por defecto si no hay correo
      }
      const response = await fetch(`${environment.apiUrl}/api/pago/crear-preferencia`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body),
        credentials: 'include'
      });
      const data = await response.json();
      if (data.init_point) {
        this.cartService.clearCart();
        alert('Tu compra ha sido procesada con éxito. Serás redirigido a MercadoPago.');
        window.open(data.init_point, '_blank');
      } else {
        throw new Error('No se recibió el enlace de redirección.');
      }
    } catch (error: any) {
      this.error = 'Hubo un problema al procesar tu compra. Por favor, inténtalo de nuevo.';
      alert(this.error);
    } finally {
      this.loading = false;
    }
  }

  cancelarCompra() {
    if (confirm('¿Estás seguro de que quieres cancelar la compra?')) {
      window.location.href = '/';
    }
  }
}
