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
      link: "/admin/inicio",
      icon: "home",
      menu: "Dashboard",
    },
    {
      link: "/admin/usuarios",
      icon: "users",
      menu: "Usuarios",
    },
    {
      link: "/admin/roles",
      icon: "shield",
      menu: "Roles",
    },
    {
      link: "/admin/config",
      icon: "alert-triangle",
      menu: "Configuracion Inicial",
    },
    // {
    //   link: "/admin/menu",
    //   icon: "menu",
    //   menu: "Menus",
    // },
    {
      link: "/admin/mascotas",
      icon: "heart", 
      menu: "Mascotas",
    },
    {
      link: "/admin/especies",
      icon: "activity", 
      menu: "Especies",
    },
    {
      link: "/admin/razas",
      icon: "pen-tool", 
      menu: "Razas",
    },
    {
      link: "/admin/generos",
      icon: "feather", 
      menu: "Generos",
    },
    {
      link: "/admin/adopciones",
      icon: "gitlab", 
      menu: "Adopciones",
    },
    {
      link: "/admin/eventos",
      icon: "calendar",
      menu: "Eventos",
    },
    {
      link: "/admin/campanias",
      icon: "book",
      menu: "Campañas",
    },
    {
      link: "/admin/denuncias",
      icon: "alert-circle", 
      menu: "Denuncias",
    },
    {
      link: "/admin/preguntas-frecuentes",
      icon: "help-circle",
      menu: "Preguntas Frecuentes",
    },
    // {
    //   link: "/admin/chatbot",
    //   icon: "message-circle",
    //   menu: "Configuracion de ChatBot",
    // },
  ]
}
