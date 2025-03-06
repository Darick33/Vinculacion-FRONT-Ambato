import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BlankComponent } from '../layouts/blank/blank.component';
import { ProductosCampanasComponent } from './productos-campanas/productos-campanas.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      { path: 'landing', component: LandingPageComponent },
      { path: 'post', component: ProductosCampanasComponent },
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
      { path: '', redirectTo: 'landing', pathMatch: 'full' } // Redirección por defecto
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
