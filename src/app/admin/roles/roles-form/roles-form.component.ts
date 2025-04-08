import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Rol } from 'src/app/interfaces/roles.interface';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrl: './roles-form.component.scss'
})
export class RolesFormComponent {

  onSubmit() {
    throw new Error('Method not implemented.');
  }

  private subscriptions: Subscription = new Subscription();
  constructor(
    public dialogRef: MatDialogRef<RolesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }, private rolesService: RolesService
  ) { }
  rol: Rol | undefined;
  rolForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    console.log("ID recibido:", this.data.id);
    if (this.data.id) {
      this.getRol()
    }
  }
  getRol() {
    this.rolesService.getRolById(this.data.id).subscribe({
      next: data => {
        this.rolForm.patchValue({ ...data });
        console.log('Configuración por ID:', data);
        this.rol = data;
      },
      error: error => {
      },
      complete: () => {
      }
    });
  }
  onSubmitRol() {
    if (this.rolForm.valid) {
      console.log('Formulario válido:', this.rolForm.value);

      if (this.rol) {
        const rol: Rol = {
          ...(this.rolForm.value as unknown as Rol),
          id: this.rol.id
        };
        this.rolesService.updateRol(rol).subscribe({
          next: data => {
            console.log('rol actualizada:', data);
            this.dialogRef.close(data);
          },
          error: error => {
            console.error('Error al actualizar la rol:', error);
          },
          complete: () => {
            console.log('Actualización de rol completada');
          }
        });
      } else {
        const rol: Rol = {
          ...(this.rolForm.value as unknown as Rol),
        };
        this.rolesService.createRol(rol).subscribe({
          next: data => {
            console.log('rol creada:', data);
            this.dialogRef.close(data);
          },
          error: error => {
            console.error('Error al crear la rol:', error);
          },
          complete: () => {
            console.log('Creación de rol completada');
          }
        });
      }
    } else {
      console.log('Formulario inválido:', this.rolForm.errors);
    }
  }
  cerrarModal() {
    this.dialogRef.close();
  }

}
