import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { username: 'admin', password: 'adminpass', role: 'admin' },
    { username: 'user', password: 'userpass', role: 'user' }
  ];

  login(username: string, password: string): string | null {
    const usuario = this.users.find(
      u => u.username === username && u.password === password
    );
    if (usuario) {
      localStorage.setItem('role', usuario.role);
      return usuario.role;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('role');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
}
