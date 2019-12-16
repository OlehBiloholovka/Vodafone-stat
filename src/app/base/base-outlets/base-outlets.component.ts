import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Outlet} from '../shared/outlet';
import {RegistrationService} from '../../registrations/shared/registration.service';

@Component({
  selector: 'app-base-outlets',
  templateUrl: './base-outlets.component.html',
  styleUrls: ['./base-outlets.component.css']
})
export class BaseOutletsComponent implements OnInit {

  public filteredOutlets$: Observable<Outlet[]>;


  constructor(private rs: RegistrationService) { }

  ngOnInit() {
    this.filteredOutlets$ = this.rs.filteredOutlets$;
  }

}
