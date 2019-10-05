import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {combineLatest, Observable} from 'rxjs';
import {Registration} from './registration';
import {RegistrationRdms} from './registration-rdms';
import {RegistrationMsisdn} from './registration-msisdn';
import {RegistrationPlan} from './registration-plan';
import {OutletService} from '../../base/shared/outlet.service';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private basePath = '1Qqm9ql9vdEIGM-FTVjN5lGzuefb0aPedKQTv3rZQrOM/detailed30092019';
  private planPath = '1RE-TyrVztwTAl3dePbnNjWtscclkinRDCQ-bhI1Hkc4/Plan092019';
  private namePPDPropertyName = 'namePPD';
  private typeRDMSPropertyName = 'typeRDMS';
  private allCountPropertyName = 'allCount';
  private isCompletedPropertyName = 'isCompleted';
  private mayBeCompletedPropertyName = 'mayBeCompleted';
  private toMakeUncheckedPropertyName = 'toMakeUnchecked';
  registrations: Observable<Registration[]> = null;
  registrationsRDMS$: Observable<RegistrationRdms[]>;
  registrationsMSISDN: Observable<RegistrationMsisdn[]>;
  registrationsPlan: Observable<RegistrationPlan[]>;


  constructor(private db: AngularFireDatabase, private os: OutletService) {
  }

  getRegistrationsList(): Observable<Registration[]> {
    this.registrations = this.db.list<Registration>(this.basePath).valueChanges();
    return this.registrations;
  }

  getFilterValues(propertyName: string): Observable<RegistrationRdms[]> {
    return this.getRegistrationsRDMS().pipe(
      map(data => data.filter((obj, pos, arr) => {
        return arr.map(mo => mo[propertyName]).indexOf(obj[propertyName]) === pos;
      }))
    );
  }

  getNamesPPD(): Observable<RegistrationRdms[]> {
    return this.getFilterValues(this.namePPDPropertyName);
  }

  getFilteredList<T>(oList: Observable<T[]>, inputFilterValue: FormControl,
                     namePPDFilterValue: FormControl, typeRDMSFilterValue: FormControl,
                     planFilterValue: FormControl = new FormControl([-1])): Observable<T[]> {
    const inputFilter$ = inputFilterValue.valueChanges.pipe(startWith(''));
    const namePPDFilter$ = namePPDFilterValue.valueChanges.pipe(startWith(namePPDFilterValue.value));
    const typeRDMSFilter$ = typeRDMSFilterValue.valueChanges.pipe(startWith(typeRDMSFilterValue.value));
    const planFilter$: Observable<number[]> = planFilterValue.valueChanges.pipe(startWith(planFilterValue.value));
    return combineLatest(oList, namePPDFilter$, typeRDMSFilter$, inputFilter$, planFilter$).pipe(
      map(([regs, namePPDValue, typeRDMSValue, inputValue, planValue]) => regs
        .filter(value => value[this.namePPDPropertyName].indexOf(namePPDValue) !== -1)
        .filter(value => value[this.typeRDMSPropertyName].charAt(0).indexOf(typeRDMSValue) !== -1)
        .filter(value => JSON.stringify(value).toLowerCase().indexOf(inputValue.toLowerCase()) !== -1)
        .filter(value => {
          if (planValue.includes(-1)) { return true; }
          let result = true;
          if (value[this.isCompletedPropertyName]) {
            result = result && planValue.includes(1);
          } else if (value[this.mayBeCompletedPropertyName]) {
            result = result && planValue.includes(2);
          } else if (value[this.allCountPropertyName] === 0) {
            result = result && planValue.includes(0);
          } else if (value[this.toMakeUncheckedPropertyName] <= 3) {
            result = result && planValue.includes(3);
          } else {
            result = result && planValue.includes(4);
          }
          return result;
        }))
    );
  }

  private calculatePlan<T>(oList: Observable<T[]>, namePPDFilterValue: FormControl, typeRDMS: string,
                           completing?: number[]): Observable<number> {
    const planFilterValue: FormControl = completing ? new FormControl(completing) : undefined;
    return  this.getFilteredList(oList, new FormControl(), namePPDFilterValue, new FormControl(typeRDMS), planFilterValue).pipe(
      map(data => data.length)
    );
  }

  getAllPlanCount<T>(oList: Observable<T[]>, namePPDFilterValue: FormControl, typeRDMS: string) {
    return this.calculatePlan(oList, namePPDFilterValue, typeRDMS);
  }

  getCompletedPlanCount<T>(oList: Observable<T[]>, namePPDFilterValue: FormControl, typeRDMS: string) {
    return this.calculatePlan(oList, namePPDFilterValue, typeRDMS, [1]);
  }

  getMayCompletedPlanCount<T>(oList: Observable<T[]>, namePPDFilterValue: FormControl, typeRDMS: string) {
    return this.calculatePlan(oList, namePPDFilterValue, typeRDMS, [1, 2]);
  }

  getRegistrationsPlan(): Observable<RegistrationPlan[]> {
    const rPlans = this.db.list<RegistrationPlan>(this.planPath).valueChanges();
    const rMSISDN = this.getRegistrationsMSISDN();
    const outlets = this.os.getOutletsList();
    return combineLatest(rPlans, rMSISDN, outlets).pipe(
      map(([rp, rm, ol]) => rp.map(p => {
        const rPlan: RegistrationPlan = Object
          .assign(new RegistrationPlan(), p, rm.find(m => p.codeMSISDN === m.codeMSISDN),
            ol.find(o => p.codeRDMS === o.codeRDMS));
        // if (!rPlan.allCount) {
        //   rPlan.allCount = 0;
        //   rPlan.onCheckingCount = 0;
        //   rPlan.checkedDudCount = 0;
        // }
        if (!rPlan.typeRDMS) { rPlan.typeRDMS = ''; }
        rPlan.plan = p.plan;
        rPlan.toMake = rPlan.getToMake();
        rPlan.toMakeUnchecked = rPlan.getToMakeUnchecked();
        rPlan.isCompleted = rPlan.getIsCompleted();
        rPlan.mayBeCompleted = rPlan.getMayBeCompleted();
        // rPlan.isCompleted = rPlan.checkedDudCount >= rPlan.plan;
        // rPlan.mayBeCompleted = (rPlan.checkedDudCount
        //   + rPlan.onCheckingCount) >= rPlan.plan;
        // rPlan.toMake = rPlan.checkedDudCount - rPlan.plan;
        // rPlan.toMakeUnchecked = rPlan.toMake + rPlan.onCheckingCount;
        return rPlan;
      })),
      map(data => data.sort((a, b) => {
        let result: number = b.toMakeUnchecked - a.toMakeUnchecked;
        if (result === 0 || a.isCompleted || b.isCompleted) {
          result = b.toMake - a.toMake;
        }
        if (a.allCount === 0 || b.allCount === 0) {
          result = a.allCount - b.allCount;
          if (result === 0) {
            result = b.toMake - a.toMake;
          }
        }
        return result;
      })),
    );
  }

  getRegistrationsRDMS(): Observable<RegistrationRdms[]> {
    this.registrationsRDMS$ = this.getRegistrationsList().pipe(
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
            // rRdms.plan = rRdms.typeRDMS.charAt(0) === 'A' ? 5 : 0;
            rRdms.toMake = rRdms.getToMake();
            rRdms.toMakeUnchecked = rRdms.getToMakeUnchecked();
            rRdms.isCompleted = rRdms.getIsCompleted();
            rRdms.mayBeCompleted = rRdms.getMayBeCompleted();
          });
          return Array.from(registrationRDMSMap.values());
        }
      ),
      map(data => data.sort((a, b) => {
        let result: number = b.toMakeUnchecked - a.toMakeUnchecked;
        if (result === 0 || a.isCompleted || b.isCompleted) {
          result = b.toMake - a.toMake;
        }
        if (a.allCount === 0 || b.allCount === 0) {
          result = a.allCount - b.allCount;
          if (result === 0) {
            result = b.toMake - a.toMake;
          }
        }
        return result;
      })),
    );
    return this.registrationsRDMS$;
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
            rMsisdn.toMake = rMsisdn.getToMake();
            rMsisdn.toMakeUnchecked = rMsisdn.getToMakeUnchecked();
            rMsisdn.isCompleted = rMsisdn.getIsCompleted();
            rMsisdn.mayBeCompleted = rMsisdn.getMayBeCompleted();
          });
          return Array.from(registrationMSISDNMap.values());
        }
      ),
      map(data => data.sort((a, b) => {
        let result: number = b.toMakeUnchecked - a.toMakeUnchecked;
        if (result === 0 || a.isCompleted || b.isCompleted) {
          result = b.toMake - a.toMake;
        }
        if (a.allCount === 0 || b.allCount === 0) {
          result = a.allCount - b.allCount;
          if (result === 0) {
            result = b.toMake - a.toMake;
          }
        }
        return result;
      })),
    );
    return this.registrationsMSISDN;
  }
}

