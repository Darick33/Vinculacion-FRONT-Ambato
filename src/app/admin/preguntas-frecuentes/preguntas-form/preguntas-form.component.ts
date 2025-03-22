import { Component, Inject } from '@angular/core';
import { Preguntas } from 'src/app/interfaces/preguntas.interface';
import { PreguntasFrecuentesComponent } from '../preguntas-frecuentes.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-preguntas-form',
  templateUrl: './preguntas-form.component.html',
  styleUrl: './preguntas-form.component.scss'
})
export class PreguntasFormComponent {
onSubmit() {
throw new Error('Method not implemented.');
}
 private subscriptions: Subscription = new Subscription(); 
  constructor(
    public dialogRef: MatDialogRef<PreguntasFrecuentesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }, private preguntasService: PreguntasService
  ) {}
  preguntas: Preguntas | undefined;
 preguntasForm = new FormGroup({
    pregunta: new FormControl('', [Validators.required]),
    respuesta: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    console.log("ID recibido:", this.data.id);
    if (this.data.id) {
      this.getMascota()
    }
  }
  getMascota(){
    this.preguntasService.getPreguntaById(this.data.id).subscribe({
      next: data => {
        this.preguntasForm.patchValue({ ...data });
        console.log('Configuración por ID:', data);
        this.preguntas = data;
      },
      error: error => {

      },
      complete: () => {
      }
    });
  }
  onSubmitMascota() {
     if (this.preguntasForm.valid) {
          console.log('Formulario enviado:', this.preguntasForm.value);
    
          if (this.preguntas) {
            const pregunta: Preguntas = {
              ...(this.preguntasForm.value as unknown as Preguntas),
              'id': this.preguntas.id,
              'prioridad': 0

            };
            console.log('Actualizando configuración:', pregunta);
            this.preguntasService.updatePregunta(pregunta).subscribe({
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
            const pregunta: Preguntas = {
              ...(this.preguntasForm.value as unknown as Preguntas),
            };
            this.preguntasService.createPregunta(pregunta).subscribe({
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
