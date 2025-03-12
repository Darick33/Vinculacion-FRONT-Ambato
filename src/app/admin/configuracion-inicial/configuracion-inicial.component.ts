import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Configuracion } from 'src/app/interfaces/configuracion.interface';
import { AlertService } from 'src/app/services/alert.service';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-configuracion-inicial',
  templateUrl: './configuracion-inicial.component.html',
  styleUrls: ['./configuracion-inicial.component.scss']
})
export class ConfiguracionInicialComponent {

  constructor(private configService: ConfiguracionService, private alertService: AlertService) {}

  configuracion: Configuracion | undefined;

  configForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    urlLogo: new FormControl('', [Validators.required]),
    ubicacion: new FormControl('', [Validators.required]),
    quienesSomos: new FormControl('', [Validators.required]),
    mision: new FormControl('', [Validators.required]),
    vision: new FormControl('', [Validators.required]),
    colorPrincipal: new FormControl('#ffffff', [Validators.required]),
    colorPagina: new FormControl('#ffffff', [Validators.required]),
    colorSecundario: new FormControl('#000000', [Validators.required]),
  });

  ngOnInit(): void {
    this.configService.getConfigurations(1, 10).subscribe({
      next: data => {
        console.log('Datos recibidos:', data); 
      },
      error: error => {
        this.alertService.showToast('Error en la peticion' , 'error');
      },
      complete: () => {
      }
    });

    this.configService.getConfigurationById().subscribe({
      next: data => {
        this.configForm.patchValue(data);
        console.log('Configuración por ID:', data);
        this.configuracion = data;
      },
      error: error => {
        this.alertService.showToast('Error en la peticion' , 'error');

      },
      complete: () => {
      }
    });
  }

  onSubmit() {
    if (this.configForm.valid) {
      console.log('Formulario enviado:', this.configForm.value);

      if (this.configuracion) {
        const configuracion: Configuracion = {
          ...(this.configForm.value as Configuracion),
          'id': this.configuracion.id,
        };
        console.log('Actualizando configuración:', configuracion);
        this.configService.updateConfiguration(configuracion).subscribe({
          next: data => {
            console.log('Configuración actualizada:', data);
          },
          error: error => {
            this.alertService.showToast('Error en la peticion' , 'error');
          },
          complete: () => {
            this.alertService.showToast('Configuración insertada correctamente', 'success');
          }
        });
      } else {
        const configuracion: Configuracion = {
          ...(this.configForm.value as Configuracion),
        };
        this.configService.createConfiguration(configuracion).subscribe({
          next: data => {
            console.log('Configuración creada:', data);
          },
          error: error => {
            this.alertService.showToast('Error en la peticion' , 'error');

          },
          complete: () => {
            this.alertService.showToast('Configuración actualizada correctamente', 'success');

          }
        });
      }
    }
  }
}
