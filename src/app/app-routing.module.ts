import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetailedComponent} from './detailed/detailed.component';
import {RegistrationsListComponent} from './registrations/registrations-list/registrations-list.component';

const routes: Routes = [
  {
    path: 'detailed',
    component: DetailedComponent,
  },
  {
    path: 'registrations',
    component: RegistrationsListComponent,
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
