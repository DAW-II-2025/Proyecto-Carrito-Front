import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { apiFetch } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

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

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => this.cartItems = items);
    this.cartService.total$.subscribe(total => this.total = total);
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }

  async confirmarCompra() {
    this.error = '';
    this.loading = true;
    try {
      if (!this.authService.isAuthenticated()) {
        alert('Debes iniciar sesión para realizar una compra.');
        this.loading = false;
        return;
      }
      const userEmail = this.authService.getUsername();
      const body = {
        ventaDTO: {
          fechaVenta: this.formatDate(new Date()),
          cli: userEmail || 'correo@ejemplo.com',
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
      const data = await apiFetch('/api/pago/crear-preferencia', {
        method: 'POST',
        body: JSON.stringify(body),
        credentials: 'include'
      });
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
