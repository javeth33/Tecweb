import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule
  ],
  template: `
    <mat-sidenav-container style="min-height: 100vh;">
      <mat-sidenav #sidenav mode="over" [opened]="false">
        <mat-toolbar color="primary">Menú</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item routerLink="/bienvenida" (click)="sidenav.close()">
            <mat-icon>home</mat-icon>
            Bienvenida
          </a>
          <a mat-list-item routerLink="/detalle-pedido" (click)="sidenav.close()">
            <mat-icon>assignment</mat-icon>
            Detalle de Pedido
          </a>
          <a mat-list-item routerLink="/gestion-productos" (click)="sidenav.close()">
            <mat-icon>inventory_2</mat-icon>
            Gestión de Productos
          </a>
          <a mat-list-item routerLink="/modificar-menu" (click)="sidenav.close()">
            <mat-icon>edit</mat-icon>
            Modificar Menú
          </a>
          <a mat-list-item routerLink="/visualizar-pedidos" (click)="sidenav.close()">
            <mat-icon>list_alt</mat-icon>
            Visualizar Pedidos
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()" aria-label="Menú lateral" style="margin-right: 8px;">
            <mat-icon>menu</mat-icon>
          </button>
          <span>Panel de Administración</span>
          <span style="flex:1 1 auto"></span>
          <button mat-button (click)="cerrarSesion()" aria-label="Cerrar sesión">
            <mat-icon>logout</mat-icon>
            Cerrar sesión
          </button>
        </mat-toolbar>
        <div style="padding: 24px;">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class AdminLayoutComponent {
  constructor(private router: Router) {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }
    try {
      const user = JSON.parse(userStr);
      if (!user.role || user.role.toLowerCase() !== 'admin') {
        this.router.navigate(['/login']);
      }
    } catch {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
