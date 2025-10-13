import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ]
})
export class LoginComponent {
  usuario = '';
  password = '';
  mensaje = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {
    if (!this.usuario || !this.password) {
      this.mensaje = 'Por favor ingresa usuario y contraseña';
      return;
    }
    const datos = { usuario: this.usuario, contrasena: this.password };
    this.http.post<any>('http://localhost/Cooters/api/login.php', datos).subscribe(
      res => {
        // Depuración: muestra la respuesta real del backend
        console.log('Respuesta login:', res);
        if (res && res.success && res.rol) {
          const role = (res.rol + '').toLowerCase();
          localStorage.setItem('user', JSON.stringify({ role }));
          if (role === 'admin') {
            setTimeout(() => this.router.navigate(['/bienvenida']), 0);
          } else {
            setTimeout(() => this.router.navigate(['/menu']), 0);
          }
        } else {
          this.mensaje = (res && res.message) ? res.message : 'Usuario o contraseña incorrectos';
        }
      },
      error => {
        this.mensaje = 'Error de conexión con el servidor';
      }
    );
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }
}