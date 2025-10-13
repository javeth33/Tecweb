import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div style="max-width:400px;margin:30px auto;">
      <h2>Registro</h2>
      <form (ngSubmit)="registrar()">
        <div>
          <label>Nombre:</label>
          <input name="nombre" [(ngModel)]="user.nombre" required class="form-control">
        </div>
        <div>
          <label>Apellido:</label>
          <input name="apellido" [(ngModel)]="user.apellido" required class="form-control">
        </div>
        <div>
          <label>Correo:</label>
          <input name="correo" [(ngModel)]="user.correo" type="email" required class="form-control">
        </div>
        <div>
          <label>Usuario:</label>
          <input name="usuario" [(ngModel)]="user.usuario" required class="form-control">
        </div>
        <div>
          <label>Contraseña:</label>
          <input name="contrasena" [(ngModel)]="user.contrasena" type="password" required class="form-control">
        </div>
        <div>
          <label>Teléfono:</label>
          <input name="telefono" [(ngModel)]="user.telefono" required class="form-control">
        </div>
        <button type="submit" class="btn btn-primary" style="margin-top:10px;">Registrar</button>
      </form>
      <div *ngIf="mensaje" style="margin-top:10px;">{{mensaje}}</div>
    </div>
  `
})
export class RegistroComponent {
  user = { nombre: '', apellido: '', correo: '', usuario: '', contrasena: '', telefono: '' };
  mensaje = '';

  constructor(private http: HttpClient, private router: Router) {}

  registrar() {
    this.http.post('http://localhost/Cooters/api/registros.php', this.user).subscribe((res: any) => {
      if (res.success) {
        this.mensaje = 'Registro exitoso. Redirigiendo al login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      } else {
        this.mensaje = res.message || 'Error al registrar';
      }
    });
  }
}
