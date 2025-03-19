import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { especiesResponse, generosResponse, Mascotas, MascotasResponse, razaResponse } from '../interfaces/mascotas.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  constructor(private alertService: AlertService,private http: HttpClient) { }
  getMascotas(page: number, pageSize: number, filter: string = ''): Observable<MascotasResponse>{
    const offset = (page - 1) * pageSize;
        let params = new HttpParams()
          .set('offset', offset.toString())
          .set('limit', pageSize.toString());
    
        if (filter) {
          params = params.set('search', filter);
        }
    
        return this.http.get<MascotasResponse>(`${environment.apiUrlBase}/Mascota/GetAllMascotas`, { params });
  }
  createMascota(mascota: Mascotas): Observable<Mascotas> {
    return this.http.post<Mascotas>(`${environment.apiUrlBase}/Mascota/CreateMascota`, mascota).pipe(
      tap(() => this.alertService.showToast('Mascota ingresada con éxito', 'success')),
      catchError(error => {
        this.alertService.showToast('Error al realizar el pago', 'error');
        throw error;
      })
    );
  }

  updateMascota(mascota: Mascotas): Observable<Mascotas> {
    return this.http.put<Mascotas>(`${environment.apiUrlBase}/Mascota/UpdateMascota`, mascota).pipe(
      tap(() => this.alertService.showToast('Mascota actualizada con éxito', 'success')),
      catchError(error => {
        this.alertService.showToast('Error al actualizar la mascota', 'error');
        throw error;
      })
    );
  }
  deleteMascota(id: number): Observable<MascotasResponse> {
    return this.http.delete<MascotasResponse>(`${environment.apiUrlBase}/Mascota/DeleteMascota/${id}`).pipe(
      tap(() => this.alertService.showToast('Mascota eliminada con éxito', 'success')),
      catchError(error => {
        this.alertService.showToast('Error al eliminar la mascota', 'error');
        throw error;
      })
    );
  }
  getMascotaById(id: string): Observable<Mascotas> {
    return this.http.get<Mascotas>(`${environment.apiUrlBase}/Mascota/GetMascotaById/${id}`);
  }



  getRazas(): Observable<razaResponse>{
        return this.http.get<razaResponse>(`${environment.apiUrlBase}/Raza/GetAllRazas`, );
  }
  getGeneros(): Observable<generosResponse>{
        return this.http.get<generosResponse>(`${environment.apiUrlBase}/Genero/GetAllGeneros`, );
  }
  getEspecies(): Observable<especiesResponse>{
        return this.http.get<especiesResponse>(`${environment.apiUrlBase}/Especie/GetAllEspecies`, );
  }





  

}
