import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-gestion-productos',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule, MatListModule, MatIconModule, MatToolbarModule
  ],
  template: `
    <div class="gestion-productos-container">
      <h1>Gestión de Productos</h1>
      <!-- Aquí va la lógica y vista de productos -->
      <p>Agrega, elimina o actualiza productos aquí.</p>
    </div>
  `,
  styles: [`
    .gestion-productos-container {
      max-width: 700px;
      margin: auto;
      padding: 2rem;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
  `]
})
export class GestionProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.cargarProductos();
  }

  agregarProducto(producto: any) {
    this.http.post('/api/agregar_producto.php', producto).subscribe(() => this.cargarProductos());
  }

  eliminarProducto(id: number) {
    this.http.post('/api/eliminar_producto.php', { id }).subscribe(() => this.cargarProductos());
  }

  actualizarProducto(producto: any) {
    this.http.post('/api/actualizar_producto.php', producto).subscribe(() => this.cargarProductos());
  }

  cargarProductos() {
    this.http.get('/api/productos.php').subscribe((data: any) => this.productos = data);
  }
}