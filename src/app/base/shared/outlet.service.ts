import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Outlet} from './outlet';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OutletService {

  private firstPath = '1hhz_gZV0pu0tQir8M66E_hqOsQcQnGciaeuKsEP2mXE/09_2019';
  private bathPath = '1hhz_gZV0pu0tQir8M66E_hqOsQcQnGciaeuKsEP2mXE';
  outletsList: Observable<Outlet[]>;
  filteredOutletsList$: Observable<Outlet[]>;

  constructor(private ad: AngularFireDatabase) { }

  getOutletsList1(): Observable<Outlet[]> {
    this.outletsList = this.ad.list<Outlet>(this.firstPath).valueChanges();
    return this.outletsList;
  }

  getOutletsList(datePath: string): Observable<Outlet[]> {
    this.outletsList = this.ad
      .list<Outlet>(this.bathPath, ref => ref.child(datePath)).valueChanges();
    return this.outletsList;
  }

  getFilteredOutletsList(datePath: string): Observable<Outlet[]> {
    this.filteredOutletsList$ = this.getOutletsList(datePath);
    return this.filteredOutletsList$;
  }

  getNamePPDList(datePath: string): Observable<string[]> {
    if (!datePath) { return; }
    return this.ad.list<Outlet>(this.bathPath, ref => ref
      .child(datePath))
      .valueChanges()
      .pipe(map(
        data => data
          .map(value => value.namePPD)
          .filter((v, i, s) => s.indexOf(v) === i)
      ));
  }
}
