import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosCampanasComponent } from './productos-campanas.component';

describe('ProductosCampanasComponent', () => {
  let component: ProductosCampanasComponent;
  let fixture: ComponentFixture<ProductosCampanasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosCampanasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosCampanasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
