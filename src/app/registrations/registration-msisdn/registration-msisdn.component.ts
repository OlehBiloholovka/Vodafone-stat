import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {RegistrationMsisdn} from '../shared/registration-msisdn';
import {RegistrationService} from '../shared/registration.service';

@Component({
  selector: 'app-registration-msisdn',
  templateUrl: './registration-msisdn.component.html',
  styleUrls: ['./registration-msisdn.component.css']
})
export class RegistrationMsisdnComponent implements OnInit {

  public registrationsMSISDN: Observable<RegistrationMsisdn[]>;

  constructor(private rs: RegistrationService) { }

  ngOnInit() {
    this.registrationsMSISDN = this.rs.getRegistrationsMSISDN();
  }

}
