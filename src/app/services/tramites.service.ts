import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { TramiteResponse } from '../interfaces/tramites.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TramitesService {

  constructor(private alertService: AlertService, private http: HttpClient) { }
  getTramites(page: number, pageSize: number, filter: string = ''): Observable<TramiteResponse>{
    const offset = (page - 1) * pageSize;
            let params = new HttpParams()
              .set('offset', offset.toString())
              .set('limit', pageSize.toString());
        
            if (filter) {
              params = params.set('search', filter);
            }
        
            return this.http.get<TramiteResponse>(`${environment.apiUrlBase}/Tramite/GetAllTramites`, { params });
  }
  createTramite(tramite: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrlBase}/Tramite/CreateTramite`, tramite).pipe(
      tap(() => this.alertService.showToast('Tramite ingresado con éxito', 'success')),
      catchError(error => {
        this.alertService.showToast('Error al realizar el pago', 'error');
        throw error;
      })
    );
  }
  updateTramite(tramite: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrlBase}/Tramite/UpdateTramite`, tramite).pipe(
      tap(() => this.alertService.showToast('Tramite actualizado con éxito', 'success')),
      catchError(error => {
        this.alertService.showToast('Error al actualizar el tramite', 'error');
        throw error;
      })
    );
  }
  deleteTramite(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrlBase}/Tramite/DeleteTramite/${id}`).pipe(
      tap(() => this.alertService.showToast('Tramite eliminado con éxito', 'success')),
      catchError(error => {
        this.alertService.showToast('Error al eliminar el tramite', 'error');
        throw error;
      })
    );
  }
  getTramiteById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrlBase}/Tramite/GetTramiteById/${id}`);
  }
}
