import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdopcionesInformationComponent } from './adopciones-information.component';

describe('AdopcionesInformationComponent', () => {
  let component: AdopcionesInformationComponent;
  let fixture: ComponentFixture<AdopcionesInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdopcionesInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdopcionesInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
