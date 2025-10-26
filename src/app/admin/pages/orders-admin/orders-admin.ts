import { Component, inject, OnInit, signal } from '@angular/core';
import { CreatePedido } from '../../../interfaces/pedido';
import { OrdersService } from '../../services/order-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-orders-admin',
  templateUrl: 'orders-admin.html',
  imports: [RouterLink],
})
export class OrdersAdminComponent implements OnInit {
  ordersService=inject(OrdersService)  
  constructor() {}
  ngOnInit(): void {
    this.ordersService.loadOrders(); // ✅ Recarga automática al entrar
  }
  
  orders = this.ordersService.orders;

  selectedOrder = signal<CreatePedido | null>(null);
showLinesModal = signal(false);

viewLines(order: CreatePedido) {
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
