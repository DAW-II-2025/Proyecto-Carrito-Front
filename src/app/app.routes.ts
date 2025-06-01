import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ComprarComponent } from './pages/comprar/comprar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { QuienessomosComponent } from './pages/quienessomos/quienessomos.component';
import { VerMisPedidosComponent } from './pages/ver-mis-pedidos/ver-mis-pedidos.component';
import { VerDetallesPedidoComponent } from './pages/ver-detalles-pedido/ver-detalles-pedido.component';
import { VerMiInformacionComponent } from './pages/ver-mi-informacion/ver-mi-informacion.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'comprar', component: ComprarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'quienessomos', component: QuienessomosComponent },
  { path: 'verMisPedidos', component: VerMisPedidosComponent },
  { path: 'verDetallesPedido', component: VerDetallesPedidoComponent },
  { path: 'verMiInformacion', component: VerMiInformacionComponent },
];
