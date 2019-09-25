import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {RegistrationService} from '../shared/registration.service';
import {Registration} from '../shared/registration';

@Component({
  selector: 'app-registrations-list',
  templateUrl: './registrations-list.component.html',
  styleUrls: ['./registrations-list.component.css']
})
export class RegistrationsListComponent implements OnInit {

  public registrations: Observable<Registration[]>;

  constructor(private rs: RegistrationService) { }

  ngOnInit() {
    this.registrations = this.rs.getRegistrationsList();
  }

}
