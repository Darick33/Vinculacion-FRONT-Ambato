import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesComponent } from './dashboard/dashboard-components/sales/sales.component';
import { ActivityComponent } from './dashboard/dashboard-components/activity/activity.component';
import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { CardsComponent } from './dashboard/dashboard-components/cards/cards.component';
import { DemoFlexyModule } from '../demo-flexy-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AdminRoutingModule } from './admin-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MascotasFormComponent } from './mascotas/mascotas-form/mascotas-form.component';
import { ConfiguracionInicialComponent } from './configuracion-inicial/configuracion-inicial.component';
import { EventosComponent } from './eventos/eventos.component';
import { AdopcionesComponent } from './adopciones/adopciones.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { DenunciasInformationComponent } from './denuncias/denuncias-information/denuncias-information.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import { PreguntasFormComponent } from './preguntas-frecuentes/preguntas-form/preguntas-form.component';
import { EspeciesComponent } from './especies/especies.component';
import { EspeciesFormComponent } from './especies/especies-form/especies-form.component';
import { RazasFormComponent } from './razas/razas-form/razas-form.component';
import { RazasComponent } from './razas/razas.component';
import { GenerosComponent } from './generos/generos.component';
import { GenerosFormComponent } from './generos/generos-form/generos-form.component';




@NgModule({
  declarations: [
    DashboardComponent,
    ConfiguracionInicialComponent,
    SalesComponent,
    ActivityComponent,
    ProductComponent,
    CardsComponent,
    UsuariosComponent,
    MascotasComponent,
    MascotasFormComponent,
    EspeciesComponent,
    EspeciesFormComponent,
    RazasComponent,
    RazasFormComponent,
    GenerosComponent,
    GenerosFormComponent,
    ConfiguracionInicialComponent,
    EventosComponent,
    AdopcionesComponent,
    DenunciasComponent,
    DenunciasInformationComponent,
    PreguntasFrecuentesComponent,
    PreguntasFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DemoFlexyModule,
    FormsModule,
    NgApexchartsModule,
    AdminRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [
    DashboardComponent,
    SalesComponent,
    ActivityComponent,
    ProductComponent,
  ]
})
export class AdminModule { }
