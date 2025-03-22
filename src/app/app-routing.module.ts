import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormsComponent } from './components/forms/forms.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { LandingPageComponent } from './public/landing-page/landing-page.component';
import { ProductosCampanasComponent } from './public/productos-campanas/productos-campanas.component';
import { FullEjemploComponent } from './layouts/fullEjemplo/full.component';
import { LoginComponent } from './public/login/login.component';
import { RegistroComponent } from './public/registro/registro.component';

const routes: Routes = [
  {
    path: '',
    component: FullEjemploComponent,
    children: [
      { path: '', redirectTo: '/public/landing', pathMatch: 'full' },
      { path: 'home', component: DashboardComponent },
      { path: 'alerts', component: AlertsComponent },
      { path: 'forms', component: FormsComponent },
      { path: 'table', component: ProductComponent },
      { path: 'grid-list', component: GridListComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'tabs', component: TabsComponent },
      { path: 'expansion', component: ExpansionComponent },
      { path: 'chips', component: ChipsComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'toolbar', component: ToolbarComponent },
      { path: 'progress-snipper', component: ProgressSnipperComponent },
      { path: 'snackbar', component: SnackbarComponent },
      { path: 'slider', component: SliderComponent },
      { path: 'slide-toggle', component: SlideToggleComponent },
      { path: 'tooltip', component: TooltipsComponent },
      { path: 'button', component: ButtonsComponent },
    ]
  },
  // {
  //   path: '',
  //   component: FullComponent,
  //   children: [
  //     { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  //     { path: 'inicio', component: DashboardComponent },
  //   ]
  // },
  {
    path: 'public',
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },

  

  { path: '**', redirectTo: '/public/landing', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
