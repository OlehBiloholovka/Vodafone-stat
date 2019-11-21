import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RegistrationService} from '../shared/registration.service';
import {RegistrationDetailed} from '../shared/registration-detailed';

@Component({
  selector: 'app-registrations-list',
  templateUrl: './registrations-list.component.html',
  styleUrls: ['./registrations-list.component.css']
})
export class RegistrationsListComponent implements OnInit, OnDestroy {
  public filteredRegistrations$: Observable<RegistrationDetailed[]>;

  constructor(private rs: RegistrationService) {
  }

  ngOnInit() {
    this.rs.showPlanFilter$ = false;
    this.filteredRegistrations$ = this.rs.filteredRegistrationsDetailed$;
  }

  ngOnDestroy(): void {
    this.rs.inputFilterValue$.next('');
  }
}
