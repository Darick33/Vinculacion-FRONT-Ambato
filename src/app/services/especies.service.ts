import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { Especies, EspeciesResponse } from 'src/app/interfaces/especies.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EspeciesService {

  constructor(
    private alertService: AlertService,
    private http: HttpClient
  ) { }

  getEspecies(page: number, pageSize: number, filter: string = ''): Observable<EspeciesResponse> {
    let params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', pageSize.toString());

    if (filter) {
      params = params.set('search', filter);
    }

    return this.http.get<EspeciesResponse>(`${environment.apiUrlBase}/Especie/GetAllEspecies`, { params });
  }

  createEspecie(especie: Especies): Observable<Especies> {
    return this.http.post<Especies>(`${environment.apiUrlBase}/Especie/CreateEspecie`, especie).pipe(
      tap(() => this.alertService.showToast('Especie ingresada con éxito', 'success')),
      catchError(error => {
        this.alertService.showToast('Error al realizar el pago', 'error');
        throw error;
      })
    );
  }

  updateEspecie(especie: Especies): Observable<Especies> {
    return this.http.put<Especies>(`${environment.apiUrlBase}/Especie/UpdateEspecie`, especie).pipe(
      tap(() => this.alertService.showToast('Especie actualizada con éxito', 'success')),
      catchError(error => {
        this.alertService.showToast('Error al actualizar la especie', 'error');
        throw error;
      })
    );
  }

  deleteEspecie(id: string): Observable<EspeciesResponse> {
    return this.http.delete<EspeciesResponse>(`${environment.apiUrlBase}/Especie/DeleteEspecie/${id}`).pipe(
      tap(() => this.alertService.showToast('Especie eliminada con éxito', 'success')),
      catchError(error => {
        this.alertService.showToast('Error al eliminar la especie', 'error');
        throw error;
      })
    );
  }

  getEspecieById(id: string): Observable<Especies> {
    return this.http.get<Especies>(`${environment.apiUrlBase}/Especie/GetEspecieById/${id}`);
  }
}
