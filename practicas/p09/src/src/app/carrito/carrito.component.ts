import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, MatButtonModule]
})
export class CarritoComponent {
  mensaje = '';
  pedidoService: any;

  constructor(
    public carritoService: CarritoService,
    private http: HttpClient,
    private router: Router
  ) {}

  // Asegúrate de tener un método para obtener los productos del carrito:
  productos() {
    return this.carritoService.obtenerProductos();
  }

  totalProductos() {
    return this.productos().reduce((acc: any, p: { cantidad: any; }) => acc + (p.cantidad || 1), 0);
  }

  getTotal() {
    return this.carritoService.obtenerProductos().reduce((acc: number, p: { precio?: number }) => acc + (p.precio || 0), 0);
  }

  getImgUrl(producto: any): string {
    const tipo = producto.tipo ? producto.tipo : 'otros';
    let nombre = producto.nombre ? producto.nombre.toLowerCase().replace(/ /g, '_') : 'default';
    // Elimina acentos
    nombre = nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return `assets/images/${tipo}s/${nombre}.jpg`;
  }

  eliminarProducto(index: number) {
    const productos = this.carritoService.obtenerProductos();
    productos.splice(index, 1);
  }

  limpiarCarrito() {
    const productos = this.carritoService.obtenerProductos();
    productos.length = 0;
  }

  confirmarPedido() {
    const productos = this.carritoService.obtenerProductos();
    if (!productos || productos.length === 0) {
      this.mensaje = 'No hay productos en el carrito.';
      return;
    }
    // Envía nombre y productos al backend
    const nombre = localStorage.getItem('nombre') || 'Invitado';
    this.http.post('http://localhost/Cooters/api/pedidos.php', { productos, nombre }).subscribe(
      res => {
        this.mensaje = '¡Su pedido se ha realizado correctamente!';
        this.limpiarCarrito();
      },
      error => {
        this.mensaje = 'Error al enviar el pedido.';
        console.error('Error al enviar el pedido:', error);
      }
    );
  }

  volverAlMenu() {
    // Asegúrate de usar la ruta correcta del menú principal, por ejemplo:
    this.router.navigate(['/menu']);
  }

  realizarPedido() {
    const productos = this.carritoService.obtenerProductos();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const cliente = user.nombre || 'Invitado';
    this.pedidoService.realizarPedido(productos, cliente).subscribe({
      next: () => {
        this.carritoService.limpiar();
      },
      error: (err: any) => console.error('Error al guardar pedido', err)
    });
  }
}
