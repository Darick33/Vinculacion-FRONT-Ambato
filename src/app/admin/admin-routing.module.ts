import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { U } from '@angular/cdk/keycodes';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { AdminComponent } from './configuracion_Incial/admin.component';


const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: 'inicio', component: DashboardComponent },

      { path: 'usuarios', component: UsuariosComponent },
      { path: 'mascotas', component: MascotasComponent },
      { path: 'config', component: AdminComponent },
      // { path: 'roles', component: LoginComponent },
      { path: '', redirectTo: 'public/landing', pathMatch: 'full' } // Redirección por defecto
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }