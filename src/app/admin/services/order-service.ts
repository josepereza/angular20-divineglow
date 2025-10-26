import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreatePedido } from '../../interfaces/pedido';

@Injectable({ providedIn: 'root' })
export class OrdersService {

  private ordersSignal = signal<CreatePedido[]>([]);
  orders = this.ordersSignal.asReadonly();

  private apiUrl = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient) {
    this.loadOrders();
  }

  loadOrders() {
    this.http.get<CreatePedido[]>(this.apiUrl).subscribe({
      next: (data) => this.ordersSignal.set(data),
      error: (err) => console.error('Error cargando pedidos', err)
    });
  }

  updateGesendet(id: number, gesendet: boolean) {
    return this.http.patch(`${this.apiUrl}/${id}`, { gesendet });
  }
}
