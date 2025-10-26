import { Component, inject, signal } from '@angular/core';
import { CreatePedido } from '../../../interfaces/pedido';
import { OrdersService } from '../../services/order-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-orders-admin',
  templateUrl: 'orders-admin.html',
  imports: [RouterLink],
})
export class OrdersAdminComponent {
  ordersService=inject(OrdersService)  
  constructor() {}
  orders = this.ordersService.orders;

  selectedOrder = signal<any | null>(null);
showLinesModal = signal(false);

viewLines(order: any) {
  this.selectedOrder.set(order);
  this.showLinesModal.set(true);
}

  toggleGesendet(order: CreatePedido) {
    const nuevoEstado = !order.gesendet;
    this.ordersService.updateGesendet(order.id!, nuevoEstado).subscribe({
      next: () => {
        order.gesendet = nuevoEstado; // Actualiza vista rápidamente ✅
      },
      error: (err) => console.error('Error al actualizar pedido', err),
    });
  }
}
