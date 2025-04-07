import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Adopcion, AdopcionesResponse } from '../interfaces/adopciones.interface';
import { environment } from 'src/environments/environment.development';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdopcionesService {

  constructor(private alertService: AlertService, private http: HttpClient) { }
  getAdopciones(page: number, pageSize: number, filter: string = '') {
    let params = new HttpParams()
              .set('pageNumber', page.toString())
              .set('pageSize', pageSize.toString());
        
            if (filter) {
              params = params.set('search', filter);
            }
     return this.http.get<AdopcionesResponse>(`${environment.apiUrlBase}/Adopciones/GetAllAdopciones`, { params });
  }
  createAdopcion(adopcion: Adopcion) {
    return this.http.post<any>(`${environment.apiUrlBase}/Adopciones/CreateAdopcion`, adopcion).pipe(
      tap(() => this.alertService.showToast('Adopción ingresada con éxito', 'success')),
      catchError(error => {
        this.alertService.showToast('Error al realizar la adopción', 'error');
        throw error;
      })
    );
  }

  updateAdopcion(adopcion: Adopcion) {
    return this.http.put<any>(`${environment.apiUrlBase}/Adopciones/UpdateAdopcion`, adopcion).pipe(
      tap(() => this.alertService.showToast('Adopción actualizada con éxito', 'success')),
      catchError(error => {
        this.alertService.showToast('Error al actualizar la adopción', 'error');
        throw error;
      })
    );
  }

  deleteAdopcion(id: string) {
    return this.http.delete<any>(`${environment.apiUrlBase}/Adopciones/DeleteAdopcion/${id}`).pipe(
      tap(() => this.alertService.showToast('Adopción eliminada con éxito', 'success')),
      catchError(error => {
        this.alertService.showToast('Error al eliminar la adopción', 'error');
        throw error;
      })
    );
  }
      

}
