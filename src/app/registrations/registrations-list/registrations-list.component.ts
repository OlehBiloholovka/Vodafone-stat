import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {RegistrationService} from '../shared/registration.service';
import {Registration} from '../shared/registration';
import {RegistrationRdms} from '../shared/registration-rdms';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-registrations-list',
  templateUrl: './registrations-list.component.html',
  styleUrls: ['./registrations-list.component.css']
})
export class RegistrationsListComponent implements OnInit {

  private registrations$: Observable<Registration[]>;

  public filteredRegistrations$: Observable<Registration[]>;

  protected inputFilterValue: FormControl = new FormControl('');
  protected namePPDFilterValue: FormControl = new FormControl('');
  protected typeRDMSFilterValue: FormControl = new FormControl('');
  protected namePPDList$: Observable<RegistrationRdms[]>;

  constructor(private rs: RegistrationService) { }

  ngOnInit() {
    this.registrations$ = this.rs.getRegistrationsList();
    this.filteredRegistrations$ = this.rs
      .getFilteredList(this.registrations$, this.inputFilterValue, this.namePPDFilterValue, this.typeRDMSFilterValue);
    this.namePPDList$ = this.rs.getNamesPPD();
  }

}
