import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { ProductosCampanasComponent } from './productos-campanas/productos-campanas.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MatIconModule } from '@angular/material/icon';
import { AdopcionesFormComponent } from './adopciones/adopciones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DenunciasFormComponent } from './denuncias/denuncias.component';
import { ChatComponent } from './chat/chat.component';
import { MascotasListComponent } from './mascotas-list/mascotas-list.component';


@NgModule({
  declarations: [RegistroComponent,LoginComponent, ProductosCampanasComponent, LandingPageComponent, AdopcionesFormComponent, DenunciasFormComponent, ChatComponent, MascotasListComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PublicModule { }
