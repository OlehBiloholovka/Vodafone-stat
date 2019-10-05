import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {RegistrationMsisdn} from '../shared/registration-msisdn';
import {RegistrationService} from '../shared/registration.service';
import {RegistrationRdms} from '../shared/registration-rdms';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-registration-msisdn',
  templateUrl: './registration-msisdn.component.html',
  styleUrls: ['./registration-msisdn.component.css']
})
export class RegistrationMsisdnComponent implements OnInit {

  private registrationsMSISDN$: Observable<RegistrationMsisdn[]>;

  public filteredRegistrationsMSISDN$: Observable<RegistrationMsisdn[]>;
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
    this.registrationsMSISDN$ = this.rs.getRegistrationsMSISDN();
    this.filteredRegistrationsMSISDN$ = this.rs
      .getFilteredList(this.registrationsMSISDN$, this.inputFilterValue, this.namePPDFilterValue,
        this.typeRDMSFilterValue, this.registrationsFilterValue);
    this.namePPDList$ = this.rs.getNamesPPD();
    this.countPlan();
  }

  countPlan() {
    this.aAllPlanCount$ = this.rs.getAllPlanCount(this.registrationsMSISDN$, this.namePPDFilterValue, 'A');
    this.bAllPlanCount$ = this.rs.getAllPlanCount(this.registrationsMSISDN$, this.namePPDFilterValue, 'B');
    this.aCompletedPlanCount$ = this.rs.getCompletedPlanCount(this.registrationsMSISDN$, this.namePPDFilterValue, 'A');
    this.bCompletedPlanCount$ = this.rs.getCompletedPlanCount(this.registrationsMSISDN$, this.namePPDFilterValue, 'B');
    this.aMayCompletedPlanCount$ = this.rs.getMayCompletedPlanCount(this.registrationsMSISDN$, this.namePPDFilterValue, 'A');
    this.bMayCompletedPlanCount$ = this.rs.getMayCompletedPlanCount(this.registrationsMSISDN$, this.namePPDFilterValue, 'B');
  }

}
