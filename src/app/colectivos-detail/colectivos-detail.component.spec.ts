import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColectivosDetailComponent } from './colectivos-detail.component';

describe('ColectivosDetailComponent', () => {
  let component: ColectivosDetailComponent;
  let fixture: ComponentFixture<ColectivosDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColectivosDetailComponent]
    });
    fixture = TestBed.createComponent(ColectivosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
