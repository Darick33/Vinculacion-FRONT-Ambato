import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { ProductosCampanasComponent } from './productos-campanas/productos-campanas.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MatIconModule } from '@angular/material/icon';
import { AdopcionesFormComponent } from './adopciones/adopciones.component';
import { FormsModule } from '@angular/forms';
import { DenunciasFormComponent } from './denuncias/denuncias.component';


@NgModule({
  declarations: [RegistroComponent,LoginComponent, ProductosCampanasComponent, LandingPageComponent, AdopcionesFormComponent, DenunciasFormComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatIconModule,
    FormsModule
  ]
})
export class PublicModule { }
