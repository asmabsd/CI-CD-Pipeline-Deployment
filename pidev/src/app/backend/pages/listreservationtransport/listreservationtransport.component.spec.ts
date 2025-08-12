import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListreservationtransportComponent } from './listreservationtransport.component';

describe('ListreservationtransportComponent', () => {
  let component: ListreservationtransportComponent;
  let fixture: ComponentFixture<ListreservationtransportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListreservationtransportComponent]
    });
    fixture = TestBed.createComponent(ListreservationtransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
