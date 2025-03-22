import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tramite } from 'src/app/interfaces/tramites.interface';
import { DenunciasComponent } from '../denuncias.component';
import { TramitesService } from 'src/app/services/tramites.service';

@Component({
  selector: 'app-denuncias-information',
  templateUrl: './denuncias-information.component.html',
  styleUrl: './denuncias-information.component.scss'
})
export class DenunciasInformationComponent {
  denuncia: Tramite;
   constructor( public dialogRef: MatDialogRef<DenunciasComponent>,
       @Inject(MAT_DIALOG_DATA) public data: { id: string }, private tramiteService: TramitesService) {
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

  files: File[] = []; // Almacena los archivos seleccionados

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  ngOnInit(): void {
    console.log(this.data.id);
    this.getTramite();
  }
  getTramite(){
    this.tramiteService.getTramiteById(this.data.id).subscribe({
      next: (data: any) => {
        this.denuncia = data;
        console.log(this.denuncia);
      },
      error: error => {
        console.log('Error en la peticion' , 'error');
      },
      complete: () => {
      }
    });

  }
  

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.files = Array.from(target.files);
    }
  }
}
