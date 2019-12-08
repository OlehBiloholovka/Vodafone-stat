import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { DetailedComponent } from './detailed/detailed.component';
import {AppRoutingModule} from './app-routing.module';
import { RegistrationsListComponent } from './registrations/registrations-list/registrations-list.component';
import { RegistrationDetailComponent } from './registrations/registration-detail/registration-detail.component';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { RegistrationRdmsComponent } from './registrations/registration-rdms/registration-rdms.component';
import { RegistrationMsisdnComponent } from './registrations/registration-msisdn/registration-msisdn.component';
import { RegistrationPlanComponent } from './registrations/registration-plan/registration-plan.component';
import { BaseOutletsComponent } from './base/base-outlets/base-outlets.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './admin/login/login.component';
import { RegistrationsComponent } from './registrations/registrations.component';
import { RegistrationPprComponent } from './registrations/registration-ppr/registration-ppr.component';
import { RegistrationPartnerComponent } from './registrations/registration-partner/registration-partner.component';
import { SettingsPprComponent } from './admin/settings/settings-ppr/settings-ppr.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule, MatSnackBarModule,
  MatTableModule
} from '@angular/material';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AddressComponent } from './address/address.component';
import { MatInputModule } from '@angular/material/input';
import { TableComponent } from './table/table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {firebase, firebaseui, FirebaseUIModule} from 'firebaseui-angular';
import { ProgressDialogComponent } from './progress-dialog/progress-dialog.component';
// import {AppRoutingModule} from './app-routing/app-routing.module';
// import {HttpClientModule} from '@angular/common/http';
// import {FormsModule} from '@angular/forms';

const firebaseConfig = {
  apiKey: 'AIzaSyC5ulhATzKVGGf7rTx6OuFimM5J8bwTI1I',
  authDomain: 'vodafone-stat.firebaseapp.com',
  databaseURL: 'https://vodafone-stat.firebaseio.com',
  projectId: 'vodafone-stat',
  storageBucket: 'vodafone-stat.appspot.com',
  messagingSenderId: '381209386765',
  appId: '1:381209386765:web:fe73e25967a4060b849a44'
};

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends'
      ],
      customParameters: {
        auth_type: 'reauthenticate'
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

@NgModule({
  declarations: [
    AppComponent,
    DetailedComponent,
    RegistrationsListComponent,
    RegistrationDetailComponent,
    RegistrationRdmsComponent,
    RegistrationMsisdnComponent,
    RegistrationPlanComponent,
    BaseOutletsComponent,
    LoginComponent,
    RegistrationsComponent,
    RegistrationPprComponent,
    RegistrationPartnerComponent,
    SettingsPprComponent,
    MainNavComponent,
    DashboardComponent,
    AddressComponent,
    TableComponent,
    ProgressDialogComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    AngularFireStorageModule, // storage
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
    // AppRoutingModule, // routing
    // HttpClientModule, // http client
    // FormsModule, // forms module
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ProgressDialogComponent]
})
export class AppModule { }
