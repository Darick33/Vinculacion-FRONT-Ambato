import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuracion, ConfiguracionApiResponse } from '../interfaces/configuracion.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  constructor(private http: HttpClient) { }



  getConfigurations(page: number, pageSize: number,): Observable <ConfiguracionApiResponse> {
    const offset = (page - 1) * pageSize;
    let params = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', pageSize.toString());

    return this.http.get<ConfiguracionApiResponse>(`${environment.apiUrlBase}/DatosInstitucion/GetAllDatosInstitucion`, { params
    });
  }
  getConfigurationById(id: number): Observable<Configuracion> {
    return this.http.get<Configuracion>(`${environment.apiUrlBase}/DatosInstitucion/GetDatosInstitucionById/${id}`);
  }
  createConfiguration(configuracion: Configuracion): Observable<Configuracion> {
    return this.http.post<Configuracion>(`${environment.apiUrlBase}/DatosInstitucion/CreateDatosInstitucion`, configuracion);
  }
  updateConfiguration(configuracion: ConfiguracionApiResponse): Observable<ConfiguracionApiResponse> {
    return this.http.put<ConfiguracionApiResponse>(`${environment.apiUrlBase}/DatosInstitucion/UpdateDatosInstitucion`, configuracion);
  }
  deleteConfiguration(id: number): Observable<ConfiguracionApiResponse> {
    return this.http.delete<ConfiguracionApiResponse>(`${environment.apiUrlBase}/DatosInstitucion/DeleteDatosInstitucion/${id}`);
  }
  


}
