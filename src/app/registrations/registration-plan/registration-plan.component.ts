import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {RegistrationService} from '../shared/registration.service';
import {RegistrationPlan} from '../shared/registration-plan';
import {RegistrationRdms} from '../shared/registration-rdms';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-registration-plan',
  templateUrl: './registration-plan.component.html',
  styleUrls: ['./registration-plan.component.css']
})
export class RegistrationPlanComponent implements OnInit {

  private registrationsPlan$: Observable<RegistrationPlan[]>;
  public filteredRegistrationsPlan$: Observable<RegistrationPlan[]>;
  aAllPlanCount$: Observable<number>;
  bAllPlanCount$: Observable<number>;
  aCompletedPlanCount$: Observable<number>;
  bCompletedPlanCount$: Observable<number>;
  aMayCompletedPlanCount$: Observable<number>;
  bMayCompletedPlanCount$: Observable<number>;

  protected inputFilterValue: FormControl = new FormControl('');
  protected namePPDFilterValue: FormControl = new FormControl('');
  protected typeRDMSFilterValue: FormControl = new FormControl('');
  protected registrationsFilterValue: FormControl = new FormControl('');
  protected namePPDList$: Observable<RegistrationRdms[]>;
  protected dropdownList: any[];
  protected selectedDropdownList: number[];

  constructor(private rs: RegistrationService) { }

  ngOnInit() {
    this.dropdownList = [
      { item_id: 0, item_text: 'Без реєстрацій' },
      { item_id: 1, item_text: 'План виконано' },
      { item_id: 2, item_text: 'Можливе виконання' },
      { item_id: 3, item_text: 'До виконання <4' },
      { item_id: 4, item_text: 'Інші' }
    ];
    this.selectedDropdownList = this.dropdownList.map(value => value.item_id);
    this.registrationsFilterValue.setValue(this.selectedDropdownList);
    this.registrationsPlan$ = this.rs.getRegistrationsPlan();
    this.filteredRegistrationsPlan$ = this.rs
      .getFilteredList(this.registrationsPlan$, this.inputFilterValue, this.namePPDFilterValue,
        this.typeRDMSFilterValue, this.registrationsFilterValue);
    this.namePPDList$ = this.rs.getNamesPPD();
    this.countPlan();
  }

  countPlan() {
    this.aAllPlanCount$ = this.rs.getAllPlanCount(this.registrationsPlan$, this.namePPDFilterValue, 'A');
    this.bAllPlanCount$ = this.rs.getAllPlanCount(this.registrationsPlan$, this.namePPDFilterValue, 'B');
    this.aCompletedPlanCount$ = this.rs.getCompletedPlanCount(this.registrationsPlan$, this.namePPDFilterValue, 'A');
    this.bCompletedPlanCount$ = this.rs.getCompletedPlanCount(this.registrationsPlan$, this.namePPDFilterValue, 'B');
    this.aMayCompletedPlanCount$ = this.rs.getMayCompletedPlanCount(this.registrationsPlan$, this.namePPDFilterValue, 'A');
    this.bMayCompletedPlanCount$ = this.rs.getMayCompletedPlanCount(this.registrationsPlan$, this.namePPDFilterValue, 'B');
  }

  private getStyle(rp: RegistrationPlan): {} {
    if (rp.isCompleted) {
      return {
        'background-color': 'green',
        color: 'white'
      };
    }
    if (rp.mayBeCompleted) {
      return {
        'background-color': 'orange',
        color: 'blue'
      };
    }
    if (rp.toMakeUnchecked <= 3 && rp.allCount !== 0) {
      return {
        'background-color': 'yellow',
        color: 'blue'
      };
    }
    if (rp.allCount === 0) {
      return {
        'background-color': 'red',
        color: 'white'
      };
    }
    return {};
  }

}
