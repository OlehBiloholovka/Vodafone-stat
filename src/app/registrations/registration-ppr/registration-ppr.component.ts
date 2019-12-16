import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RegistrationRDMS} from '../shared/registration-rdms';
import {RegistrationService} from '../shared/registration.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registrations-ppr',
  templateUrl: './registration-ppr.component.html',
  styleUrls: ['./registration-ppr.component.css']
})
export class RegistrationPprComponent implements OnInit {

  private registrationsPPR$: Observable<RegistrationRDMS[]>;
  public filteredRegistrationsPPR$: Observable<RegistrationRDMS[]>;

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
    this.registrationsPPR$ = this.rs.registrationsPPR$;
    this.filteredRegistrationsPPR$ = this.rs.filteredRegistrationsPPR$;
    this.rs.countPlan1(this, this.registrationsPPR$);
  }

  getStyle(rp: RegistrationRDMS): {} {
    return this.rs.getStyle(rp);
  }

  toRegistrationsDetailed(codeRDMS: number) {
    this.rs.inputFilterValue$.next(codeRDMS.toString());
    this.router.navigate(['regs', 'registrations']).catch(console.log);
  }
}
