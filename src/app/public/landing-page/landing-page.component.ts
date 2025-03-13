import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdopcionesComponent } from '../adopciones/adopciones.component';
import { DenunciasComponent } from '../denuncias/denuncias.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  constructor(private router: Router,
    public dialog: MatDialog,

  ) { }
  goToHome() {
    this.router.navigate(['/public/post']);
  }
  goToLogin() {
    this.router.navigate(['/public/login']);
  }
  OpenDenuncias() {
    const dialogRef = this.dialog.open(DenunciasComponent, {
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }
  OpenAdopciones() {
    const dialogRef = this.dialog.open(AdopcionesComponent, {
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
