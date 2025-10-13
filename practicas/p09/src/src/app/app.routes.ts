import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'bienvenida', loadComponent: () => import('./pages/bienvenida/bienvenida.component').then(m => m.BienvenidaComponent) },
      { path: 'detalle-pedido', loadComponent: () => import('./pages/detalle-pedido/detalle-pedido.component').then(m => m.DetallePedidoComponent) },
      { path: 'gestion-productos', loadComponent: () => import('./pages/gestion-productos/gestion-productos.component').then(m => m.GestionProductosComponent) },
      { path: 'modificar-menu', loadComponent: () => import('./pages/modificar-menu/modificar-menu.component').then(m => m.ModificarMenuComponent) },
      { path: 'visualizar-pedidos', loadComponent: () => import('./pages/visualizar-pedidos/visualizar-pedidos.component').then(m => m.VisualizarPedidosComponent) },
      { path: '', redirectTo: 'bienvenida', pathMatch: 'full' }
    ]
  },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'menu', loadComponent: () => import('./Menu/Menu.component').then(m => m.MenuComponent) },
  { path: 'carrito', loadComponent: () => import('./carrito/carrito.component').then(m => m.CarritoComponent) },
  { path: 'registro', loadComponent: () => import('./registro/registro.component').then(m => m.RegistroComponent) },
  { path: '**', redirectTo: 'login' }
];
