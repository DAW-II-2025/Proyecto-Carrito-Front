import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetallesPedidoComponent } from './ver-detalles-pedido.component';

describe('VerDetallesPedidoComponent', () => {
  let component: VerDetallesPedidoComponent;
  let fixture: ComponentFixture<VerDetallesPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerDetallesPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDetallesPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
