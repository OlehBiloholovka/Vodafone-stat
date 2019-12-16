import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RegistrationMSISDN} from '../shared/registration-msisdn';
import {RegistrationService} from '../shared/registration.service';
import {RegistrationRDMS} from '../shared/registration-rdms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration-msisdn',
  templateUrl: './registration-msisdn.component.html',
  styleUrls: ['./registration-msisdn.component.css']
})
export class RegistrationMsisdnComponent implements OnInit {

  private registrationsMSISDN$: Observable<RegistrationMSISDN[]>;
  public filteredRegistrationsMSISDN$: Observable<RegistrationMSISDN[]>;

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
    this.registrationsMSISDN$ = this.rs.registrationsMSISDN$;
    this.filteredRegistrationsMSISDN$ = this.rs
      .filteredRegistrationsMSISDN$;
    this.rs.countPlan1(this, this.registrationsMSISDN$);
  }

  getStyle(rp: RegistrationRDMS): {} {
    return this.rs.getStyle(rp);
  }

  toRegistrationsDetailed(codeMSISDN: number) {
    this.rs.inputFilterValue$.next(codeMSISDN.toString());
    this.router.navigate(['regs', 'registrations']).catch(console.log);
  }
}
