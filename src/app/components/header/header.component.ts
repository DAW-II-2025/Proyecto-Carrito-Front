import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAccountDropdownVisible = false;
  isCartVisible = false;
  cartItems: CartItem[] = [];
  total = 0;

  categorias: string[] = [
    'Monitores', 'Televisores', 'Micrófonos', 'Impresoras', 'Almacenamiento',
    'Routers', 'Camaras', 'Tablets', 'Consolas', 'Altavoces', 'Seguridad', 'Teléfonos', 'Teclados', 'Laptops', 'Componentes', 'Proyectores'
  ];

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => this.cartItems = items);
    this.cartService.total$.subscribe(total => this.total = total);
  }

  toggleAccountDropdown() {
    this.isAccountDropdownVisible = !this.isAccountDropdownVisible;
  }

  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }

  handleCheckout() {
    this.router.navigate(['/comprar']);
  }

  increaseQuantity(id: number) {
    const item = this.cartItems.find(i => i.id === id);
    if (item) this.cartService.addToCart(item);
  }

  decreaseQuantity(id: number) {
    this.cartService.removeFromCart(id);
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getTotal(): string {
    return this.total.toFixed(2);
  }

  navigateToCategoria(categoria: string) {
    this.router.navigate(['/productos'], { queryParams: { categoria } });
  }
}
