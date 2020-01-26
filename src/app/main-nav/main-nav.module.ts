import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainNavRoutingModule } from './main-nav-routing.module';
import {MainNavComponent} from './main-nav.component';
import {
  MatButtonModule, MatCardModule,
  MatFormFieldModule, MatGridListModule,
  MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatPaginatorModule, MatRadioModule,
  MatSelectModule,
  MatSidenavModule, MatSortModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {RegistrationsComponent} from '../registrations/registrations.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistrationPprComponent} from '../registrations/registration-ppr/registration-ppr.component';
import {RegistrationPartnerComponent} from '../registrations/registration-partner/registration-partner.component';
import {RegistrationRdmsComponent} from '../registrations/registration-rdms/registration-rdms.component';
import {DetailedComponent} from '../detailed/detailed.component';
import {RegistrationsListComponent} from '../registrations/registrations-list/registrations-list.component';
import {RegistrationMsisdnComponent} from '../registrations/registration-msisdn/registration-msisdn.component';
import {RegistrationPlanComponent} from '../registrations/registration-plan/registration-plan.component';
import {BaseOutletsComponent} from '../base/base-outlets/base-outlets.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {AddressComponent} from '../address/address.component';
import {TableComponent} from '../table/table.component';
import {SettingsPprComponent} from '../admin/settings/settings-ppr/settings-ppr.component';
import {Ppr1Component} from '../test/ppr1/ppr1.component';


@NgModule({
  declarations: [
    MainNavComponent,
    RegistrationsComponent,
    RegistrationPprComponent,
    RegistrationPartnerComponent,
    RegistrationRdmsComponent,
    DetailedComponent,
    RegistrationsListComponent,
    RegistrationMsisdnComponent,
    RegistrationPlanComponent,
    BaseOutletsComponent,
    DashboardComponent,
    AddressComponent,
    TableComponent,
    SettingsPprComponent,
    Ppr1Component
  ],
  imports: [
    CommonModule,
    MainNavRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule,
    MatMenuModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule
  ],
  exports: [MainNavComponent]
})
export class MainNavModule { }
