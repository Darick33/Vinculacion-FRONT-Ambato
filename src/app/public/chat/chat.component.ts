import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  isOpen = false;
  selectedQuestion: string | null = null;
  selectedAnswer: string | null = null;

  faqList = [
    { question: '¿Cómo puedo realizar un pedido?', answer: 'Para realizar un pedido, selecciona los productos y ve al carrito de compras.' },
    { question: '¿Cuáles son los métodos de pago?', answer: 'Aceptamos pagos con tarjeta de crédito, débito y PayPal.' },
    { question: '¿Hacen envíos a todo el país?', answer: 'Sí, realizamos envíos a nivel nacional con tiempos de entrega de 3 a 5 días hábiles.' },
    { question: '¿Cómo puedo rastrear mi pedido?', answer: 'Puedes rastrear tu pedido con el código de seguimiento enviado a tu correo.' },
    { question: '¿Tienen garantía los productos?', answer: 'Sí, todos nuestros productos tienen garantía de 6 meses por defectos de fábrica.' },
    { question: '¿Puedo cambiar o devolver un producto?', answer: 'Sí, puedes solicitar un cambio o devolución dentro de los primeros 7 días.' },
    { question: '¿Cuál es el horario de atención?', answer: 'Nuestro horario de atención es de lunes a viernes de 8:00 AM a 6:00 PM.' },
    { question: '¿Cómo contacto al servicio al cliente?', answer: 'Puedes contactarnos por WhatsApp, correo electrónico o llamada telefónica.' },
    { question: '¿Ofrecen descuentos por compras grandes?', answer: 'Sí, ofrecemos descuentos especiales para compras al por mayor.' },
    { question: '¿Dónde están ubicados?', answer: 'Nuestra tienda principal está ubicada en la Av. Central #123, Ciudad X.' }
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;
    this.selectedQuestion = null;
    this.selectedAnswer = null;
  }

  selectFaq(faq: { question: string; answer: string }) {
    this.selectedQuestion = faq.question;
    this.selectedAnswer = faq.answer;
  }

}
