import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationsComponent} from '../registrations/registrations.component';
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
import {MainNavComponent} from './main-nav.component';


const routes: Routes = [
  {
    path: '',
    component: MainNavComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'address',
        component: AddressComponent
      },
      {
        path: 'table',
        component: TableComponent
      },
      {
        path: 'settings-ppr',
        component: SettingsPprComponent,
      },
      {
        path: 'regs',
        component: RegistrationsComponent,
        children: [
          {
            path: 'ppr',
            component: RegistrationPprComponent,
          },
          {
            path: 'partner',
            component: RegistrationPartnerComponent,
          },
          {
            path: 'rdms',
            component: RegistrationRdmsComponent,
          },
          {
            path: 'detailed',
            component: DetailedComponent,
          },
          {
            path: 'registrations',
            component: RegistrationsListComponent,
          },
          {
            path: 'registrations/:id',
            component: RegistrationsListComponent,
          },
          {
            path: 'msisdn',
            component: RegistrationMsisdnComponent,
          },
          {
            path: 'plan',
            component: RegistrationPlanComponent,
          },
          {
            path: 'outlets',
            component: BaseOutletsComponent,
          },
          {
            path: '',
            redirectTo: 'rdms',
            pathMatch: 'full'
          }
        ],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainNavRoutingModule { }
