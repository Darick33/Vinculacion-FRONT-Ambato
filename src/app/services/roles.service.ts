import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Rol, RolResponse } from '../interfaces/roles.interface';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private alertService: AlertService,
      private http: HttpClient) { }
      getRoles(page: number, pageSize: number, filter: string = ''): Observable<RolResponse> {
        let params = new HttpParams()
          .set('pageNumber', page.toString())
          .set('pageSize', pageSize.toString());
    
        if (filter) {
          params = params.set('search', filter);
        }
    
        return this.http.get<RolResponse>(`${environment.apiUrlBase}/Rol/GetAllRol`, { params });
      }
      createRol(rol: Rol): Observable<Rol> {
        return this.http.post<Rol>(`${environment.apiUrlBase}/Rol/CreateRol`, rol).pipe(
          tap(() => this.alertService.showToast('Rol ingresado con éxito', 'success')),
          catchError(error => {
            this.alertService.showToast('Error al realizar el pago', 'error');
            throw error;
          })
        );

      }
      updateRol(rol: Rol): Observable<Rol> {
        return this.http.put<Rol>(`${environment.apiUrlBase}/Rol/UpdateRol`, rol).pipe(
          tap(() => this.alertService.showToast('Rol actualizado con éxito', 'success')),
          catchError(error => {
            this.alertService.showToast('Error al actualizar el rol', 'error');
            throw error;
          })
        );

      }
      deleteRol(id: string): Observable<RolResponse> {
        return this.http.delete<RolResponse>(`${environment.apiUrlBase}/Rol/DeleteRol/${id}`).pipe(
          tap(() => this.alertService.showToast('Rol eliminado con éxito', 'success')),
          catchError(error => {
            this.alertService.showToast('Error al eliminar el rol', 'error');
            throw error;
          })
        );
      }
      getRolById(id: string): Observable<Rol> {
        let params = new HttpParams()
          .set('id', id)
        return this.http.get<Rol>(`${environment.apiUrlBase}/Rol/GetRolById`, { params });
      }
    //  getRazas(page: number, pageSize: number, filter: string = ''): Observable<RazasResponse> {
    //     let params = new HttpParams()
    //       .set('pageNumber', page.toString())
    //       .set('pageSize', pageSize.toString());
    
    //     if (filter) {
    //       params = params.set('search', filter);
    //     }
    
    //     return this.http.get<RazasResponse>(`${environment.apiUrlBase}/Raza/GetAllRazas`, { params });
    //   }
    
    //   createRaza(raza: Razas): Observable<Razas> {
    //     return this.http.post<Razas>(`${environment.apiUrlBase}/Raza/CreateRaza`, raza).pipe(
    //       tap(() => this.alertService.showToast('Raza ingresada con éxito', 'success')),
    //       catchError(error => {
    //         this.alertService.showToast('Error al realizar el pago', 'error');
    //         throw error;
    //       })
    //     );
    
    //   }
    //   updateRaza(raza: Razas): Observable<Razas> {
    //     return this.http.put<Razas>(`${environment.apiUrlBase}/Raza/UpdateRaza`, raza).pipe(
    //       tap(() => this.alertService.showToast('Raza actualizada con éxito', 'success')),
    //       catchError(error => {
    //         this.alertService.showToast('Error al actualizar la raza', 'error');
    //         throw error;
    //       })
    //     );
    
    //   }
    //   deleteRaza(id: string): Observable<RazasResponse> {
    //     return this.http.delete<RazasResponse>(`${environment.apiUrlBase}/Raza/DeleteRaza/${id}`).pipe(
    //       tap(() => this.alertService.showToast('Raza eliminada con éxito', 'success')),
    //       catchError(error => {
    //         this.alertService.showToast('Error al eliminar la raza', 'error');
    //         throw error;
    //       })
    //     );
    //   }
    
    //   getRazaById(id: string): Observable<Razas> {
    //     return this.http.get<Razas>(`${environment.apiUrlBase}/Raza/GetRazaById/${id}`);
    //   }  
}
