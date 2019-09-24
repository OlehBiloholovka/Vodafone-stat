import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';

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
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
