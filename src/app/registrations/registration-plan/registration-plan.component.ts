import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RegistrationService} from '../shared/registration.service';
import {RegistrationPlan} from '../shared/registration-plan';
import {RegistrationRDMS} from '../shared/registration-rdms';
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

  constructor(private rs: RegistrationService, private router: Router) {
  }

  ngOnInit() {
    this.rs.showPlanFilter$ = true;
    // this.registrationsPlan$ = this.rs.getRegistrationsPlan1();
    // this.filteredRegistrationsPlan$ = this.rs
    //   .filterList(this.registrationsPlan$);
    this.registrationsPlan$ = this.rs.registrationsPlan$;
    this.filteredRegistrationsPlan$ = this.rs.filteredRegistrationsPlan$;
    this.rs.countPlan1(this, this.registrationsPlan$);
  }

  getStyle(rp: RegistrationRDMS): {} {
    return this.rs.getStyle(rp);
  }

  toRegistrationsDetailed(codeMSISDN: number) {
    this.rs.inputFilterValue$.next(codeMSISDN.toString());
    this.router.navigate(['regs', 'registrations']).catch(console.log);
  }

}
