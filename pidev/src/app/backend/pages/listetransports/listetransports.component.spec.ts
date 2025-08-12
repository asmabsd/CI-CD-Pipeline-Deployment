import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListetransportsComponent } from './listetransports.component';

describe('ListetransportsComponent', () => {
  let component: ListetransportsComponent;
  let fixture: ComponentFixture<ListetransportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListetransportsComponent]
    });
    fixture = TestBed.createComponent(ListetransportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
