import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost/Cooters/api/pedidos.php';

  constructor(private http: HttpClient) {}

  // Ahora acepta un array de productos
  realizarPedido(productos: any[], cliente: string) {
    return this.http.post(this.apiUrl, { productos, cliente });
  }
}
