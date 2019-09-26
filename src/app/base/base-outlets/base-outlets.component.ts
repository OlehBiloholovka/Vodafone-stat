import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Outlet} from '../shared/outlet';
import {OutletService} from '../shared/outlet.service';

@Component({
  selector: 'app-base-outlets',
  templateUrl: './base-outlets.component.html',
  styleUrls: ['./base-outlets.component.css']
})
export class BaseOutletsComponent implements OnInit {

  public outlets: Observable<Outlet[]>;

  constructor(private os: OutletService) { }

  ngOnInit() {
    this.outlets = this.os.getOutletsList();
  }

}
