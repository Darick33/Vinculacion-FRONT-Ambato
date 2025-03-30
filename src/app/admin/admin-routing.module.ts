import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { U } from '@angular/cdk/keycodes';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { ConfiguracionInicialComponent } from './configuracion-inicial/configuracion-inicial.component';
import { EventosComponent } from './eventos/eventos.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { AdopcionesComponent } from './adopciones/adopciones.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import { EspeciesComponent } from './especies/especies.component';
import { GenerosComponent } from './generos/generos.component';
import { RazasComponent } from './razas/razas.component';


const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: 'inicio', component: DashboardComponent },

      { path: 'usuarios', component: UsuariosComponent },
      { path: 'mascotas', component: MascotasComponent },
      { path: 'config', component: ConfiguracionInicialComponent },
      { path: 'eventos', component: EventosComponent },
      { path: 'adopciones', component: AdopcionesComponent },
      { path: 'denuncias', component: DenunciasComponent },
      { path: 'especies', component: EspeciesComponent },
      { path: 'razas', component: RazasComponent },
      { path: 'generos', component: GenerosComponent },
      { path: 'preguntas-frecuentes', component: PreguntasFrecuentesComponent },
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