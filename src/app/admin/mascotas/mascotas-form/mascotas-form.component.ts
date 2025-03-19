import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { especies, generos, Mascotas, raza } from 'src/app/interfaces/mascotas.interface';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-mascotas-form',
  templateUrl: './mascotas-form.component.html',
  styleUrl: './mascotas-form.component.scss'
})
export class MascotasFormComponent {
  razaList: raza[] = []; 
  generoList: generos[] = [];
  especieList: especies[] = [];
onSubmit() {
throw new Error('Method not implemented.');
}
 private subscriptions: Subscription = new Subscription(); 
  constructor(
    public dialogRef: MatDialogRef<MascotasFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }, private mascotasService: MascotasService
  ) {}
  mascota: Mascotas | undefined;
 mascotasForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    edad: new FormControl('', [Validators.required]),
    caracter: new FormControl('', [Validators.required]),
    detalles: new FormControl('', [Validators.required]),
    idgenero: new FormControl('', [Validators.required]),
    idespecie: new FormControl('', [Validators.required]),
    idraza: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    console.log("ID recibido:", this.data.id);
    this.getRazas();
    this.getEspecies();
    this.getGeneros()
    if (this.data.id) {
      this.getMascota()
    }
  }
  getMascota(){
    this.mascotasService.getMascotaById(this.data.id).subscribe({
      next: data => {
        this.mascotasForm.patchValue({ ...data, edad: data.edad.toString() });
        console.log('Configuración por ID:', data);
        this.mascota = data;
      },
      error: error => {

      },
      complete: () => {
      }
    });
  }
  getRazas(){
    
    this.subscriptions.add(
      this.mascotasService.getRazas().subscribe({
        next: data => {
          console.log('Datos recibidos razas:', data); 
          this.razaList = data.items;
          
        },
        error: error => {
          console.log('Error en la peticion' , 'error');
        },
        complete: () => {
        }
      })
    );
  }
  getGeneros(){
    this.subscriptions.add(
      this.mascotasService.getGeneros().subscribe({
        next: data => {
          console.log('Datos recibidos:', data);
          this.generoList = data.items;

        },
        error: error => {
          console.log('Error en la peticion', 'error');
        },
        complete: () => {
        }
      })
    );
  }
  getEspecies(){
    this.subscriptions.add(
      this.mascotasService.getEspecies().subscribe({
        next: data => {
          console.log('Datos recibidos:', data);
          this.especieList = data.items;

        },
        error: error => {
          console.log('Error en la peticion', 'error');
        },
        complete: () => {
        }
      })
    );
  }
  
  onSubmitMascota() {
     if (this.mascotasForm.valid) {
          console.log('Formulario enviado:', this.mascotasForm.value);
    
          if (this.mascota) {
            const mascota: Mascotas = {
              ...(this.mascotasForm.value as unknown as Mascotas),
              'id': this.mascota.id,
            };
            console.log('Actualizando configuración:', mascota);
            this.mascotasService.updateMascota(mascota).subscribe({
              next: data => {
                console.log('Configuración actualizada:', data);
              },
              error: error => {
              },
              complete: () => {
                
                this.cerrarModal() 
                    
              }
            });
          } else {
            const mascota: Mascotas = {
              ...(this.mascotasForm.value as unknown as Mascotas),
            };
            this.mascotasService.createMascota(mascota).subscribe({
              next: data => {
                console.log('Configuración creada:', data);
                
              },
              error: error => {
    
              },
              complete: () => {
                this.cerrarModal() 
              }
            });
          }

        }
  }

  cerrarModal() {
    this.dialogRef.close();
  }
}
