export interface LineaPedido {
  productoId: number;
  cantidad: number;
}

export interface CreatePedido {
  id?:number;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  totalAmount?: number;
  gesendet?: boolean;
  lineas: LineaPedido[];
  createdAt?:Date;
}
