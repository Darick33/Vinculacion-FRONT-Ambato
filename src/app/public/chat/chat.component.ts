import { Component } from '@angular/core';
import { Preguntas } from 'src/app/interfaces/preguntas.interface';
import { PreguntasService } from 'src/app/services/preguntas.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  constructor(private preguntasService: PreguntasService) {}
  preguntas : Preguntas[] | undefined;
  isOpen = false;
  selectedQuestion: string | null = null;
  selectedAnswer: string | null = null;


  ngOnInit(): void {
    this.getPreguntas();
  }
  getPreguntas(){
    this.preguntasService.getPreguntas(1, 10).subscribe({
      next: (data: any) => {
        console.log('Datos recibidos:', data);
        this.preguntas = data.items;
      },
      error: (error) => {
        console.log('Error en la petición', 'error');
      },
      complete: () => {
      }
    })
  }
  toggleChat() {
    this.isOpen = !this.isOpen;
    this.selectedQuestion = null;
    this.selectedAnswer = null;
  }

  selectFaq( pregunta: string, respuesta: string ) {
    this.selectedQuestion = pregunta;
    this.selectedAnswer = respuesta;
  }

}
