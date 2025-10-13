import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private _items: any[] = [];

  agregar(producto: any) {
    this._items.push(producto);
  }

  get items() {
    return this._items;
  }

  limpiar() {
    this._items = [];
  }

  obtenerProductos(): any[] {
    return this._items;
  }
}
