import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationRdmsComponent } from './registration-rdms.component';

describe('RegistrationRdmsComponent', () => {
  let component: RegistrationRdmsComponent;
  let fixture: ComponentFixture<RegistrationRdmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationRdmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationRdmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
