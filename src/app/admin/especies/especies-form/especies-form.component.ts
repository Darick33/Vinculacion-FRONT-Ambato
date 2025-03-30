import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Especies, EspeciesResponse } from 'src/app/interfaces/especies.interface';
import { EspeciesService } from 'src/app/services/especies.service';

@Component({
  selector: 'app-especies-form',
  templateUrl: './especies-form.component.html',
  styleUrls: ['./especies-form.component.scss']
})
export class EspeciesFormComponent {

  onSubmit() {
    throw new Error('Method not implemented.');
  }

  private subscriptions: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<EspeciesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }, private EspecieService: EspeciesService
  ) { }

  especie: Especies | undefined;
  especiesForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    console.log("ID recibido:", this.data.id);
    if (this.data.id) {
      this.getEspecie()
    }
  }
  getEspecie() {
    this.EspecieService.getEspecieById(this.data.id).subscribe({
      next: data => {
        this.especiesForm.patchValue({ ...data });
        console.log('Configuración por ID:', data);
        this.especie = data;
      },
      error: error => {

      },
      complete: () => {
      }
    });
  }

  onSubmitEspecie() {
    if (this.especiesForm.valid) {
      console.log('Formulario válido:', this.especiesForm.value);

      if (this.especie) {
        const especie: Especies = {
          ...(this.especiesForm.value as unknown as Especies),
          id: this.especie.id
        };
        console.log('Especie a actualizar:', especie);
        this.EspecieService.updateEspecie(especie).subscribe({
          next: data => {
            console.log('Especie actualizada:', data);
            this.dialogRef.close();
          },
          error: error => {
          },
          complete: () => {
            this.cerrarModal();
          }
        });
      } else {
        const especie: Especies = {
          ...(this.especiesForm.value as unknown as Especies),
        };
        console.log('Especie a crear:', especie);
        this.EspecieService.createEspecie(especie).subscribe({
          next: data => {
            console.log('Especie creada:', data);
            this.dialogRef.close();
          },
          error: error => {
            console.log('Error al crear la especie:', error);
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