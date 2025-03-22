import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciasInformationComponent } from './denuncias-information.component';

describe('DenunciasInformationComponent', () => {
  let component: DenunciasInformationComponent;
  let fixture: ComponentFixture<DenunciasInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DenunciasInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DenunciasInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
