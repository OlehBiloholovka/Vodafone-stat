import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {WindowService} from '../../admin/shared/window.service';
import {User} from 'firebase';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  countryCode = '+380';
  phone: string;
  windowRef: any;
  verificationCode: string;
  user: any;
  loginState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  smsSent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  sendSmsButtonDisable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private ws: WindowService,
              private as: AuthenticationService,
              public dialog: MatDialog,
              // tslint:disable-next-line:variable-name
              private _snackBar: MatSnackBar,
              private router: Router) {
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
    this.windowRef.recaptchaVerifier.render();
  }

  getE164() {
    const num = this.countryCode + this.phone;
    return `${num}`;
  }

  sendLoginCode() {

    // const appVerifier = this.windowRef.recaptchaVerifier;

    this.checkPhone().subscribe(value => {
      if (value) {
        this.loginState.next(true);
        firebase.auth().signInWithPhoneNumber(this.getE164(), this.recaptchaVerifier)
          .then(result => {
            this.smsSent.next(true);
            this.windowRef.confirmationResult = result;
            // this.closeDialog();
            // this.captchaState.next(true);
          })
          .catch(error => console.log(error + ' catch'));
      } else {
        this.onIncorrectPhone();
      }
    });
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {

        this.user = result.user;

      })
      .then(() => this.router.navigate(['']))
      .catch(error => console.log(error, 'Incorrect code entered?'));
  }

  off() {
    this.afAuth.auth.signOut().catch(console.log).finally(() => this.loginState.next(false));
  }

  checkPhone(): Observable<boolean> {
    return this.db
      .collection('phones', ref => ref.where('phone', '==', Number.parseInt(this.phone, 10)))
      .get()
      .pipe(map(data => !data.empty));
  }

  isUser(): Observable<User> {
    return this.afAuth.user;
  }

  onIncorrectPhone() {
    this._snackBar.open('Номер невірний', 'OK');
  }
}

