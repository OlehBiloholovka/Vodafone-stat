import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetailedComponent} from './detailed/detailed.component';
import {RegistrationsListComponent} from './registrations/registrations-list/registrations-list.component';
import {RegistrationRdmsComponent} from './registrations/registration-rdms/registration-rdms.component';
import {RegistrationMsisdnComponent} from './registrations/registration-msisdn/registration-msisdn.component';
import {RegistrationPlanComponent} from './registrations/registration-plan/registration-plan.component';
import {BaseOutletsComponent} from './base/base-outlets/base-outlets.component';
import {LoginComponent} from './admin/login/login.component';
import {RegistrationsComponent} from './registrations/registrations.component';
import {RegistrationPprComponent} from './registrations/registration-ppr/registration-ppr.component';
import {RegistrationPartnerComponent} from './registrations/registration-partner/registration-partner.component';
import {SettingsPprComponent} from './admin/settings/settings-ppr/settings-ppr.component';

const routes: Routes = [
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
  {
    path: 'settings-ppr',
    component: SettingsPprComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
