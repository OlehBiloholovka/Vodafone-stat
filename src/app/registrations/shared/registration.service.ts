import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {combineLatest, Observable} from 'rxjs';
import {RegistrationDetailed} from './registration-detailed';
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


  constructor(private db: AngularFireDatabase, private os: OutletService) {
  }

  private basePath = '1Qqm9ql9vdEIGM-FTVjN5lGzuefb0aPedKQTv3rZQrOM/detailed30092019';
  private planPath = '1RE-TyrVztwTAl3dePbnNjWtscclkinRDCQ-bhI1Hkc4/Plan092019';
  private namePPDPropertyName = 'namePPD';
  private typeRDMSPropertyName = 'typeRDMS';
  private allCountPropertyName = 'allCount';
  private isCompletedPropertyName = 'isCompleted';
  private mayBeCompletedPropertyName = 'mayBeCompleted';
  private toMakeUncheckedPropertyName = 'toMakeUnchecked';
  registrations$: Observable<RegistrationDetailed[]> = null;
  registrationsRDMS$: Observable<RegistrationRdms[]>;
  registrationsMSISDN$: Observable<RegistrationMsisdn[]>;
  registrationsPlan$: Observable<RegistrationPlan[]>;

  private static calculateCheckedRegistrations<T extends RegistrationRdms>(r: T) {
    r.toMake = r.getToMake();
    r.toMakeUnchecked = r.getToMakeUnchecked();
    r.isCompleted = r.getIsCompleted();
    r.mayBeCompleted = r.getMayBeCompleted();
  }

  private static countCheckedRegistrations<T extends RegistrationRdms>(r: T, reg: RegistrationDetailed) {
    r.allCount++;
    if (reg.checkDud === 'Ок') {
      r.checkedDudCount++;
    }
    if (reg.checkDud === 'Не отправлено' && (reg.rejectReason === 'Успешно' || reg.rejectReason === 'В работе')) {
      r.onCheckingCount++;
    }
    RegistrationService.calculateCheckedRegistrations(r);
  }

  getRegistrationsList(): Observable<RegistrationDetailed[]> {
    this.registrations$ = this.db.list<RegistrationDetailed>(this.basePath).valueChanges();
    return this.registrations$;
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

  private calculatePlan<T>(oList$: Observable<T[]>, namePPDFilterValue: FormControl, typeRDMS: string,
                           completing?: number[]): Observable<number> {
    const planFilterValue: FormControl = completing ? new FormControl(completing) : undefined;
    return  this.getFilteredList(oList$, new FormControl(), namePPDFilterValue, new FormControl(typeRDMS), planFilterValue).pipe(
      map(data => data.length)
    );
  }

  private getAllPlanCount<T>(oList$: Observable<T[]>, namePPDFilterValue: FormControl, typeRDMS: string) {
    return this.calculatePlan(oList$, namePPDFilterValue, typeRDMS);
  }

  private getCompletedPlanCount<T>(oList$: Observable<T[]>, namePPDFilterValue: FormControl, typeRDMS: string) {
    return this.calculatePlan(oList$, namePPDFilterValue, typeRDMS, [1]);
  }

  private getMayCompletedPlanCount<T>(oList$: Observable<T[]>, namePPDFilterValue: FormControl, typeRDMS: string) {
    return this.calculatePlan(oList$, namePPDFilterValue, typeRDMS, [1, 2]);
  }

  countPlan<T>(component, oList$: Observable<T[]>, namePPDFilterValue: FormControl) {
    component.aAllPlanCount$ = this.getAllPlanCount(oList$, namePPDFilterValue, 'A');
    component.bAllPlanCount$ = this.getAllPlanCount(oList$, namePPDFilterValue, 'B');
    component.aCompletedPlanCount$ = this.getCompletedPlanCount(oList$, namePPDFilterValue, 'A');
    component.bCompletedPlanCount$ = this.getCompletedPlanCount(oList$, namePPDFilterValue, 'B');
    component.aMayCompletedPlanCount$ = this.getMayCompletedPlanCount(oList$, namePPDFilterValue, 'A');
    component.bMayCompletedPlanCount$ = this.getMayCompletedPlanCount(oList$, namePPDFilterValue, 'B');
  }

  getDropdownList(): {item_id: number, item_text: string}[] {
    return [
      { item_id: 0, item_text: 'Без реєстрацій' },
      { item_id: 1, item_text: 'План виконано' },
      { item_id: 2, item_text: 'Можливе виконання' },
      { item_id: 3, item_text: 'До виконання <4' },
      { item_id: 4, item_text: 'Інші' }
    ];
  }

  getRegistrationFilter(component) {
    component.dropdownList = this.getDropdownList();
    component.registrationsFilterValue.setValue(component.dropdownList.map(value => value.item_id));
    component.namePPDList$ = this.getNamesPPD();
  }

  getStyle(rp: RegistrationRdms): {} {
    if (rp.isCompleted) {
      return {
        'background-color': 'green',
        color: 'white'
      };
    }
    if (rp.mayBeCompleted) {
      return {
        'background-color': 'orange',
        color: 'blue'
      };
    }
    if (rp.toMakeUnchecked <= 3 && rp.allCount !== 0) {
      return {
        'background-color': 'yellow',
        color: 'blue'
      };
    }
    if (rp.allCount === 0) {
      return {
        'background-color': 'red',
        color: 'white'
      };
    }
    return {};
  }

  getRegistrationsPlan(): Observable<RegistrationPlan[]> {
    const rPlans = this.db.list<RegistrationPlan>(this.planPath).valueChanges();
    const r = this.getRegistrationsMSISDN();
    const outlets = this.os.getOutletsList();
    this.registrationsPlan$ = combineLatest(rPlans, r, outlets).pipe(
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
        RegistrationService.calculateCheckedRegistrations(rPlan);
        return rPlan;
      })),
      map(data => data.sort(this.compareRegistrations())),
    );
    return this.registrationsPlan$;
  }

  getRegistrationsRDMS(): Observable<RegistrationRdms[]> {
    this.registrationsRDMS$ = this.getRegistrationsList().pipe(
      map(
        data => {
          const registrationRDMSMap = new Map<number, RegistrationRdms>();
          data.map(reg => {
            const r = new RegistrationRdms();
            if (!registrationRDMSMap.has(reg.codeRDMS)) {
              r.namePPD = reg.namePPD;
              r.codeRDMS = reg.codeRDMS;
              r.nameRDMS = reg.nameRDMS;
              r.addressRDMS = reg.addressRDMS;
              r.typeRDMS = reg.typeRDMS;
              registrationRDMSMap.set(reg.codeRDMS, r);
            }
            RegistrationService.countCheckedRegistrations(registrationRDMSMap.get(reg.codeRDMS), reg);
          });
          return Array.from(registrationRDMSMap.values());
        }
      ),
      map(data => data.sort(this.compareRegistrations())),
    );
    return this.registrationsRDMS$;
  }

  getRegistrationsMSISDN(): Observable<RegistrationMsisdn[]> {
    this.registrationsMSISDN$ = this.getRegistrationsList().pipe(
      map(
        data => {
          const registrationMSISDNMap = new Map<number, RegistrationMsisdn>();
          data.map(reg => {
            const rMsisdn = new RegistrationMsisdn();
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
            RegistrationService.countCheckedRegistrations(registrationMSISDNMap.get(reg.codeMSISDN), reg);
          });
          return Array.from(registrationMSISDNMap.values());
        }
      ),
      map(data => data.sort(this.compareRegistrations())),
    );
    return this.registrationsMSISDN$;
  }

  private compareRegistrations() {
    return (a, b) => {
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
    };
  }
}

