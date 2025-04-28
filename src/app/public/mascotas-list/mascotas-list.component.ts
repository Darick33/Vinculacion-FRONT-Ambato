import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Mascotas } from 'src/app/interfaces/mascotas.interface';
import { MascotasService } from 'src/app/services/mascotas.service';
import { AdopcionesFormComponent } from '../adopciones/adopciones.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascotas-list',
  templateUrl: './mascotas-list.component.html',
  styleUrl: './mascotas-list.component.scss'
})
export class MascotasListComponent {
/**
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
 * 🔥 sdsdwdw
 * 🧠 Autor: TuNombresdw
 * 📅 Fecha: 18
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
 */

  constructor(private mascotasService: MascotasService, public dialog: MatDialog, private router: Router,){}
  mascotas: Mascotas[] = [];
  pageSize: number = 4;
  totalMascotas: number = 0;
  pageIndex: number = 0;
  onPageChange(event: PageEvent): void {
     this.pageIndex = event.pageIndex;
     this.loadMascotas(this.pageIndex + 1, );  
   }
  ngOnInit(): void {
    this.loadMascotas()
  }
  loadMascotas(page: number = 1, filter: string = ''): void {
    this.mascotasService.getMascotas(page, this.pageSize).subscribe(response => {
      this.totalMascotas = response.totalCount;
      this.mascotas = response.items;
      console.log(this.mascotas)
    });

  }
  trackByFn(index: number, item: any): any {
    return item.id; // Replace 'id' with the unique identifier of your items
}
  OpenAdopciones(idmascota: string, ) {
    const dialogRef = this.dialog.open(AdopcionesFormComponent, {
      data: { idmascota: idmascota, idtramite: '' } // Pasamos el ID
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }
    goToLogin() {
      this.router.navigate(['/public/login']);
    
  }
}
