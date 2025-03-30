import { generos } from './../../../interfaces/mascotas.interface';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Generos, GenerosResponse } from 'src/app/interfaces/generos.interface';
import { GenerosService } from 'src/app/services/generos.service';

@Component({
  selector: 'app-generos-form',
  templateUrl: './generos-form.component.html',
  styleUrls: ['./generos-form.component.scss']
})
export class GenerosFormComponent {

  onSubmit() {
    throw new Error('Method not implemented.');
  }

  private subscriptions: Subscription = new Subscription();
  constructor(
    public dialogRef: MatDialogRef<GenerosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }, private GenerosService: GenerosService
  ) { }

  generos: Generos | undefined;
  generosForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    console.log("ID recibido:", this.data.id);
    if (this.data.id) {
      this.getGenero()
    }
  }
  getGenero() {
    this.GenerosService.getGeneroById(this.data.id).subscribe({
      next: data => {
        this.generosForm.patchValue({ ...data });
        console.log('Configuración por ID:', data);
        this.generos = data;
      },
      error: error => {

      },
      complete: () => {
      }
    });
  }
  onSubmitGenero() {
    if (this.generosForm.valid) {
      console.log('Formulario válido:', this.generosForm.value);

      if (this.generos) {
        const genero: Generos = {
          ...(this.generosForm.value as unknown as Generos),
          id: this.generos.id
        };
        console.log('Genero a actualizar:', genero);
        this.GenerosService.updateGenero(genero).subscribe({
          next: data => {
            console.log('Genero actualizado:', data);
            this.dialogRef.close();
          },
          error: error => {
          },
          complete: () => {
            this.cerrarModal();
          }
        });
      } else {
        const genero: Generos = {
          ...(this.generosForm.value as unknown as Generos),
        };
        console.log('Genero a crear:', genero);
        this.GenerosService.createGenero(genero).subscribe({
          next: data => {
            console.log('Genero creada:', data);
            this.dialogRef.close();
          },
          error: error => {
            console.log('Error al crear el genero:', error);
          },
          complete: () => {
            this.cerrarModal();
          }
        });
      }
    }
  }
  cerrarModal() {
    this.dialogRef.close();
  }

}
