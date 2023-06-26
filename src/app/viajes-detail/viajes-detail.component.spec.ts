import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesDetailComponent } from './viajes-detail.component';

describe('ViajesDetailComponent', () => {
  let component: ViajesDetailComponent;
  let fixture: ComponentFixture<ViajesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViajesDetailComponent]
    });
    fixture = TestBed.createComponent(ViajesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
