import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showToast(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') {
    Swal.fire({
      position: 'bottom-end',  
      icon: type,            
      title: message,        
      showConfirmButton: false,   
      timer: 1500,               
      toast: true,               
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  }
}
