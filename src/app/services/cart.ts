import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Signal para gestionar el estado del carrito
  cartItems = signal<Product[]>([]);

  // Signals computados para valores derivados
  totalItems = computed(() => this.cartItems().length);
  totalPrice = computed(() => this.cartItems().reduce((acc, item) => acc + item.price, 0));

  addToCart(product: Product) {
    this.cartItems.update(items => [...items, product]);
  }

  removeFromCart(productId: number) {
    this.cartItems.update(items => items.filter(item => item.id !== productId));
  }

   // NUEVO MÉTODO
  clearCart() {
    this.cartItems.set([]);
  }
}
