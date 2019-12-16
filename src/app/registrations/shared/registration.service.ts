import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {RegistrationDetailed} from './registration-detailed';
import {RegistrationRDMS} from './registration-rdms';
import {RegistrationMSISDN} from './registration-msisdn';
import {RegistrationPlan} from './registration-plan';
import {map, switchMap} from 'rxjs/operators';
import {Outlet} from '../../base/shared/outlet';
import {Partner} from './partner';
import {RDMS} from './RDMS';
import {TypePPR} from './type-ppr.enum';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  get rdmsPPRList$(): AngularFireList<any> {
    let query;
    if (!this.dateFilterValue$.getValue()) {query = (ref) => ref.child(this.dateFilterValue$.getValue()); }
    console.log(this.dateFilterValue$.getValue());
    console.log(query);
    this._rdmsPPRList$ = this.db.list<any>(this.pprPath, query);
    // this._rdmsPPRList$ = this.db.list<any>(this.pprPath, ref => ref.child(this.dateFilterValue$.getValue()));
    return this._rdmsPPRList$;
  }
  set showPlanFilter$(value: boolean) {
    this._showPlanFilter$.next(value);
  }
  get planFilterValue$(): BehaviorSubject<number[]> {
    return this._planFilterValue$;
  }
  get typeRDMSFilterValue$(): BehaviorSubject<string> {
    return this._typeRDMSFilterValue$;
  }
  get namePPDFilterValue$(): BehaviorSubject<string> {
    return this._namePPDFilterValue$;
  }
  get dateFilterValue$(): BehaviorSubject<string> {
    return this._dateFilterValue$;
  }
  get inputFilterValue$(): BehaviorSubject<string> {
    return this._inputFilterValue$;
  }
  get outletsPPR$(): Observable<Outlet[]> {
    if (this._outletsPPR$) { return this._outletsPPR$; }
    const rdmsPPR$ = this.rdmsPPRList$.valueChanges();
    this._outletsPPR$ = combineLatest(this.outlets$, rdmsPPR$)
      .pipe(
        map(([out, ppr]) => out
          .filter(value => value.salesChannel === 'Дистрибьютор' && (value.typeRDMS.startsWith('A') || value.PPR === 'ДА'))
          .map(value => {
            const outlet: Outlet = Object.assign(value, ppr.find(v => v.codeRDMS === value.codeRDMS));
            if (!outlet.typePPR) { outlet.typePPR = TypePPR.PPR; }
            return outlet;
          }))
      );
    // this._outletsPPR$ = this.outlets$.pipe(
    //   map(data => data
    //     .filter(value => value.salesChannel === 'Дистрибьютор' && value.PPR === 'ДА')
    //     .map(value => {
    //       value.typePPR = TypePPR.PPR;
    //       return value;
    //     })),
    // );
    return this._outletsPPR$;
  }
  // filterList<T>(oList: Observable<T[]>): Observable<T[]> {
  //   return combineLatest(oList, this._namePPDFilterValue$, this._typeRDMSFilterValue$,
  //     this._inputFilterValue$, this._planFilterValue$)
  //     .pipe(
  //       map(([regs, namePPDValue, typeRDMSValue, inputValue, planValue]) =>
  //         regs
  //           .filter(value => value[this.namePPDPropertyName].indexOf(namePPDValue) !== -1)
  //           .filter(value => value[this.typeRDMSPropertyName].charAt(0).indexOf(typeRDMSValue) !== -1)
  //           .filter(value => JSON.stringify(value).toLowerCase().indexOf(inputValue.toLowerCase()) !== -1)
  //           .filter(value => this.filterPlan(value, planValue)))
  //     );
  // }
  get filteredRegistrationsPartner$(): Observable<RegistrationRDMS[]> {
    if (this._filteredRegistrationsPartner$) { return this._filteredRegistrationsPartner$; }
    this._filteredRegistrationsPartner$ = this.filterList(this.registrationsPartner$);
    return this._filteredRegistrationsPartner$;
  }
  get registrationsPartner$(): Observable<RegistrationRDMS[]> {
    if (this._registrationsPartner$) { return this._registrationsPartner$; }
    this._registrationsPartner$ = this.combineRegistrations1(false, this.outlets$.pipe(
      map(data => data.filter(value => value.salesChannel === 'Дистрибьютор' &&
        !this.notPartnerTypesRDMS.includes(value.typeRDMS.substr(0, 2)) &&
        !value.typeRDMS.endsWith('0')))
    ), 3);
    return this._registrationsPartner$;
  }
  get filteredRegistrationsPPR$(): Observable<RegistrationRDMS[]> {
    if (this._filteredRegistrationsPPR$) { return this._filteredRegistrationsPPR$; }
    this._filteredRegistrationsPPR$ = this.filterList(this.registrationsPPR$);
    return this._filteredRegistrationsPPR$;
  }
  get registrationsPPR$(): Observable<RegistrationRDMS[]> {
    if (this._registrationsPPR$) { return this._registrationsPPR$; }
    this._registrationsPPR$ = this.combineRegistrations1(false, this.outletsPPR$);
    return this._registrationsPPR$;
  }
  get filteredRegistrationsPlan$(): Observable<RegistrationPlan[]> {
    if (this._filteredRegistrationsPlan$) { return this._filteredRegistrationsPlan$; }
    this._filteredRegistrationsPlan$ = this.filterList(this.registrationsPlan$);
    return this._filteredRegistrationsPlan$;
  }
  get registrationsPlan$(): Observable<RegistrationPlan[]> {
    if (this._registrationsPlan$) { return this._registrationsPlan$; }
    this._registrationsPlan$ = this.getRegistrationsPlan();
    return this._registrationsPlan$;
  }
  get filteredPartners$(): Observable<Partner[]> {
    if (this._filteredPartners$) { return this._filteredPartners$; }
    this._filteredPartners$ = this.filterList(this.partners$);
    return this._filteredPartners$;
  }
  get partners$(): Observable<Partner[]> {
    if (this._partners$) { return this._partners$; }
    this._partners$ = this.getList(this.partnerPath);
    return this._partners$;
  }
  get filteredRegistrationsMSISDN$(): Observable<RegistrationMSISDN[]> {
    if (this._filteredRegistrationsMSISDN$) { return this._filteredRegistrationsMSISDN$; }
    this._filteredRegistrationsMSISDN$ = this.filterList(this.registrationsMSISDN$);
    return this._filteredRegistrationsMSISDN$;
  }
  get registrationsMSISDN$(): Observable<RegistrationMSISDN[]> {
    if (this._registrationsMSISDN$) { return this._registrationsMSISDN$; }
    this._registrationsMSISDN$ = this.combineRegistrations(true) as Observable<RegistrationMSISDN[]>;
    return this._registrationsMSISDN$;
  }
  get filteredRegistrationsRDMS$(): Observable<RegistrationRDMS[]> {
    if (this._filteredRegistrationsRDMS$) { return this._filteredRegistrationsRDMS$; }
    this._filteredRegistrationsRDMS$ = this.filterList(this.registrationsRDMS$);
    return this._filteredRegistrationsRDMS$;
  }
  get registrationsRDMS$(): Observable<RegistrationRDMS[]> {
    if (this._registrationsRDMS$) { return this._registrationsRDMS$; }
    this._registrationsRDMS$ = this.combineRegistrations(false);
    return this._registrationsRDMS$;
  }
  get filteredRegistrationsDetailed$(): Observable<RegistrationDetailed[]> {
    if (this._filteredRegistrationsDetailed$) { return this._filteredRegistrationsDetailed$; }
    this._filteredRegistrationsDetailed$ = this.filterList(this.registrationsDetailed$);
    return this._filteredRegistrationsDetailed$;
  }
  get registrationsDetailed$(): Observable<RegistrationDetailed[]> {
    if (this._registrationsDetailed$) { return this._registrationsDetailed$; }
    this._registrationsDetailed$ = this.getList(this.detailedPath);
    return this._registrationsDetailed$;
  }
  get filteredOutlets$(): Observable<Outlet[]> {
    if (this._filteredOutlets$) { return this._filteredOutlets$; }
    this._filteredOutlets$ = this.filterList(this.outlets$);
    return this._filteredOutlets$;
  }
  get outlets$(): Observable<Outlet[]> {
    if (this._outlets$) { return this._outlets$; }
    this._outlets$ = this.getList(this.outletsPath);
    return this._outlets$;
  }
  get namePPDList$(): Observable<string[]> {
    if (this._namePPDList$) { return this._namePPDList$; }
    this._namePPDList$ = this._dateFilterValue$.pipe(
      switchMap(datePath => {
        if (!datePath) { return new Array<string[]>(1); }
        return this.db.list<Outlet>(this.outletsPath, ref => ref.child(datePath))
          .valueChanges()
          .pipe(map(
            data => data
              .map(value => value.namePPD)
              .filter((v, i, s) => s.indexOf(v) === i)
          ));
      }),
      map(data => data.sort())
    );
    return this._namePPDList$;
  }

  constructor(private db: AngularFireDatabase) {
  }

  private detailedPath = '1Qqm9ql9vdEIGM-FTVjN5lGzuefb0aPedKQTv3rZQrOM';
  private outletsPath = '1hhz_gZV0pu0tQir8M66E_hqOsQcQnGciaeuKsEP2mXE';
  private partnerPath = '1KBVOVxRdgSfhWJyYewoZUMOmZgQBsOBCjXQ4mfpBpqg';
  private planPath = '1RE-TyrVztwTAl3dePbnNjWtscclkinRDCQ-bhI1Hkc4';
  private pprPath = 'ppr';
  // private planPath1 = '1RE-TyrVztwTAl3dePbnNjWtscclkinRDCQ-bhI1Hkc4/Plan092019';

  private namePPDPropertyName = 'namePPD';
  private typeRDMSPropertyName = 'typeRDMS';
  private codeRDMSPropertyName = 'codeRDMS';
  private codeMSISDNPropertyName = 'codeMSISDN';
  private allCountPropertyName = 'allCount';
  private isCompletedPropertyName = 'isCompleted';
  private mayBeCompletedPropertyName = 'mayBeCompleted';
  private toMakeUncheckedPropertyName = 'toMakeUnchecked';
  private pprPropertyName = 'PPR';

  // tslint:disable-next-line:variable-name
  private _outlets$: Observable<Outlet[]>;
  // tslint:disable-next-line:variable-name
  private _filteredOutlets$: Observable<Outlet[]>;
  // tslint:disable-next-line:variable-name
  private _registrationsDetailed$: Observable<RegistrationDetailed[]>;
  // tslint:disable-next-line:variable-name
  private _filteredRegistrationsDetailed$: Observable<RegistrationDetailed[]>;
  // tslint:disable-next-line:variable-name
  private _registrationsRDMS$: Observable<RegistrationRDMS[]>;
  // tslint:disable-next-line:variable-name
  private _filteredRegistrationsRDMS$: Observable<RegistrationRDMS[]>;
  // tslint:disable-next-line:variable-name
  private _registrationsMSISDN$: Observable<RegistrationMSISDN[]>;
  // tslint:disable-next-line:variable-name
  private _filteredRegistrationsMSISDN$: Observable<RegistrationMSISDN[]>;
  // tslint:disable-next-line:variable-name
  private _partners$: Observable<Partner[]>;
  // tslint:disable-next-line:variable-name
  private _filteredPartners$: Observable<Partner[]>;
  // tslint:disable-next-line:variable-name
  private _registrationsPlan$: Observable<RegistrationPlan[]>;
  // tslint:disable-next-line:variable-name
  private _filteredRegistrationsPlan$: Observable<RegistrationPlan[]>;
  // tslint:disable-next-line:variable-name
  private _registrationsPPR$: Observable<RegistrationRDMS[]>;
  // tslint:disable-next-line:variable-name
  private _filteredRegistrationsPPR$: Observable<RegistrationRDMS[]>;
  // tslint:disable-next-line:variable-name
  private _registrationsPartner$: Observable<RegistrationRDMS[]>;
  // tslint:disable-next-line:variable-name
  private _filteredRegistrationsPartner$: Observable<RegistrationRDMS[]>;
  // tslint:disable-next-line:variable-name
  private _outletsPPR$: Observable<Outlet[]>;
  // tslint:disable-next-line:variable-name
  // private _filteredOutletsPPR: Observable<Outlet[]>;
  // tslint:disable-next-line:variable-name
  private _rdmsPPRList$: AngularFireList<any[]>;

  // tslint:disable-next-line:variable-name
  private _dateFilterValue$: BehaviorSubject<string> = new BehaviorSubject(' ');
  // tslint:disable-next-line:variable-name
  private _namePPDFilterValue$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  // tslint:disable-next-line:variable-name
  private _typeRDMSFilterValue$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  // tslint:disable-next-line:variable-name
  private _inputFilterValue$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  // tslint:disable-next-line:variable-name
  private _planFilterValue$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([-1]);

  // tslint:disable-next-line:variable-name
  _showPlanFilter$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // tslint:disable-next-line:variable-name
  private _namePPDList$: Observable<string[]>;

  public notPartnerTypesRDMS: string[] = ['АА', 'AB', 'AC', 'AF', 'AN', 'BC', 'BE', 'BT'];


  private static calculateCheckedRegistrations<T extends RegistrationRDMS>(r: T) {
    r.toMake = r.getToMake();
    r.toMakeUnchecked = r.getToMakeUnchecked();
    r.isCompleted = r.getIsCompleted();
    r.mayBeCompleted = r.getMayBeCompleted();
  }

  private static countCheckedRegistrations<T extends RegistrationRDMS>(r: T, reg: RegistrationDetailed) {
    r.allCount++;
    if (reg.checkDud === 'Ок') {
      r.checkedDudCount++;
    }
    if ((reg.checkDud === 'Не отправлено' || reg.checkDud === 'В процессе проверки')
      && (reg.rejectReason === 'Успешно' || reg.rejectReason === 'В работе')) {
      r.onCheckingCount++;
    }
    RegistrationService.calculateCheckedRegistrations(r);
  }

  getPPR(): AngularFireList<any> {
    let query;
    if (!this.dateFilterValue$.getValue()) {query = (ref) => ref.child(this.dateFilterValue$.getValue()); }
    this._rdmsPPRList$ = this.db.list<any>(this.pprPath, query);
    return this._rdmsPPRList$;
  }

  getDatesList(): Observable<Date[]> {
    return this.db.list<RegistrationDetailed>(this.detailedPath)
      .snapshotChanges().pipe(
        map(data => data
          .map(value => {
      const dateArray: any[] = value.key.split('_');
      return new Date(dateArray[1], dateArray[0] - 1);
          }).sort((a, b) => b.valueOf() - a.valueOf())
        )
      );
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

  getTypeRDMSList(): {value: string, value_text: string}[] {
    return [
      {value: '', value_text: 'A/B'},
      {value: 'A', value_text: 'A'},
      {value: 'B', value_text: 'B'},
      // {value: 'other', value_text: 'Other'},
      // {value: '', value_text: 'All'}
    ];
  }

  private getList<T>(path: string): Observable<T[]> {
    return this._dateFilterValue$.pipe(
      switchMap(datePath => {
        // if (!datePath) { return new Array<T[]>(1); }
        if (!datePath) { return new BehaviorSubject<T[]>(new Array<T>()); }
        return this.db.list<T>(path, ref => ref.child(datePath)).valueChanges();
      })
    );
  }

  updatePPR(key: number, value: any) {
    this.rdmsPPRList$.update(key.toString(), {codeRDMS: key, typePPR: value}).catch(console.log);
  }

  // getFilterValues(propertyName: string): Observable<RegistrationRDMS[]> {
  //   return this.getRegistrationsRDMS().pipe(
  //     map(data => data.filter((obj, pos, arr) => {
  //       return arr.map(mo => mo[propertyName]).indexOf(obj[propertyName]) === pos;
  //     }))
  //   );
  // }

  // getNamesPPD(): Observable<RegistrationRDMS[]> {
  //   return this.getFilterValues(this.namePPDPropertyName);
  // }
  //
  // getFilteredList<T>(oList: Observable<T[]>, inputFilterValue: FormControl,
  //                    namePPDFilterValue: FormControl, typeRDMSFilterValue$: FormControl,
  //                    planFilterValue$: FormControl = new FormControl([-1])): Observable<T[]> {
  //   const inputFilter$ = inputFilterValue.valueChanges.pipe(startWith(inputFilterValue.value ? inputFilterValue.value : ''));
  //   const namePPDFilter$ = namePPDFilterValue.valueChanges.pipe(startWith(namePPDFilterValue.value));
  //   const typeRDMSFilter$ = typeRDMSFilterValue$.valueChanges.pipe(startWith(typeRDMSFilterValue$.value));
  //   const planFilter$: Observable<number[]> = planFilterValue$.valueChanges.pipe(startWith(planFilterValue$.value));
  //   return combineLatest(oList, namePPDFilter$, typeRDMSFilter$, inputFilter$, planFilter$).pipe(
  //     map(([regs, namePPDValue, typeRDMSValue, inputValue, planValue]) => regs
  //       .filter(value => value[this.namePPDPropertyName].indexOf(namePPDValue) !== -1)
  //       .filter(value => value[this.typeRDMSPropertyName].charAt(0).indexOf(typeRDMSValue) !== -1)
  //       .filter(value => JSON.stringify(value).toLowerCase().indexOf(inputValue.toLowerCase()) !== -1)
  //       .filter(value => this.filterPlan(value, planValue)))
  //   );
  // }

  getFilteredByNamePPDList<T>(oList: Observable<T[]>): Observable<T[]> {
    return combineLatest(oList, this._namePPDFilterValue$)
      .pipe(
        map(([regs, namePPDValue]) => regs
          .filter(value => value[this.namePPDPropertyName].indexOf(namePPDValue) !== -1))
      );
  }

  filterList<T>(oList: Observable<T[]>): Observable<T[]> {
    return combineLatest(oList, this._namePPDFilterValue$, this._typeRDMSFilterValue$,
      this._inputFilterValue$, this._planFilterValue$)
      .pipe(
        map(([regs, namePPDValue, typeRDMSValue, inputValue, planValue]) =>
          regs
            .filter(value => value[this.namePPDPropertyName].indexOf(namePPDValue) !== -1)
            .filter(value => value[this.typeRDMSPropertyName].charAt(0).indexOf(typeRDMSValue) !== -1)
            .filter(value => JSON.stringify(value).toLowerCase().indexOf(inputValue.toLowerCase()) !== -1)
            .filter(value => this.filterPlan(value, planValue)))
      );
  }

  private filterPlan(value, planValue: number[]) {
    if (!planValue || planValue.includes(-1)) {
      return true;
    }
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
  }

  // private calculatePlan<T>(oList$: Observable<T[]>, namePPDFilterValue: FormControl, typeRDMS: string,
  //                          completing?: number[]): Observable<number> {
  //   const planFilterValue$: FormControl = completing ? new FormControl(completing) : undefined;
  //   return  this.getFilteredList(oList$, new FormControl(), namePPDFilterValue, new FormControl(typeRDMS), planFilterValue$).pipe(
  //     map(data => data.length)
  //   );
  // }

  private calculatePlan1<T>(oList$: Observable<T[]>, typeRDMSValue: string, completing?: number[]): Observable<number> {
    return this.getFilteredByNamePPDList(oList$).pipe(
      map(data => data
        .filter(value => value[this.typeRDMSPropertyName].charAt(0).indexOf(typeRDMSValue) !== -1)
        .filter(value => this.filterPlan(value, completing))),
      map(data => data.length)
    );
  }

  private getAllPlanCount1<T>(oList$: Observable<T[]>, typeRDMS: string) {
    return this.calculatePlan1(oList$, typeRDMS);
  }

  private getCompletedPlanCount1<T>(oList$: Observable<T[]>, typeRDMS: string) {
    return this.calculatePlan1(oList$, typeRDMS, [1]);
  }

  private getMayCompletedPlanCount1<T>(oList$: Observable<T[]>, typeRDMS: string) {
    return this.calculatePlan1(oList$, typeRDMS, [1, 2]);
  }

  countPlan1<T>(component, oList$: Observable<T[]>) {
    component.aAllPlanCount$ = this.getAllPlanCount1(oList$, 'A');
    component.bAllPlanCount$ = this.getAllPlanCount1(oList$, 'B');
    component.aCompletedPlanCount$ = this.getCompletedPlanCount1(oList$, 'A');
    component.bCompletedPlanCount$ = this.getCompletedPlanCount1(oList$, 'B');
    component.aMayCompletedPlanCount$ = this.getMayCompletedPlanCount1(oList$, 'A');
    component.bMayCompletedPlanCount$ = this.getMayCompletedPlanCount1(oList$, 'B');
  }

  // private getAllPlanCount<T>(oList$: Observable<T[]>, namePPDFilterValue: FormControl, typeRDMS: string) {
  //   return this.calculatePlan(oList$, namePPDFilterValue, typeRDMS);
  // }
  //
  // private getCompletedPlanCount<T>(oList$: Observable<T[]>, namePPDFilterValue: FormControl, typeRDMS: string) {
  //   return this.calculatePlan(oList$, namePPDFilterValue, typeRDMS, [1]);
  // }
  //
  // private getMayCompletedPlanCount<T>(oList$: Observable<T[]>, namePPDFilterValue: FormControl, typeRDMS: string) {
  //   return this.calculatePlan(oList$, namePPDFilterValue, typeRDMS, [1, 2]);
  // }
  //
  // countPlan<T>(component, oList$: Observable<T[]>, namePPDFilterValue: FormControl) {
  //   component.aAllPlanCount$ = this.getAllPlanCount(oList$, namePPDFilterValue, 'A');
  //   component.bAllPlanCount$ = this.getAllPlanCount(oList$, namePPDFilterValue, 'B');
  //   component.aCompletedPlanCount$ = this.getCompletedPlanCount(oList$, namePPDFilterValue, 'A');
  //   component.bCompletedPlanCount$ = this.getCompletedPlanCount(oList$, namePPDFilterValue, 'B');
  //   component.aMayCompletedPlanCount$ = this.getMayCompletedPlanCount(oList$, namePPDFilterValue, 'A');
  //   component.bMayCompletedPlanCount$ = this.getMayCompletedPlanCount(oList$, namePPDFilterValue, 'B');
  // }
  //
  // getRegistrationFilter(component) {
  //   component.dropdownList = this.getDropdownList();
  //   component.registrationsFilterValue.setValue(component.dropdownList.map(value => value.item_id));
  //   component.namePPDList$ = this.getNamesPPD();
  // }

  getStyle(rp: RegistrationRDMS): {} {
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

  // getRegistrationsPlan(): Observable<RegistrationPlan[]> {
  //   const rPlans = this.db.list<RegistrationPlan>(this.planPath1).valueChanges();
  //   this._registrationsPlan$ = combineLatest(rPlans, this.registrationsMSISDN$, this.outlets$).pipe(
  //     map(([rp, rm, ol]) => rp.map(p => {
  //       const rPlan: RegistrationPlan = Object
  //         .assign(new RegistrationPlan(), p, rm.find(m => p.codeMSISDN === m.codeMSISDN),
  //           ol.find(o => p.codeRDMS === o.codeRDMS));
  //       if (!rPlan.typeRDMS) { rPlan.typeRDMS = ''; }
  //       rPlan.plan = p.plan;
  //       RegistrationService.calculateCheckedRegistrations(rPlan);
  //       return rPlan;
  //     })),
  //     map(data => data.sort(this.compareRegistrations())),
  //   );
  //   return this._registrationsPlan$;
  // }

  private getRegistrationsPlan(): Observable<RegistrationPlan[]> {
    return  combineLatest(this.getList<RegistrationPlan>(this.planPath),
        this.registrationsMSISDN$, this.outlets$).pipe(
        map(([rp, rm, ol]) => rp.map(p => {
          const rPlan: RegistrationPlan = Object
            .assign(new RegistrationPlan(), p, rm.find(m => p.codeMSISDN === m.codeMSISDN),
              ol.find(o => p.codeRDMS === o.codeRDMS));
          if (!rPlan.typeRDMS) { rPlan.typeRDMS = ''; }
          rPlan.plan = p.plan;
          RegistrationService.calculateCheckedRegistrations(rPlan);
          return rPlan;
        })),
        map(data => data.sort(this.compareRegistrations())),
      );
  }

  private combineRegistrations(isMSISDN: boolean): Observable<RegistrationRDMS[]> {
    const regProperty: string = isMSISDN ? this.codeMSISDNPropertyName : this.codeRDMSPropertyName;
    const mainList$: Observable<any> = isMSISDN
      ? this.partners$.pipe(
        map(data => data.filter(value => value.category === '2 - продавец розн. сети'))
      )
      : this.outlets$.pipe(
        map(data => data.filter(value => value.salesChannel === 'Дистрибьютор'))
      );
    return combineLatest(mainList$, this.groupRegistrations(isMSISDN)).pipe(
      map(([ol, rm]) => ol.map(o => {
        const registration: RegistrationRDMS = Object
          .assign(isMSISDN ? new RegistrationMSISDN() : new RegistrationRDMS(),
            o, rm.find(m => o[regProperty] === m[regProperty]));
        RegistrationService.calculateCheckedRegistrations(registration);
        return registration;
      })),
      map(data => data.sort(this.compareRegistrations()))
    );
  }

  private combineRegistrations1<T extends RDMS>(isMSISDN: boolean, mainList$: Observable<T[]>,
                                                plan?: number): Observable<RegistrationRDMS[]> {
    const regProperty: string = isMSISDN ? this.codeMSISDNPropertyName : this.codeRDMSPropertyName;
    return combineLatest(mainList$, this.groupRegistrations(isMSISDN)).pipe(
      map(([ol, rm]) => ol.map(o => {
        const registration: RegistrationRDMS = Object
          .assign(isMSISDN ? new RegistrationMSISDN() : new RegistrationRDMS(),
            o, rm.find(m => o[regProperty] === m[regProperty]));
        if (plan) { registration.plan = plan; }
        if (o[this.pprPropertyName] === 'ДА') { registration.isInPPR = true; }
        registration.namePPD = o.namePPD;
        // if (o['typePPR']) {
        //   console.log(o['typePPR']);
        //   registration.plan = o['typePPR'];
        // }
        RegistrationService.calculateCheckedRegistrations(registration);
        return registration;
      })),
      map(data => data.sort(this.compareRegistrations()))
    );
  }

  private groupRegistrations(isMSISDN: boolean): Observable<RegistrationRDMS[]> {
    return  this.registrationsDetailed$.pipe(
      map(data => {
        const registrationsMap = new Map<number, RegistrationRDMS>();
        data.map(reg => {
          let registration: RegistrationRDMS;
          let code: number;
          if (isMSISDN) {
            registration = new RegistrationMSISDN();
            code = reg.codeMSISDN;
          } else {
            registration = new RegistrationRDMS();
            code = reg.codeRDMS;
          }
          if (!registrationsMap.has(code)) {
            registration.namePPD = reg.namePPD;
            registration.codeRDMS = reg.codeRDMS;
            registration.nameRDMS = reg.nameRDMS;
            registration.addressRDMS = reg.addressRDMS;
            registration.typeRDMS = reg.typeRDMS;
            if (registration instanceof RegistrationMSISDN) {
              registration.codeMSISDN = reg.codeMSISDN;
              registration.nameSeller = reg.nameSeller;
            }
            registrationsMap.set(code, registration);
          }
          RegistrationService.countCheckedRegistrations(registrationsMap.get(code), reg);
        });
        return Array.from(registrationsMap.values());
      }));
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

