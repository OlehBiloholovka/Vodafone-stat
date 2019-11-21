import {AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {RegistrationService} from './shared/registration.service';
import {OutletService} from '../base/shared/outlet.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})
export class RegistrationsComponent implements OnInit, OnDestroy, AfterContentChecked {
  get inputFilterValue$(): string {
    return this._inputFilterValue$.getValue();
  }
  set inputFilterValue$(value: string) {
    this._inputFilterValue$.next(value);
  }
  get planFilterValue$(): number[] {
    return this._planFilterValue$.getValue();
  }
  set planFilterValue$(value: number[]) {
    this._planFilterValue$.next(value);
  }
  get typeRDMSFilterValue$(): string {
    return this._typeRDMSFilterValue$.getValue();
  }
  set typeRDMSFilterValue$(value: string) {
    this._typeRDMSFilterValue$.next(value);
  }
  get dateFilterValue$(): string {
    return this._dateFilterValue$.getValue();
  }
  set dateFilterValue$(value: string) {
    this._dateFilterValue$.next(value);
  }
  get namePPDFilterValue$(): string {
    return this._namePPDFilterValue$.getValue();
  }

  set namePPDFilterValue$(value: string) {
    this._namePPDFilterValue$.next(value);
  }
  // protected showPlanFilter$: Observable<boolean>;
  protected showPlanFilter$: BehaviorSubject<boolean>;
  protected datesList$: Observable<Date[]>;
  protected namePPDList$: Observable<string[]>;
  protected typeRDMSList: any[];
  protected registrationsFilterList: any[];
  // protected isSelectedDate$: Observable<boolean>;

  // tslint:disable-next-line:variable-name
  private _dateFilterValue$: BehaviorSubject<string> = this.rs.dateFilterValue$;
  // tslint:disable-next-line:variable-name
  private _namePPDFilterValue$: BehaviorSubject<string> = this.rs.namePPDFilterValue$;
  // tslint:disable-next-line:variable-name
  private _inputFilterValue$: BehaviorSubject<string> = this.rs.inputFilterValue$;
  // tslint:disable-next-line:variable-name
  private _typeRDMSFilterValue$: BehaviorSubject<string> = this.rs.typeRDMSFilterValue$;
  // tslint:disable-next-line:variable-name
  private _planFilterValue$: BehaviorSubject<number[]> = this.rs.planFilterValue$;

  constructor(private rs: RegistrationService, private os: OutletService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.showPlanFilter$ = this.rs._showPlanFilter$;
    this.datesList$ = this.rs.getDatesList();
    this.typeRDMSList = this.rs.getTypeRDMSList();
    this.registrationsFilterList = this.rs.getDropdownList();
    this.namePPDList$ = this.rs.namePPDList$;
  }

  ngOnDestroy(): void {
    this.dateFilterValue$ = '';
    this._inputFilterValue$.next('');
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
