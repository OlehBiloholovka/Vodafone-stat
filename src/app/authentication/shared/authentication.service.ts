import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  smsSent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private authState: firebase.User;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore,
              // tslint:disable-next-line:variable-name
              private _snackBar: MatSnackBar,
              private router: Router) {
    this.afAuth.authState.subscribe(user => this.authState = user);
  }

  // tslint:disable-next-line:variable-name
  private _countryCode = '+380';

  get countryCode(): string {
    return this._countryCode;
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  logout(): void {
    this.afAuth.auth.signOut().catch(console.log);
  }

  verifyLoginCode(verificationCode: string, wr: any, user: any) {
    wr.confirmationResult
      .confirm(verificationCode)
      .then(result => {

        user = result.user;

      })
      .then(() => this.router.navigate(['']))
      .catch(error => console.log(error, 'Incorrect code entered?'));
  }

  login(phone: string, recaptchaVerifier: firebase.auth.RecaptchaVerifier, wr: any) {
    this.checkPhone(phone).subscribe(value => {
      if (value) {
        firebase.auth().signInWithPhoneNumber(this.getE164(phone), recaptchaVerifier)
          .then(result => {
            this.smsSent.next(true);
            wr.confirmationResult = result;
            // this.closeDialog();
            // this.captchaState.next(true);
          })
          .catch(error => console.log(error + ' catch'));
      } else {
        this.onIncorrectPhone();
      }
    });
  }

  onIncorrectPhone() {
    this._snackBar.open('Номер невірний', 'OK');
  }

  isUser(): Observable<User> {
    return this.afAuth.user;
  }

  private getE164(phone: string) {
    const num = this._countryCode + phone;
    return `${num}`;
  }

  private checkPhone(phone: string): Observable<boolean> {
    return this.db
      .collection('phones', ref => ref.where('phone', '==', Number.parseInt(phone, 10)))
      .get()
      .pipe(map(data => !data.empty));
  }
}
