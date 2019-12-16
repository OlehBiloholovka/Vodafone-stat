import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RegistrationRDMS} from '../shared/registration-rdms';
import {RegistrationService} from '../shared/registration.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration-partner',
  templateUrl: './registration-partner.component.html',
  styleUrls: ['./registration-partner.component.css']
})
export class RegistrationPartnerComponent implements OnInit {

  private registrationsPartner$: Observable<RegistrationRDMS[]>;
  public filteredRegistrationsPartner$: Observable<RegistrationRDMS[]>;

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
    this.registrationsPartner$ = this.rs.registrationsPartner$;
    this.filteredRegistrationsPartner$ = this.rs.filteredRegistrationsPartner$;
    this.rs.countPlan1(this, this.registrationsPartner$);
  }

  getStyle(rp: RegistrationRDMS): {} {
    return this.rs.getStyle(rp);
  }

  toRegistrationsDetailed(codeRDMS: number) {
    this.rs.inputFilterValue$.next(codeRDMS.toString());
    this.router.navigate(['regs', 'registrations']).catch(console.log);
  }
}
