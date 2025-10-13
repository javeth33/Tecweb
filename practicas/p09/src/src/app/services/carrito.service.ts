import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private productos: any[] = [];

  agregar(producto: any) {
    this.productos.push(producto);
  }

  obtenerProductos(): any[] {
    return this.productos;
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
  }

  limpiar() {
    this.productos = [];
  }
}
