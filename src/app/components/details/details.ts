import { Component, inject, input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart';
import { ProductoService } from '../../services/product';
import { Product } from '../../interfaces/product';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe,CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {
// Inyección de dependencias moderna
  private route = inject(ActivatedRoute);
  private productService = inject(ProductoService);
  cartService = inject(CartService);

  // --- El State del componente gestionado por Signals ---
  // Signal para el producto actual. Se inicializa como undefined.
  product = signal<Product | undefined>(undefined);
  // Signal para el feedback visual al añadir al carrito.
  addedToCart = signal(false);

  ngOnInit(): void {
    // --- Lógica Reactiva ---
    // 1. Escuchamos los cambios en los parámetros de la URL (paramMap es un Observable).
    this.route.paramMap.pipe(
      // 2. Usamos switchMap para cancelar la petición anterior si el usuario navega rápidamente
      //    y mapeamos el ID del producto a una nueva petición HTTP.
      switchMap(params => {
        const productId = Number(params.get('id'));
        // 3. Obtenemos la lista completa de productos.
        return this.productService.getProducts().pipe(
          // 4. Usamos el operador map de RxJS para transformar el array de productos
          //    en el único producto que coincide con el ID.
          map(products => products.find(p => p.id === productId))
        );
      })
    ).subscribe(foundProduct => {
      // 5. Cuando el producto se encuentra, actualizamos nuestro signal.
      //    La vista (HTML) reaccionará automáticamente a este cambio.
      this.product.set(foundProduct);
    });
  }

  addItemToCart() {
    // Ahora leemos el valor del signal con product()
    const currentProduct = this.product();
    if (currentProduct) {
      this.cartService.addToCart(currentProduct);
      this.addedToCart.set(true);
      setTimeout(() => this.addedToCart.set(false), 2000);
    }
  }
}
