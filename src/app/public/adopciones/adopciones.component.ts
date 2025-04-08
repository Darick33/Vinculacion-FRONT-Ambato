import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdopcionesComponent } from 'src/app/admin/adopciones/adopciones.component';
import { Adopcion } from 'src/app/interfaces/adopciones.interface';
import { Mascotas } from 'src/app/interfaces/mascotas.interface';
import { Tramite } from 'src/app/interfaces/tramites.interface';
import { AdopcionesService } from 'src/app/services/adopciones.service';
import { MascotasService } from 'src/app/services/mascotas.service';
import { TramitesService } from 'src/app/services/tramites.service';

@Component({
  selector: 'app-adopciones',
  templateUrl: './adopciones.component.html',
  styleUrl: './adopciones.component.scss'
})
export class AdopcionesFormComponent {
private subscriptions: Subscription = new Subscription(); 
  constructor(
    public dialogRef: MatDialogRef<AdopcionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idmascota: string }, private tramitesService: TramitesService, private mascotaService: MascotasService, private adopcionesService: AdopcionesService
  ) {}
  denuncia: Tramite | undefined;
  mascota: Mascotas | undefined;
 DenunciaForm = new FormGroup({
  nombre: new FormControl<string | null>('', Validators.required),
  apellido: new FormControl<string | null>('', Validators.required),
  email: new FormControl<string | null>('', [Validators.required, Validators.email]),
  contacto: new FormControl<string | null>('', Validators.required),
  fecha: new FormControl<string | null>('2025-04-07'),
  direccion: new FormControl<string | null>('', Validators.required),
  datos: new FormControl<string | null>('ninguna',)
  });

// Lista de archivos cargados
files: File[] = [];

// Función para manejar la carga de archivos
onFileChange(event: any): void {
  const fileList: FileList = event.target.files;
  if (fileList.length > 0) {
    for (let i = 0; i < fileList.length; i++) {
      this.files.push(fileList[i]);
    }
  }
}
ngOnInit() {
  console.log("ID recibido:", this.data.idmascota);
  if (this.data.idmascota) {
    this.getMascotaById();
    // this.getDenuncia()
  }
}
// getDenuncia() {
//   this.subscriptions.add(
//     this.tramitesService.getTramiteById(this.data.idmascota).subscribe({
//       next: (data: Tramite) => {
//         console.log('Datos recibidos:', data);
//         this.denuncia = data;
//         this.DenunciaForm.patchValue({
//           nombre: data.nombre,
//           apellido: data.apellido,
//           email: data.email,
//           contacto: data.contacto,
//           fecha: data.fecha,
//           direccion: data.direccion,
//           datos: data.datos
//         });
//       },
//       error: (error) => {
//         console.log('Error en la petición', 'error');
//       },
//       complete: () => {
//       }
//     })
//   );
// }
getMascotaById() {
  this.subscriptions.add( 
    this.mascotaService.getMascotaById(this.data.idmascota).subscribe({
      next: (data: any) => {
        console.log('Datos recibidos:', data);
        this.mascota = data;
        
      },
      error: (error) => {
        console.log('Error en la petición', 'error');
      },
      complete: () => {
      }
    })
  );
}

onSubmitDenuncia(){
  if (this.DenunciaForm.valid) {
    const denunciaData = this.DenunciaForm.value;
    if(this.denuncia)
      {
        const denuncia: Tramite = {
          ...(this.DenunciaForm.value as unknown as Tramite),
          'idtipotramite': 'b3e5c28b-8b8d-4f1f-923a-8c2e9e4d9c3f',
          'idestadotramite': '5a6d9b4e-7c2a-44f0-92f1-7e8b5d3c1a2d',
          'estaactivo': true,
          'numerotramite': 1,
        }
        console.log(denuncia)
        this.tramitesService.updateTramite(denuncia).subscribe({
          next: (data: any) => {
            console.log('Datos recibidos:', data);
            const adopcion: Adopcion = {
              idmascota: this.data.idmascota,
              idtramite: data.id,
            }
            this.adopcionesService.createAdopcion(adopcion).subscribe({
              next: (data: any) => {
                console.log('Datos recibidos:', data);
              },
              error: (error) => {
                console.log('Error en la petición', 'error');
              },
              complete: () => {
              }
            })
            
            this.dialogRef.close();
          },
          error: (error) => {
            console.log('Error en la petición', 'error');
          },
          complete: () => {
          }
        })


      }
      else{
        const denuncia: Tramite = {
          ...(this.DenunciaForm.value as unknown as Tramite),
          'idtipotramite': 'b3e5c28b-8b8d-4f1f-923a-8c2e9e4d9c3f',
          'idestadotramite': '5a6d9b4e-7c2a-44f0-92f1-7e8b5d3c1a2d',
          'estaactivo': true,
          'numerotramite': 1,
        }
        console.log(denuncia)

        this.tramitesService.createTramite(denuncia).subscribe({
          next: (data: any) => {
            console.log('Datos recibidos:', data);
            const adopcion: Adopcion = {
              idmascota: this.data.idmascota,
              idtramite: data.id,
            }
            this.adopcionesService.createAdopcion(adopcion).subscribe({
              next: (data: any) => {
                console.log('Datos recibidos:', data);
              },
              error: (error) => {
                console.log('Error en la petición', 'error');
              },
              complete: () => {
              }
            })
            this.dialogRef.close();
          },
          error: (error) => {
            console.log('Error en la petición', 'error');
          },
          complete: () => {
          }
        })
      }
  }

}


// Función para manejar el envío del formulario
onSubmit(): void {
  this.onSubmitDenuncia()
}
}