import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Registration} from './registration';
import {RegistrationRdms} from './registration-rdms';
import {RegistrationMsisdn} from './registration-msisdn';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private basePath = '1Qqm9ql9vdEIGM-FTVjN5lGzuefb0aPedKQTv3rZQrOM/detailed22082019';
  registrations: Observable<Registration[]> = null;
  registrationsRDMS: Observable<RegistrationRdms[]>;
  registrationsMSISDN: Observable<RegistrationMsisdn[]>;

  constructor(private db: AngularFireDatabase) {
  }

  getRegistrationsList(): Observable<Registration[]> {
    this.registrations = this.db.list<Registration>(this.basePath).valueChanges();
    return this.registrations;
  }

  getRegistrationsRDMS(): Observable<RegistrationRdms[]> {
    this.registrationsRDMS = this.getRegistrationsList().pipe(
      map(
        data => {
          const registrationRDMSMap = new Map<number, RegistrationRdms>();
          data.map(reg => {
            let rRdms = new RegistrationRdms();
            if (!registrationRDMSMap.has(reg.codeRDMS)) {
              rRdms.namePPD = reg.namePPD;
              rRdms.codeRDMS = reg.codeRDMS;
              rRdms.nameRDMS = reg.nameRDMS;
              rRdms.addressRDMS = reg.addressRDMS;
              rRdms.typeRDMS = reg.typeRDMS;
              registrationRDMSMap.set(reg.codeRDMS, rRdms);
            }
            rRdms = registrationRDMSMap.get(reg.codeRDMS);
            rRdms.allCount++;
            if (reg.checkDud === 'Ок') {
              rRdms.checkedDudCount++;
            }
            if (reg.checkDud === 'Не отправлено' && (reg.rejectReason === 'Успешно' || reg.rejectReason === 'В работе')) {
              rRdms.onCheckingCount++;
            }
          });
          return Array.from(registrationRDMSMap.values());
        }
      )
    );
    return this.registrationsRDMS;
  }
  getRegistrationsMSISDN(): Observable<RegistrationMsisdn[]> {
    this.registrationsMSISDN = this.getRegistrationsList().pipe(
      map(
        data => {
          const registrationMSISDNMap = new Map<number, RegistrationMsisdn>();
          data.map(reg => {
            let rMsisdn = new RegistrationMsisdn();
            if (!registrationMSISDNMap.has(reg.codeMSISDN)) {
              rMsisdn.namePPD = reg.namePPD;
              rMsisdn.codeRDMS = reg.codeRDMS;
              rMsisdn.nameRDMS = reg.nameRDMS;
              rMsisdn.addressRDMS = reg.addressRDMS;
              rMsisdn.typeRDMS = reg.typeRDMS;
              rMsisdn.codeMSISDN = reg.codeMSISDN;
              rMsisdn.nameSeller = reg.nameSeller;
              registrationMSISDNMap.set(reg.codeMSISDN, rMsisdn);
            }
            rMsisdn = registrationMSISDNMap.get(reg.codeMSISDN);
            rMsisdn.allCount++;
            if (reg.checkDud === 'Ок') {
              rMsisdn.checkedDudCount++;
            }
            if (reg.checkDud === 'Не отправлено' && (reg.rejectReason === 'Успешно' || reg.rejectReason === 'В работе')) {
              rMsisdn.onCheckingCount++;
            }
          });
          return Array.from(registrationMSISDNMap.values());
        }
      )
    );
    return this.registrationsMSISDN;
  }
}

