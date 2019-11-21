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
import {MatIconModule, MatRadioModule, MatTableModule} from '@angular/material';
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
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    // AppRoutingModule, // routing
    // HttpClientModule, // http client
    // FormsModule, // forms module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
