export interface LineaPedido {
  productoId: number;
  cantidad: number;
}

export interface CreatePedido {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  lineas: LineaPedido[];
}
