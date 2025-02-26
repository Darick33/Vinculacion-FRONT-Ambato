import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos-campanas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos-campanas.component.html',
  styleUrls: ['./productos-campanas.component.scss']
})
export class ProductosCampanasComponent implements OnInit {
  post: any = {};

  ngOnInit() {
    this.post = {
      title: 'Título del Post',
      image: '../../../assets/images/campana1.webp',
      content: `
        Campaña Solidaria: Productos y Servicios para Apoyar a una Fundación de Perros.
        En un mundo donde miles de perros sufren abandono y maltrato, las fundaciones dedicadas al rescate y cuidado de estos animales desempeñan un papel fundamental. Sin embargo, para continuar con su noble labor, estas organizaciones requieren apoyo constante.
        
        Productos Solidarios
        
          Ropa y Accesorios Temáticos: Camisetas, sudaderas, gorras y bolsos con diseños exclusivos para amantes de los perros.
          Pulseras y Llaveros Personalizados: Accesorios con mensajes inspiradores y figuras de perros.
          Alimentos y Suministros para Mascotas: Venta de alimentos de alta calidad y juguetes, con un porcentaje destinado a refugios.
          Calendarios y Agendas Solidarias: Ilustrados con imágenes de perros rescatados y sus historias de superación.
        

        Servicios en Beneficio de la Fundación
        
          Jornadas de Baño y Peluquería Canina: Parte del pago se dona para financiar tratamientos médicos y alimentación.
          Sesiones Fotográficas con Tu Mascota: Captura recuerdos inolvidables mientras apoyas a los perros en necesidad.
          Talleres y Charlas sobre Tenencia Responsable: Educación sobre adopción, cuidados y esterilización.
          Eventos y Ferias de Adopción: Promoción de la adopción responsable en eventos comunitarios.
        
      `,
      media: [
        { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { type: 'audio', url: 'https://www.w3schools.com/html/horse.mp3' }
      ],
      attachments: [
        { name: 'Documento PDF', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
        { name: 'Archivo ZIP', url: 'https://file-examples.com/wp-content/uploads/2017/02/zip_2MB.zip' }
      ]
    };
  }
}
