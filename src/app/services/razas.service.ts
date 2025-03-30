import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Razas, RazasResponse } from '../interfaces/razas.interface';

@Injectable({
  providedIn: 'root'
})
export class RazasService {

  constructor(
    private alertService: AlertService,
    private http: HttpClient
  ) { }

  getRazas(page: number, pageSize: number, filter: string = ''): Observable<RazasResponse> {
    let params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', pageSize.toString());

    if (filter) {
      params = params.set('search', filter);
    }

    return this.http.get<RazasResponse>(`${environment.apiUrlBase}/Raza/GetAllRazas`, { params });
  }

  createRaza(raza: Razas): Observable<Razas> {
    return this.http.post<Razas>(`${environment.apiUrlBase}/Raza/CreateRaza`, raza).pipe(
      tap(() => this.alertService.showToast('Raza ingresada con éxito', 'success')),
      catchError(error => {
        this.alertService.showToast('Error al realizar el pago', 'error');
        throw error;
      })
    );

  }
  updateRaza(raza: Razas): Observable<Razas> {
    return this.http.put<Razas>(`${environment.apiUrlBase}/Raza/UpdateRaza`, raza).pipe(
      tap(() => this.alertService.showToast('Raza actualizada con éxito', 'success')),
      catchError(error => {
        this.alertService.showToast('Error al actualizar la raza', 'error');
        throw error;
      })
    );

  }
  deleteRaza(id: string): Observable<RazasResponse> {
    return this.http.delete<RazasResponse>(`${environment.apiUrlBase}/Raza/DeleteRaza/${id}`).pipe(
      tap(() => this.alertService.showToast('Raza eliminada con éxito', 'success')),
      catchError(error => {
        this.alertService.showToast('Error al eliminar la raza', 'error');
        throw error;
      })
    );
  }

  getRazaById(id: string): Observable<Razas> {
    return this.http.get<Razas>(`${environment.apiUrlBase}/Raza/GetRazaById/${id}`);
  }
}
