import { Component, effect } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flexy-angular';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.loadTheme(); 

    setTimeout(() => {
      this.themeService.setThemeColors(); 
    }, 2000);

    effect(() => {
      document.documentElement.style.setProperty('--primary', this.themeService.primaryColor());
    });
  }
}
