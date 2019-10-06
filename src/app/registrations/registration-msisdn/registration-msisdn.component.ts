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

  constructor(private rs: RegistrationService) { }

  ngOnInit() {
    this.rs.getRegistrationFilter(this);
    this.registrationsMSISDN$ = this.rs.getRegistrationsMSISDN();
    this.filteredRegistrationsMSISDN$ = this.rs
      .getFilteredList(this.registrationsMSISDN$, this.inputFilterValue, this.namePPDFilterValue,
        this.typeRDMSFilterValue, this.registrationsFilterValue);
    this.rs.countPlan(this, this.registrationsMSISDN$, this.namePPDFilterValue);
  }

  private getStyle(rp: RegistrationRdms): {} {
    return this.rs.getStyle(rp);
  }
}
