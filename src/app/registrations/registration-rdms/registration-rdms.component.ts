import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {RegistrationService} from '../shared/registration.service';
import {RegistrationRdms} from '../shared/registration-rdms';

@Component({
  selector: 'app-registration-rdms',
  templateUrl: './registration-rdms.component.html',
  styleUrls: ['./registration-rdms.component.css']
})
export class RegistrationRdmsComponent implements OnInit {

  public registrationsRdms: Observable<RegistrationRdms[]>;

  constructor(private rs: RegistrationService) { }

  ngOnInit() {
    this.registrationsRdms = this.rs.getRegistrationsRDMS();
  }

}
