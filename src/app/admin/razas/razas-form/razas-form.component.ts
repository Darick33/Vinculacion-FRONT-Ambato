import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Razas, RazasResponse } from 'src/app/interfaces/razas.interface';
import { RazasService } from 'src/app/services/razas.service';

@Component({
  selector: 'app-razas-form',
  templateUrl: './razas-form.component.html',
  styleUrls: ['./razas-form.component.scss']
})
export class RazasFormComponent {

  onSubmit() {
    throw new Error('Method not implemented.');
  }

  private subscriptions: Subscription = new Subscription();
  constructor(
    public dialogRef: MatDialogRef<RazasFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }, private RazasService: RazasService
  ) { }
  raza: Razas | undefined;
  razasForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    console.log("ID recibido:", this.data.id);
    if (this.data.id) {
      this.getRaza()
    }
  }
  getRaza() {
    this.RazasService.getRazaById(this.data.id).subscribe({
      next: data => {
        this.razasForm.patchValue({ ...data });
        console.log('Configuración por ID:', data);
        this.raza = data;
      },
      error: error => {
      },
      complete: () => {
      }
    });
  }
  onSubmitRaza() {
    if (this.razasForm.valid) {
      console.log('Formulario válido:', this.razasForm.value);

      if (this.raza) {
        const raza: Razas = {
          ...(this.razasForm.value as unknown as Razas),
          id: this.raza.id
        };
        this.RazasService.updateRaza(raza).subscribe({
          next: data => {
            console.log('Raza actualizada:', data);
            this.dialogRef.close(data);
          },
          error: error => {
            console.error('Error al actualizar la raza:', error);
          },
          complete: () => {
            console.log('Actualización de raza completada');
          }
        });
      } else {
        const raza: Razas = {
          ...(this.razasForm.value as unknown as Razas),
        };
        this.RazasService.createRaza(raza).subscribe({
          next: data => {
            console.log('Raza creada:', data);
            this.dialogRef.close(data);
          },
          error: error => {
            console.error('Error al crear la raza:', error);
          },
          complete: () => {
            console.log('Creación de raza completada');
          }
        });
      }
    } else {
      console.log('Formulario inválido:', this.razasForm.errors);
    }
  }
  cerrarModal() {
    this.dialogRef.close();
  }

}
