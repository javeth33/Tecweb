import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    // ...otros módulos necesarios...
  ],
})
export class DetallePedidoComponent implements OnInit {
  pedido: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Lógica para cargar el pedido por ID, por ejemplo desde la ruta
    // this.pedido = ...;
  }

  volver() {
    // Lógica para volver a la lista de pedidos
    this.router.navigate(['/pedidos']);
  }
}