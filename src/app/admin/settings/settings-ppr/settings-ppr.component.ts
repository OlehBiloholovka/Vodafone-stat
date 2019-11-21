import {Component, OnInit} from '@angular/core';
import {RegistrationService} from '../../../registrations/shared/registration.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Outlet} from '../../../base/shared/outlet';

@Component({
  selector: 'app-settings-ppr',
  templateUrl: './settings-ppr.component.html',
  styleUrls: ['./settings-ppr.component.css']
})
export class SettingsPprComponent implements OnInit {
  get dateFilterValue$(): string {
    return this._dateFilterValue$.getValue();
  }
  set dateFilterValue$(value: string) {
    this._dateFilterValue$.next(value);
  }
  protected datesList$: Observable<Date[]>;
  // tslint:disable-next-line:variable-name
  private _dateFilterValue$: BehaviorSubject<string> = this.rs.dateFilterValue$;

  private outletsPPR$: Observable<Outlet[]>;
  statusPPR: {text: string, value: number}[] = [{text: 'ППР', value: 5},
    {text: '50%', value: 10},
    {text: '100%', value: 20}];

  constructor(private rs: RegistrationService) { }

  ngOnInit() {
    this.datesList$ = this.rs.getDatesList();
    this._dateFilterValue$.subscribe();
    // const now = new Date();
    // this.rs.dateFilterValue$.next(now.getMonth() + 1 + '_' + now.getFullYear());
    this.outletsPPR$ = this.rs.outletsPPR$;
  }

  updatePPR(outlet: Outlet ): void {
    this.rs.updatePPR(outlet.codeRDMS, outlet.typePPR);
  }
}
