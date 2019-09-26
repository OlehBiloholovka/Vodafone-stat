import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseOutletsComponent } from './base-outlets.component';

describe('BaseOutletsComponent', () => {
  let component: BaseOutletsComponent;
  let fixture: ComponentFixture<BaseOutletsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseOutletsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseOutletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
