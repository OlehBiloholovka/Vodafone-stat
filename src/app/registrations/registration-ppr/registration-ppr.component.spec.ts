import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPprComponent } from './registration-ppr.component';

describe('RegistrationsPPRComponent', () => {
  let component: RegistrationPprComponent;
  let fixture: ComponentFixture<RegistrationPprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationPprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
