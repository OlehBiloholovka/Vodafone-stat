import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {RegistrationService} from '../shared/registration.service';
import {RegistrationRdms} from '../shared/registration-rdms';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-registration-rdms',
  templateUrl: './registration-rdms.component.html',
  styleUrls: ['./registration-rdms.component.css']
})
export class RegistrationRdmsComponent implements OnInit {

  private registrationsRdms$: Observable<RegistrationRdms[]>;

  public filteredRegistrationsRdms$: Observable<RegistrationRdms[]>;
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
    this.registrationsRdms$ = this.rs.getRegistrationsRDMS();
    this.filteredRegistrationsRdms$ = this.rs
      .getFilteredList(this.registrationsRdms$, this.inputFilterValue, this.namePPDFilterValue, this.typeRDMSFilterValue
        , this.registrationsFilterValue);
    this.rs.countPlan(this, this.registrationsRdms$, this.namePPDFilterValue);
  }

  private getStyle(rp: RegistrationRdms): {} {
    return  this.rs.getStyle(rp);
  }
}
