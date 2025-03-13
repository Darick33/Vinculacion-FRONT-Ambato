import { Injectable, signal } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  primaryColor = signal<string>('#000000');

  constructor(private configuracionService: ConfiguracionService) {
    this.loadTheme();
  }

  setThemeColors() {
    this.configuracionService.getConfigurationById().subscribe({
      next: data => {
        console.log('Configuración actualizada:', data);

        // Definir colores basados en la configuración obtenida
        const colores = {
          primary: data.colorPrincipal,
          secondary: data.colorSecundario,
          success: data.colorPrincipal,
          info: data.colorPrincipal,
          warning: data.colorSecundario,
          danger: data.colorPrincipal,
          light: "#f7f8f7",
          dark: "#000000de",
          muted: "#949db2"
        };

        localStorage.setItem('themeColors', JSON.stringify(colores));

        this.applyTheme(colores);
      },
      error: error => {
        console.error("Error obteniendo configuración de colores:", error);
      }
    });
  }

  private applyTheme(colors: { primary: string; secondary: string; success: string; info: string; warning: string; danger: string; light: string; dark: string; muted: string }) {
    document.documentElement.style.setProperty('--primary', colors.primary);
    document.documentElement.style.setProperty('--secondary', colors.secondary);
    document.documentElement.style.setProperty('--success', colors.success);
    document.documentElement.style.setProperty('--info', colors.info);
    document.documentElement.style.setProperty('--warning', colors.warning);
    document.documentElement.style.setProperty('--danger', colors.danger);
    document.documentElement.style.setProperty('--light', colors.light);
    document.documentElement.style.setProperty('--dark', colors.dark);
    document.documentElement.style.setProperty('--muted', colors.muted);

    this.primaryColor.set(colors.primary);
  }

  loadTheme() {
    const savedColors = localStorage.getItem('themeColors');
    if (savedColors) {
      this.applyTheme(JSON.parse(savedColors)); // Aplicar los colores guardados
    }
  }
}
