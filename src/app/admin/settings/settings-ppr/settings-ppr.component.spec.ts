import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPprComponent } from './settings-ppr.component';

describe('SettingsPprComponent', () => {
  let component: SettingsPprComponent;
  let fixture: ComponentFixture<SettingsPprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
