import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Mascotas } from 'src/app/interfaces/mascotas.interface';
import { MascotasService } from 'src/app/services/mascotas.service';
import { AdopcionesFormComponent } from '../adopciones/adopciones.component';
import { DenunciasFormComponent } from '../denuncias/denuncias.component';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
cantidad: number = 3;
info: any;
@ViewChild(ChatComponent) chatComponent!: ChatComponent;

abrirChatDesdePadre() {
  this.chatComponent.toggleChat();
}
  mascotas: Mascotas[] = [];
  constructor(private router: Router,
    public dialog: MatDialog, private mascotasService: MascotasService,
    private configuracionService: ConfiguracionService,

  ) { }
  ngOnInit(): void {
    this.mascotasService.getMascotas(1, 3).subscribe((response) => {
      this.mascotas = response.items;
      console.log(this.mascotas);
      this.cantidad = this.mascotas.length
    });
    this.getInfo();
  }
  getInfo() {
    this.configuracionService.getConfigurationById().subscribe((response) => {
      console.log(response);
      this.info = response;
    });
  }

  goToHome() {
    this.router.navigate(['/public/post']);
  }
  goToLogin() {
    this.router.navigate(['/public/login']);
  }
  OpenDenuncias() {
    const dialogRef = this.dialog.open(DenunciasFormComponent, {
      data: { id: '' } // Pasamos el ID

    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  OpenAdopciones(idmascota: string, ) {
    const dialogRef = this.dialog.open(AdopcionesFormComponent, {
      data: { idmascota: idmascota, idtramite: '' } // Pasamos el ID
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }
}

