import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';

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

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => this.cartItems = items);
    this.cartService.total$.subscribe(total => this.total = total);
  }

  confirmarCompra() {
    // Lógica para confirmar la compra
    alert('Compra confirmada (simulación)');
  }

  cancelarCompra() {
    // Lógica para cancelar la compra
    alert('Compra cancelada (simulación)');
  }
}
