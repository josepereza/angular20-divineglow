import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePedido } from '../interfaces/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:3000/pedidos'; // Asegúrate de que esta sea la URL correcta de tu API

  constructor(private http: HttpClient) { }

  createPedido(pedidoData: CreatePedido): Observable<any> {
    console.log('pedido service',pedidoData)
    return this.http.post<any>(this.apiUrl, pedidoData)
  }
}
