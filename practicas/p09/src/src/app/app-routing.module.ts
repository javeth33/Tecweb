import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './Menu/Menu.component';

const routes: Routes = [
  // ...otras rutas...
  { path: 'Menu', loadComponent: () => import('./Menu/Menu.component').then(m => m.MenuComponent) },
  // ...otras rutas...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }