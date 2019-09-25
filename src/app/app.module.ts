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
    RegistrationRdmsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AppRoutingModule,
    // AppRoutingModule, // routing
    // HttpClientModule, // http client
    // FormsModule, // forms module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
