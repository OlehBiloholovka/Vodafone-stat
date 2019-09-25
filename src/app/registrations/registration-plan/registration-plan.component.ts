import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {RegistrationService} from '../shared/registration.service';
import {RegistrationPlan} from '../shared/registration-plan';

@Component({
  selector: 'app-registration-plan',
  templateUrl: './registration-plan.component.html',
  styleUrls: ['./registration-plan.component.css']
})
export class RegistrationPlanComponent implements OnInit {

  public registrationsPlan: Observable<RegistrationPlan[]>;

  constructor(private rs: RegistrationService) { }

  ngOnInit() {
    this.registrationsPlan = this.rs.getRegistrationsPlan();
  }

}
