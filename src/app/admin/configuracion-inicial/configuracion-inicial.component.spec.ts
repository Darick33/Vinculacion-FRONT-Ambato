import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionInicialComponent } from './configuracion-inicial.component';

describe('ConfiguracionInicialComponent', () => {
  let component: ConfiguracionInicialComponent;
  let fixture: ComponentFixture<ConfiguracionInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguracionInicialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfiguracionInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
