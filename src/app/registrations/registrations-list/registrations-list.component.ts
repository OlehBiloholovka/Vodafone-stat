import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {RegistrationService} from '../shared/registration.service';
import {RegistrationDetailed} from '../shared/registration-detailed';
import {RegistrationRdms} from '../shared/registration-rdms';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-registrations-list',
  templateUrl: './registrations-list.component.html',
  styleUrls: ['./registrations-list.component.css']
})
export class RegistrationsListComponent implements OnInit, OnDestroy {
  private registrations$: Observable<RegistrationDetailed[]>;
  private paramSubscription: Subscription;

  public filteredRegistrations$: Observable<RegistrationDetailed[]>;

  protected inputFilterValue: FormControl = new FormControl('');
  protected namePPDFilterValue: FormControl = new FormControl('');
  protected typeRDMSFilterValue: FormControl = new FormControl('');
  protected namePPDList$: Observable<RegistrationRdms[]>;

  constructor(private rs: RegistrationService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.registrations$ = this.rs.getRegistrationsList();
    this.paramSubscription = this.route.paramMap.pipe(
      map((params: ParamMap) =>
        params.get('id')
      )
    ).subscribe(value => this.inputFilterValue.setValue(value));
    this.filteredRegistrations$ = this.rs
      .getFilteredList(this.registrations$, this.inputFilterValue, this.namePPDFilterValue, this.typeRDMSFilterValue);
    this.namePPDList$ = this.rs.getNamesPPD();
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
