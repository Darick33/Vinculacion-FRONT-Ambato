import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Generos, GenerosResponse } from '../interfaces/generos.interface';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  constructor(
    private alertService: AlertService,
    private http: HttpClient
  ) { }

  getGeneros(page: number, pageSize: number, filter: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', pageSize.toString());

    if (filter) {
      params = params.set('search', filter);
    }

    return this.http.get<GenerosResponse>(`${environment.apiUrlBase}/Genero/GetAllGeneros`, { params });
  }

  createGenero(genero: Generos): Observable<any> {
    return this.http.post<Generos>(`${environment.apiUrlBase}/Genero/CreateGenero`, genero).pipe(
      tap(() => this.alertService.showToast('Genero ingresado con éxito', 'success')),
      catchError(error => {
        this.alertService.showToast('Error al realizar el pago', 'error');
        throw error;
      })
    );
  }

  updateGenero(genero: Generos): Observable<any> {
    return this.http.put<Generos>(`${environment.apiUrlBase}/Genero/UpdateGenero`, genero).pipe(
      tap(() => this.alertService.showToast('Genero actualizado con éxito', 'success')),
      catchError(error => {
        this.alertService.showToast('Error al actualizar el genero', 'error');
        throw error;
      })
    );
  }

  deleteGenero(id: string): Observable<GenerosResponse> {
    return this.http.delete<GenerosResponse>(`${environment.apiUrlBase}/Genero/DeleteGenero/${id}`).pipe(
      tap(() => this.alertService.showToast('Genero eliminado con éxito', 'success')),
      catchError(error => {
        this.alertService.showToast('Error al eliminar el genero', 'error');
        throw error;
      })
    );
  }

  getGeneroById(id: string): Observable<Generos> {
    return this.http.get<Generos>(`${environment.apiUrlBase}/Genero/GetGeneroById/${id}`);
  }
}
