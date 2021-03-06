import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
// import {MainNavComponent} from './main-nav/main-nav.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

export const routes: Routes = [
  // {
  //   path: 'regs',
  //   component: RegistrationsComponent,
  //   ...canActivate(redirectUnauthorizedTo(['login-new'])),
  //   children: [
  //     {
  //       path: 'ppr',
  //       component: RegistrationPprComponent,
  //     },
  //     {
  //       path: 'partner',
  //       component: RegistrationPartnerComponent,
  //     },
  //     {
  //       path: 'rdms',
  //       component: RegistrationRdmsComponent,
  //     },
  //     {
  //       path: 'detailed',
  //       component: DetailedComponent,
  //     },
  //     {
  //       path: 'registrations',
  //       component: RegistrationsListComponent,
  //     },
  //     {
  //       path: 'registrations/:id',
  //       component: RegistrationsListComponent,
  //     },
  //     {
  //       path: 'msisdn',
  //       component: RegistrationMsisdnComponent,
  //     },
  //     {
  //       path: 'plan',
  //       component: RegistrationPlanComponent,
  //     },
  //     {
  //       path: 'outlets',
  //       component: BaseOutletsComponent,
  //     },
  //     {
  //       path: '',
  //       redirectTo: 'rdms',
  //       pathMatch: 'full'
  //     }
  //   ],
  // },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent
  // },
  // {
  //   path: 'address',
  //   component: AddressComponent
  // },
  // {
  //   path: 'table',
  //   component: TableComponent
  // },
  // {
  //   path: 'settings-ppr',
  //   component: SettingsPprComponent,
  // },
  {
    path: 'login',
    loadChildren: './authentication/authentication.module#AuthenticationModule',
    // ...canActivate(redirectLoggedInToHome),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome},
    runGuardsAndResolvers: 'always'
  },
  {
    path: '',
    loadChildren: './main-nav/main-nav.module#MainNavModule',
    // ...canActivate(redirectUnauthorizedToLogin),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin},
    runGuardsAndResolvers: 'always',
    // component: MainNavComponent,
  },
  {
    path: '**',
    loadChildren: './main-nav/main-nav.module#MainNavModule',
    // ...canActivate(redirectUnauthorizedToLogin),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin},
    runGuardsAndResolvers: 'always',
    // component: MainNavComponent,
  },
];

// export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
