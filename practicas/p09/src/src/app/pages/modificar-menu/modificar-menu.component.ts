import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-modificar-menu',
  standalone: true,
  imports: [
    MatCardModule,
    MatSidenavModule, MatListModule, MatIconModule, MatToolbarModule
  ],
  templateUrl: './modificar-menu.component.html',
  styleUrls: ['./modificar-menu.component.css']
})
export class ModificarMenuComponent {}
