import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Configuracion } from 'src/app/interfaces/configuracion.interface';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-configuracion-inicial',
  templateUrl: './configuracion-inicial.component.html',
  styleUrls: ['./configuracion-inicial.component.scss']
})
export class ConfiguracionInicialComponent {
 

  constructor(private configService: ConfiguracionService) {
  }
  configForm= new  FormGroup({
    nombre: new FormControl ('',[ Validators.required]),
    urlLogo: new FormControl ('',[ Validators.required]),
    ubicacion: new FormControl ('',[ Validators.required]),
    quienesSomos: new FormControl ('',[ Validators.required]),
    mision: new FormControl ('',[ Validators.required]),
    vision: new FormControl ('',[ Validators.required]),
    colorPrincipal: new FormControl ('#ffffff',[ Validators.required]),
    colorPagina: new FormControl ('#ffffff',[ Validators.required]),
    colorSecundario: new FormControl ('#000000',[ Validators.required]),
  });
  ngOnInit(): void {
    this.configService.getConfigurations(1, 10).subscribe(data => {
      console.log(data);
    });
  }


  onSubmit() {
    if (this.configForm.valid) {
      console.log(this.configForm.value);

      const configuracion: Configuracion = {
        ...(this.configForm.value as Configuracion),
        // ...(this.configForm.value as Omit<Configuracion, 'id'>),
      };
      this.configService.createConfiguration(configuracion).subscribe(data => {
        console.log(data);
      });
    }

  }
}