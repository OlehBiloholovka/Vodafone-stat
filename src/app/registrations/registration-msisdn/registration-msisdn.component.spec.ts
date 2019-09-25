import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationMsisdnComponent } from './registration-msisdn.component';

describe('RegistrationMsisdnComponent', () => {
  let component: RegistrationMsisdnComponent;
  let fixture: ComponentFixture<RegistrationMsisdnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationMsisdnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationMsisdnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
