import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);

  cartItems$ = this.cartItemsSubject.asObservable();
  total$ = this.totalSubject.asObservable();

  get cartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  get total(): number {
    return this.totalSubject.value;
  }

  addToCart(item: CartItem) {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = this.cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      updatedCart = [...this.cartItems, { ...item, quantity: 1 }];
    }
    this.cartItemsSubject.next(updatedCart);
    this.totalSubject.next(this.total + item.price);
  }

  removeFromCart(itemId: number) {
    const itemToRemove = this.cartItems.find(item => item.id === itemId);
    if (itemToRemove) {
      let updatedCart;
      if (itemToRemove.quantity > 1) {
        updatedCart = this.cartItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        updatedCart = this.cartItems.filter(item => item.id !== itemId);
      }
      this.cartItemsSubject.next(updatedCart);
      this.totalSubject.next(this.total - itemToRemove.price);
    }
  }

  clearCart() {
    this.cartItemsSubject.next([]);
    this.totalSubject.next(0);
  }
}
