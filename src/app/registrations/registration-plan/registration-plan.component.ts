import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {RegistrationService} from '../shared/registration.service';
import {RegistrationPlan} from '../shared/registration-plan';
import {RegistrationRdms} from '../shared/registration-rdms';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

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

  constructor(private rs: RegistrationService, private router: Router) { }

  ngOnInit() {
    this.rs.getRegistrationFilter(this);
    this.registrationsPlan$ = this.rs.getRegistrationsPlan();
    this.filteredRegistrationsPlan$ = this.rs
      .getFilteredList(this.registrationsPlan$, this.inputFilterValue, this.namePPDFilterValue,
        this.typeRDMSFilterValue, this.registrationsFilterValue);
    this.rs.countPlan(this, this.registrationsPlan$, this.namePPDFilterValue);
  }

  private getStyle(rp: RegistrationRdms): {} {
    return this.rs.getStyle(rp);
  }

  toRegistrationsDetailed(codeMSISDN: number) {
    this.router.navigate(['registrations/', codeMSISDN]).catch(console.log);
  }

}
