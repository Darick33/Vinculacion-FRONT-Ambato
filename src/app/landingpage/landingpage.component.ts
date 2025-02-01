import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import '@fancyapps/fancybox';  // Importamos Fancybox correctamente

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Fancybox (efecto de imágenes)
    ($ as any).fancybox({
      openEffect: "none",
      closeEffect: "none"
    });

    // Efecto de hover en elementos con la clase .zoom
    $('.zoom').hover(
      (event: any) => {
        $(event.currentTarget).addClass('transition');
      }, 
      (event: any) => {
        $(event.currentTarget).removeClass('transition');
      }
    );
  }

  // Funciones para abrir/cerrar el menú
  openNav() {
    const nav = document.getElementById("myNav");
    if (nav) {
      nav.style.width = "100%";
    }
  }

  closeNav() {
    const nav = document.getElementById("myNav");
    if (nav) {
      nav.style.width = "0%";
    }
  }
}
