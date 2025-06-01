import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMiInformacionComponent } from './ver-mi-informacion.component';

describe('VerMiInformacionComponent', () => {
  let component: VerMiInformacionComponent;
  let fixture: ComponentFixture<VerMiInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerMiInformacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerMiInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
