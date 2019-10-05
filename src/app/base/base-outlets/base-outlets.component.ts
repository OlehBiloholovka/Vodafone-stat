import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Outlet} from '../shared/outlet';
import {OutletService} from '../shared/outlet.service';
import {FormControl} from '@angular/forms';
import {RegistrationRdms} from '../../registrations/shared/registration-rdms';
import {RegistrationService} from '../../registrations/shared/registration.service';

@Component({
  selector: 'app-base-outlets',
  templateUrl: './base-outlets.component.html',
  styleUrls: ['./base-outlets.component.css']
})
export class BaseOutletsComponent implements OnInit {

  public outlets$: Observable<Outlet[]>;

  public filteredOutlets$: Observable<Outlet[]>;

  protected inputFilterValue: FormControl = new FormControl('');
  protected namePPDFilterValue: FormControl = new FormControl('');
  protected typeRDMSFilterValue: FormControl = new FormControl('');
  protected namePPDList$: Observable<RegistrationRdms[]>;

  constructor(private os: OutletService, private rs: RegistrationService) { }

  ngOnInit() {
    this.outlets$ = this.os.getOutletsList();
    this.filteredOutlets$ = this.rs
      .getFilteredList(this.outlets$, this.inputFilterValue, this.namePPDFilterValue, this.typeRDMSFilterValue);
    this.namePPDList$ = this.rs.getNamesPPD();
  }

}
