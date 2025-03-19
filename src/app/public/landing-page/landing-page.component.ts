import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdopcionesComponent } from '../adopciones/adopciones.component';
import { DenunciasComponent } from '../denuncias/denuncias.component';
import { Mascotas } from 'src/app/interfaces/mascotas.interface';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
cantidad: number = 3;
  mascotas: Mascotas[] = [];
  constructor(private router: Router,
    public dialog: MatDialog, private mascotasService: MascotasService

  ) { }
  ngOnInit(): void {
    this.mascotasService.getMascotas(1, 3).subscribe((response) => {
      this.mascotas = response.items;
      console.log(this.mascotas);
      this.cantidad = this.mascotas.length
    });
  }
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
