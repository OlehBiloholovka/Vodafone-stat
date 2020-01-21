import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: Observable<User>;
  smsSent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore,
              // tslint:disable-next-line:variable-name
              private _snackBar: MatSnackBar,
              private router: Router) {
    this.user = afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<User>(`users/${user.phoneNumber}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  // tslint:disable-next-line:variable-name
  private _countryCode = '+380';

  get countryCode(): string {
    return this._countryCode;
  }

  logout(): void {
    this.afAuth.auth.signOut().catch(console.log);
  }

  verifyLoginCode(verificationCode: string, wr: any) {
    wr.confirmationResult
      .confirm(verificationCode)
      .then(credential => this.updateUserData(credential.user))
      .then(() => this.router.navigate(['']))
      .catch(error => console.log(error, 'Incorrect code entered?'));
  }

  login(phoneNumber: string, recaptchaVerifier: firebase.auth.RecaptchaVerifier, wr: any) {
    const phone = this.getE164(phoneNumber);
    this.checkPhone(phone).subscribe(value => {
      if (value) {
        this.signInWithPhoneNumber(phone, recaptchaVerifier, wr);
      } else {
        this.onIncorrectPhone();
      }
    });
  }

  private checkPhone(phone: string): Observable<boolean> {
    return this.db.doc<User>(`users/${phone}`).get().pipe(map(data => data.exists));
  }

  private onIncorrectPhone() {
    this._snackBar.open('Номер невірний', 'OK');
  }

  private signInWithPhoneNumber(phone: string, recaptchaVerifier: firebase.auth.RecaptchaVerifier, wr: any) {
    firebase.auth().signInWithPhoneNumber(phone, recaptchaVerifier)
      .then(result => {
        this.smsSent.next(true);
        wr.confirmationResult = result;
      })
      .catch(error => console.log(error + ' catch'));
  }

  private getE164(phone: string) {
    const num = this._countryCode + phone;
    return `${num}`;
  }

  private updateUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.phoneNumber}`);
    const data: User = {
      uid: user.uid,
      phoneNumber: user.phoneNumber
    };
    return userRef.set(data, {merge: true});
  }
}
