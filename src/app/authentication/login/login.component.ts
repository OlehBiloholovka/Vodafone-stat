import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {WindowService} from '../shared/window.service';
import {MatSnackBar} from '@angular/material';
import {AuthenticationService} from '../shared/authentication.service';
import {User} from '../shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  countryCode: string;
  phone: string;
  windowRef: any;
  verificationCode: string;
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  smsSent: BehaviorSubject<boolean>;
  sendSmsButtonDisable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private ws: WindowService,
              private authenticationService: AuthenticationService,
              // tslint:disable-next-line:variable-name
              private _snackBar: MatSnackBar) {
    this.countryCode = authenticationService.countryCode;
    this.smsSent = authenticationService.smsSent;
  }

  ngOnInit() {

    firebase.auth().languageCode = 'uk';
    this.windowRef = this.ws.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',
      {
        // size: 'invisible',
        size: 'compact normal',
        callback: () => this.sendSmsButtonDisable.next(false),
        'expired-callback': () => this.sendSmsButtonDisable.next(true)
      }
    );
    this.recaptchaVerifier = this.windowRef.recaptchaVerifier;
    this.windowRef.recaptchaVerifier.render().catch(console.log);
  }

  verifyLoginCode() {
    // this.authenticationService.verifyLoginCode(this.verificationCode,  this.windowRef, this.user);
    this.authenticationService.verifyLoginCode(this.verificationCode,  this.windowRef);
  }

  login() {
    this.authenticationService.login(this.phone, this.recaptchaVerifier, this.windowRef);
  }

  logout() {
    this.authenticationService.logout();
  }

  isUser(): Observable<User> {
    return this.authenticationService.user;
  }
}

