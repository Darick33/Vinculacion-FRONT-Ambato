import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {

  search: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/inicio",
      icon: "home",
      menu: "Dashboard",
    },
    {
      link: "/usuarios",
      icon: "users",
      menu: "Usuarios",
    },
    {
      link: "/roles",
      icon: "shield",
      menu: "Roles",
    },
    {
      link: "/alerts",
      icon: "alert-triangle",
      menu: "Configuracion Inicial",
    },
    {
      link: "/menu",
      icon: "menu",
      menu: "Menus",
    },
    {
      link: "/mascotas",
      icon: "heart", // Cambié a 'heart' para representar mascotas.
      menu: "Mascotas",
    },
    {
      link: "/eventos",
      icon: "calendar",
      menu: "Eventos",
    },
    {
      link: "/campanias",
      icon: "book",
      menu: "Campañas",
    },
    {
      link: "/denuncias",
      icon: "alert-circle", // Cambié a 'alert-circle' para representar denuncias.
      menu: "Denuncias",
    },
    {
      link: "/preguntasFrecuentes",
      icon: "help-circle",
      menu: "Preguntas Frecuentes",
    },
    {
      link: "/chatbot",
      icon: "message-circle",
      menu: "Configuracion de ChatBot",
    },
  ]
}
