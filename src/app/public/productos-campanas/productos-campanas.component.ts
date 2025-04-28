import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos-campanas',
  templateUrl: './productos-campanas.component.html',
  styleUrls: ['./productos-campanas.component.scss']
})
export class ProductosCampanasComponent implements OnInit {
  post: any = {};

  ngOnInit() {
    this.post = {
      title: 'FRENA LA VIOLENCIA 🐾',
      image: '../../../assets/images/campana1.webp',
      gallery: [
        { url: '../../../assets/images/fauna1.jpg' },
        { url: '../../../assets/images/fauna2.jpg' },
        { url: '../../../assets/images/fauna3.jpg' },
      ],
      sections: [
        {
          title: '¿Qué es la Fauna Urbana?',
          content: `La fauna urbana es el conjunto de especies animales no humanas que se han adaptado y sobreviven en las ciudades. Incluye perros, gatos, aves, roedores, insectos, reptiles y anfibios.`
        },
        {
          title: 'Categorías de Especies',
          content: `Domésticos, Introducidos y Silvestres.`
        },
        {
          title: 'Proyecto de Ley',
          content: `Ley Orgánica para la Promoción, Protección y Defensa de los Derechos de los Animales no Humanos.`
        },
        {
          title: 'Puntos Controversiales',
          content: `• Jornada laboral para animales de trabajo.
• Prohibiciones de pesticidas, exhibiciones de pollos asados y faenamiento sin aturdimiento.
• Restricciones en pesca y faenamiento.`
        },
        {
          title: 'Gestión de los GAD\'s',
          content: `Los municipios gestionan planificación, regulación, control y protección de fauna urbana.`
        },
        {
          title: 'Protecciones legales',
          content: `El Código Orgánico Integral Penal (COIP) tipifica delitos como lesiones, abuso sexual, muerte y maltrato de animales.`
        },
        {
          title: 'Responsabilidad de los tenedores',
          content: `Respetar el comportamiento natural del animal: alimentación, refugio, trato digno y atención veterinaria.`
        },
        {
          title: 'Sanciones',
          content: `• Multas económicas
• Retiro y adopción forzada
• Prohibición de tenencia
• Servicio comunitario
• Pago de gastos veterinarios`
        }
      ],
      media: [
        {
          type: 'video',
          url: '../../../assets/images/fauna.mp4'
        }
      ],
      attachments: [
        {
          name: 'Fauna Urbana',
          url: '../../../assets/TRIPTICO FAUNA URBANA.pdf'
        },
        // {
        //   name: 'Lista de Albergues Beneficiados.docx',
        //   url: 'https://example.com/albergues-beneficiados.docx'
        // }
      ]
    };
  }
}
