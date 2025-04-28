import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private aletService: AlertService) { }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
  }
login(email: string, password: string ): void {
  this.http.post(`${environment.apiUrlBase}/Auth/login`, { email, password }).subscribe(
    (response: any) => {
      if (response.token) {
        localStorage.setItem('token', response.token);
        this.aletService.showToast('Inicio de sesión exitoso', 'success');
        console.log('Login exitoso');
      } else {
        console.error('Login fallido: Token no recibido');
        this.aletService.showToast('Inicio de sesión fallido', 'error');
      }
    },
    (error) => {
      console.error('Error al iniciar sesión:', error);
    }
  );
  // Aquí deberías implementar la lógica de autenticación real
  // Por simplicidad, vamos a suponer que el login es exitoso si el email y password son correctos
}
}
