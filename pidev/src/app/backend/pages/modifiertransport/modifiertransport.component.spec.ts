import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiertransportComponent } from './modifiertransport.component';

describe('ModifiertransportComponent', () => {
  let component: ModifiertransportComponent;
  let fixture: ComponentFixture<ModifiertransportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifiertransportComponent]
    });
    fixture = TestBed.createComponent(ModifiertransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
