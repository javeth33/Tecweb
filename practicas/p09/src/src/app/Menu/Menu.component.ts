import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-menu',
  templateUrl: './Menu.component.html',
  styleUrls: ['./Menu.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MenuComponent {
  hamburguesas = [
    { nombre: 'Clásica', precio: '60', descripcion: 'Carne, queso amarillo, verdura .', imagen: 'hamburguesa_clasica.jpg' },
    { nombre: 'Hawaiana',precio: '99', descripcion: 'Pan Artesanal,Carne, costra de quesillo, piña, verdura, .', imagen: 'hamburguesa_hawaiana.jpg' },
    { nombre: 'Monster', precio: '240', descripcion: 'Pan Artesanal,Doble carne, doble queso, tocino, gaucamole, costra de quesillo, salchicha, champiñones y verdura.', imagen: 'hamburguesa_monster.jpg' },
    { nombre: 'Italiana', precio: '105', descripcion: 'Pan Artesanal, Carne, verdura, costra de quesillo, tocino, pepperoni.', imagen: 'hamburguesa_italiana.jpg' },
    { nombre: 'Super Mexa', precio: '105', descripcion: 'Pan Artesanal,Carne, guacamole,costra de quesillo, chorizo.', imagen: 'hamburguesa_super_mexa.jpg' },
    { nombre: 'Mexican Power',precio: '99', descripcion: 'Pan Artesanal, Carne, verdura, costra de quesillo, guacamole, champiñones y tocino.', imagen: 'hamburguesa_mexican_power.jpg' },
    { nombre: 'Argentina', precio: '120', descripcion: 'Pan Artesanal,Carne,chorizo argentino, tocino, costra de quesillo y verdura.', imagen: 'hamburguesa_argentina.jpg' },
    { nombre: 'Crunchy', precio: '140', descripcion: 'Pan Artesanal, boneless con salsa favorita,costra de queso y verdura.', imagen: 'hamburguesa_crunchy.jpg' },
    { nombre: 'Ranchera',precio: '99',  descripcion: 'Pan Artesanal, Carne, costra de queso, tocino, salchicha y verdura.', imagen: 'hamburguesa_ranchera.jpg' },
  ];
  hotdogs = [
    { nombre: 'HAWAIANO', precio: '60', descripcion: 'Salchicha acompañado de tocino, verdura, una costra de quesillo y piña', imagen:'hotdog_hawaiano.jpg'},
    { nombre: 'ITALIANO', precio: '60', descripcion: 'Salchicha acompañada de tocino, verdura, una costra de quesillo', imagen: 'hotdog_italiano.jpg' },
    { nombre: 'DORITOS', precio: '60', descripcion: 'Salchicha acompañada de tocino, verdura, una costra de quesillo y doritos', imagen: 'hotdog_doritos.jpg' },
    { nombre: 'AZTECA', precio: '60', descripcion: 'Salchicha acompañada de tocino, verdura, una costra de quesillo, guacamole y champiñones',imagen: 'hotdog_azteca.jpg'  },
    { nombre: 'ARGENTINO', precio: '80', descripcion: 'Salchicha argentina acompañada de tocino, verdura y una costra de quesillo',imagen: 'hotdog_azteca.jpg' },
    { nombre: 'SENCILLO', precio: '40', descripcion: 'Salchicha acompañada de tocino y verdura',imagen: 'hotdog_azteca.jpg' }
  ];
  entradas = [
    {nombre: 'DEDOS DE QUESO ORDEN 6 PIEZAS', precio: '99', descripcion: 'Palito de queso empanizado acompañado de tu salsa favorita', imagen:'dedos_de_queso.jpg'},
    {nombre: 'PAPAS BONELES',precio: '119',descripcion: 'Papas a la francesa acompañadas de queso cheddar y boneless con tu salsa favorita',imagen:'papas_boneless.jpg'},
    {nombre: 'NACHOS CON CARNE',precio: '85',descripcion: 'Totopo acompañado de trozos de carne, queso cheddar, una costra de quesillo, guacamole y aderezo ranch'},
    {nombre: 'ORDEN DE BONELES 600 gramos',precio: '250',descripcion: ''},
    {nombre: 'ORDEN DE ALITAS 500 gramos',precio: '149',descripcion: 'Pechuga en trozos bañados en tu salsa preferida'},
    {nombre: 'PAPAS SENCILLAS',precio: '55',descripcion: 'Papa frita con corte natural'},
    {nombre: 'PAPAS FLAMINT HOT',precio: '65',descripcion: 'Papas a la francesa acompañadas de queso cheddar y fritura flamint hot',imagen:'PAPAS_FLEMINT_HOT.jpg'},
    {nombre: 'SALCHIPAPAS',precio: '69',descripcion: 'Papa a la francesa acompañada de queso cheddar y salchicha'},
  ];
  bebidas = [
    { nombre: 'AGUA DE 1 LITRO', precio: '50', descripcion: 'Fresa, horchata, jamaica, maracuyá', imagen:"" },
    { nombre: 'AGUA DE 1/2 LITRO', precio: '29', descripcion: 'Fresa, horchata, jamaica, maracuyá' },
    { nombre: 'REFRESCO', precio: '33', descripcion: '' },
    { nombre: 'MALTEADA', precio: '89', descripcion: 'Helado cremoso acompañado de vainilla o crema batida' }
  ];
  postres = [
    { nombre: 'MALTEADA ESPECIAL', precio: '99', descripcion: 'Helado cremoso acompañado de OREO o Maza batido', imagen:"" },
    { nombre: 'Malteadas de Kinder bueno', precio: '110', descripcion: '' },
    { nombre: 'Malteadas de Bruce', precio: '110', descripcion: '' }
  ];

  usuario: string = '';
  password: string = '';
  rol: string = '';
  mensaje: string = '';
  carritoCantidad: number = 0;
h: any;
e: any;

  constructor(private router: Router, private carritoService: CarritoService) {}

  agregarAlCarrito(item: any, tipo: string) {
    this.carritoService.agregar({ ...item, tipo });
    // Actualiza el contador del carrito
    this.carritoCantidad = this.carritoService.obtenerProductos().length;
    // Opcional: puedes actualizar el contador en ngOnInit también si el usuario recarga la página
  }

  ngOnInit() {
    this.carritoCantidad = this.carritoService.obtenerProductos().length;
  }

  confirmarPedido() {
    alert('Pedido confirmado');
  }

  login() {
    // Simulación de autenticación
    if (this.usuario === 'admin' && this.password === 'admin123') {
      this.rol = 'admin';
      this.router.navigate(['/admin']);
    } else if (this.usuario && this.password) {
      this.rol = 'cliente';
      this.router.navigate(['/menu']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  goRegistro() {
    this.router.navigate(['/registro']);
  }

  getImgUrl(nombre: string, categoria: string): string {
    // Unifica la ruta para postres y bebidas
    let folder = categoria;
    if (categoria.toLowerCase().includes('postre')) folder = 'postres';
    if (categoria.toLowerCase().includes('bebida')) folder = 'bebidas';

    let imagen = nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ /g, '_') + '.jpg';

    return `assets/imagenes/${folder}/${imagen}`;
  }

  irAlCarrito() {
    this.router.navigate(['/carrito']);
  }
}
