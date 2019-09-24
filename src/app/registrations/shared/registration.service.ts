import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private basePath = '1Qqm9ql9vdEIGM-FTVjN5lGzuefb0aPedKQTv3rZQrOM/detailed22082019';
  registrations: Observable<any[]> = null;

  constructor(private db: AngularFireDatabase) {
  }

  getRegistrationsList(): Observable<any[]> {
    this.registrations = this.db.list(this.basePath).valueChanges();
    return this.registrations;
  }
}

