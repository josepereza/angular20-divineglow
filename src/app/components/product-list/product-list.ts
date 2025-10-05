import { Component, computed, inject } from '@angular/core';
import { ProductoService } from '../../services/product';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
productService=inject(ProductoService)
productos=this.productService.getProductsRs()
misproductos=computed(()=>this.productos.value())

}
