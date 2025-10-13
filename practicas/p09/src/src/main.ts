import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { enableProdMode } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

// Puedes quitar este mensaje de la consola comentando o eliminando la siguiente línea:
enableProdMode();

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()],
}).catch((err) => console.error(err));
