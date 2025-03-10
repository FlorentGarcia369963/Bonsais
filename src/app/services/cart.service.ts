import { Injectable, signal } from '@angular/core';
import { ProductCard } from '../models/product-card';
import { error } from 'node:console';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  cart = signal<ProductCard[]>([]);

  loadCart() {
    // Cart saved in localstorage in stocked in the signal "cart"
    const storedCart = localStorage.getItem('cart');
    storedCart ? this.cart.set(JSON.parse(storedCart)) : [];
  }

  addToCart(product: ProductCard): void {
    // As product is unique, user can put it just once in the cart
    if (this.cart().some((item) => item === product)) {
      return;
    }
    // Store in the cart signal and in the local storage
    this.cart.set([...this.cart(), product]);
    localStorage.setItem('cart', JSON.stringify(this.cart()));
  }

  removeFromCart(product: ProductCard): void {
    this.cart.set(this.cart().filter((item) => item.id !== product.id));
    localStorage.setItem('cart', JSON.stringify(this.cart()));
  }

  clearCart(): void {
    localStorage.removeItem('cart');
  }
}
