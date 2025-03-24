import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PreguntasResponce } from '../interfaces/preguntas.interface';
import { environment } from 'src/environments/environment.development';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor(private alertSerice: AlertService, private http: HttpClient) { }
  getPreguntas(page: number, pageSize: number, filter: string = ''): Observable<PreguntasResponce>{
              let params = new HttpParams()
                .set('pageNumber', page.toString())
                .set('pageSize', pageSize.toString());
          
              if (filter) {
                params = params.set('search', filter);
              }
          
              return this.http.get<PreguntasResponce>(`${environment.apiUrlBase}/PreguntasFrecuente/GetAllPreguntasFrecuente`, { params });
    }
    createPregunta(pregunta: any): Observable<any> {
      return this.http.post<any>(`${environment.apiUrlBase}/PreguntasFrecuente/CreatePreguntaFrecuente`, pregunta).pipe(
        tap(() => this.alertSerice.showToast('Pregunta ingresada con éxito', 'success')),
        catchError(error => {
          this.alertSerice.showToast('Error al realizar el pago', 'error');
          throw error;
        })
      );
    }
    updatePregunta(pregunta: any): Observable<any> {
      return this.http.put<any>(`${environment.apiUrlBase}/PreguntasFrecuente/UpdatePreguntaFrecuente`, pregunta).pipe(
        tap(() => this.alertSerice.showToast('Pregunta actualizada con éxito', 'success')),
        catchError(error => {
          this.alertSerice.showToast('Error al realizar el pago', 'error');
          throw error;
        })
      );
    }

    deletePregunta(id: string): Observable<any> {
      return this.http.delete<any>(`${environment.apiUrlBase}/PreguntasFrecuente/DeletePreguntaFrecuente/${id}`).pipe(
        tap(() => this.alertSerice.showToast('Pregunta eliminada con éxito', 'success')),
        catchError(error => {
          this.alertSerice.showToast('Error al realizar el pago', 'error');
          throw error;
        })
      );
    }
    getPreguntaById(id: string): Observable<any> {
      return this.http.get<any>(`${environment.apiUrlBase}/PreguntasFrecuente/GetPreguntaFrecuenteById/${id}`);
    }
}
