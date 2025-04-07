import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tramite } from 'src/app/interfaces/tramites.interface';
import { DenunciasComponent } from '../../denuncias/denuncias.component';
import { TramitesService } from 'src/app/services/tramites.service';
import { MascotasService } from 'src/app/services/mascotas.service';
import { Mascotas } from 'src/app/interfaces/mascotas.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-adopciones-information',
  templateUrl: './adopciones-information.component.html',
  styleUrl: './adopciones-information.component.scss'
})
export class AdopcionesInformationComponent {
  denuncia: Tramite;
  mascota: Mascotas | undefined;
  adopcionInfo: { mascota: Mascotas, tramite: Tramite } | undefined;
   constructor( public dialogRef: MatDialogRef<DenunciasComponent>,
       @Inject(MAT_DIALOG_DATA) public data: { idmascota: string, idtramite: string }, private tramiteService: TramitesService, private mascotaService: MascotasService) {
    this.denuncia = {
      id: '',
      nombre: '',
      apellido: '',
      email: '',
      contacto: '',
      datos: '',
      fecha: '',
      numerotramite: 0,
      direccion: '',
      idtipotramite: '',
      idestadotramite: '',
      estaactivo: false,
      tipotramite: {
        id: '',
        nombre: '',
        estaactivo: false
      },
      estadostramite: {
        id: '',
        nombre: '',
        orden: 0,
        estaactivo: false
      },
      archivostramites: []
    };
  }

  ngOnInit(): void {
    this.loadAdopcionInfo(); // Usamos el método con forkJoin
  }

  loadAdopcionInfo() {
    forkJoin({
      tramite: this.tramiteService.getTramiteById(this.data.idtramite),
      mascota: this.mascotaService.getMascotaById(this.data.idmascota)
    }).subscribe({
      next: ({ tramite, mascota }) => {
        this.adopcionInfo = { tramite, mascota };
        this.denuncia = tramite;
        this.mascota = mascota;
        console.log('Adopción Info:', this.adopcionInfo);
      },
      error: (error) => {
        console.error('Error al cargar la información', error);
      }
    });
  }

  files: File[] = [];

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.files = Array.from(target.files);
    }
  }
}
