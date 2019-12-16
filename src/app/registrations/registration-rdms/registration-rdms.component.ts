import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RegistrationService} from '../shared/registration.service';
import {RegistrationRDMS} from '../shared/registration-rdms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration-rdms',
  templateUrl: './registration-rdms.component.html',
  styleUrls: ['./registration-rdms.component.css']
})
export class RegistrationRdmsComponent implements OnInit {

  private registrationsRDMS$: Observable<RegistrationRDMS[]>;
  public filteredRegistrationsRdms$: Observable<RegistrationRDMS[]>;

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
    // this.registrationsRDMS$ = this.rs.getRegistrationsRDMS3();
    // this.filteredRegistrationsPPR$ = this.rs.filterList(this.registrationsRDMS$);
    // this.rs.countPlan1(this, this.registrationsRDMS$);
    this.registrationsRDMS$ = this.rs.registrationsRDMS$;
    this.filteredRegistrationsRdms$ = this.rs.filteredRegistrationsRDMS$;
    this.rs.countPlan1(this, this.registrationsRDMS$);
  }

  getStyle(rp: RegistrationRDMS): {} {
    return this.rs.getStyle(rp);
  }

  toRegistrationsDetailed(codeRDMS: number) {
    this.rs.inputFilterValue$.next(codeRDMS.toString());
    this.router.navigate(['regs', 'registrations']).catch(console.log);
  }
}
