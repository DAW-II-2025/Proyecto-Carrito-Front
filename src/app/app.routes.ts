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
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: 'comprar', component: ComprarComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'quienessomos', component: QuienessomosComponent, canActivate: [AuthGuard] },
  { path: 'verMisPedidos', component: VerMisPedidosComponent, canActivate: [AuthGuard] },
  { path: 'verDetallesPedido', component: VerDetallesPedidoComponent, canActivate: [AuthGuard] },
  { path: 'verMiInformacion', component: VerMiInformacionComponent, canActivate: [AuthGuard] },
];
