import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Outlet} from './outlet';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutletService {

  private bathPath = '1hhz_gZV0pu0tQir8M66E_hqOsQcQnGciaeuKsEP2mXE/BaseOutlet23092019';
  outletsList: Observable<Outlet[]>;

  constructor(private ad: AngularFireDatabase) { }

  getOutletsList(): Observable<Outlet[]> {
    this.outletsList = this.ad.list<Outlet>(this.bathPath).valueChanges();
    return this.outletsList;
  }

}
