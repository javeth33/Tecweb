import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div style="display: flex; justify-content: center; align-items: center; height: 90vh;">
      <h1>Bienvenido al panel de administración</h1>

    </div>
  `
})
export class BienvenidaComponent {}
