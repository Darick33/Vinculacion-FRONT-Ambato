import { Component } from '@angular/core';

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styleUrl: './denuncias.component.scss'
})
export class DenunciasFormComponent {
// Definir el objeto para almacenar los datos del formulario
formData = {
  firstName: '',
  lastName: '',
  email: '',
  contact: '',
  date: '',
  address: '',
  complaint: ''
};

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

// Función para manejar el envío del formulario
onSubmit(): void {
  console.log('Formulario enviado', this.formData);
  console.log('Archivos cargados:', this.files);
}
}
