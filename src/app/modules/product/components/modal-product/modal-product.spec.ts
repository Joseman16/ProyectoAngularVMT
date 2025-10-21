import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProduct } from './modal-product';

describe('ModalProduct', () => {
  let component: ModalProduct;
  let fixture: ComponentFixture<ModalProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
