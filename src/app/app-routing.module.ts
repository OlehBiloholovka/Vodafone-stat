import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetailedComponent} from './detailed/detailed.component';
import {RegistrationsListComponent} from './registrations/registrations-list/registrations-list.component';
import {RegistrationRdmsComponent} from './registrations/registration-rdms/registration-rdms.component';
import {RegistrationMsisdnComponent} from './registrations/registration-msisdn/registration-msisdn.component';
import {RegistrationPlanComponent} from './registrations/registration-plan/registration-plan.component';
import {BaseOutletsComponent} from './base/base-outlets/base-outlets.component';

const routes: Routes = [
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
    path: 'rdms',
    component: RegistrationRdmsComponent,
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
