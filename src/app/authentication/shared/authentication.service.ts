import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  get user(): BehaviorSubject<User> {
    return this._user;
  }
  get phone(): BehaviorSubject<string> {
    return this._phone;
  }

  smsSent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private authState: firebase.User;
  // tslint:disable-next-line:variable-name
  private _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  // tslint:disable-next-line:variable-name
  private _phone: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  userSubscription: Subscription;

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
    this._user.next(undefined);
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  verifyLoginCode(verificationCode: string, wr: any, user: any) {
    wr.confirmationResult
      .confirm(verificationCode)
      .then(result => {

        user = result.user;

      })
      .then(() => this.subscribeUser())
      .then(() => this.router.navigate(['']))
      .catch(error => console.log(error, 'Incorrect code entered?'));
  }

  private subscribeUser() {
    // console.log(this._phone);
    this.userSubscription = this.getUser()
      .subscribe(u => {
        this._user.next(u);
      });
  }

  getUser(): Observable<User> {
    return this.db.doc<User>('phones/' + this._phone.getValue())
      .valueChanges();
  }

  login(phone: string, recaptchaVerifier: firebase.auth.RecaptchaVerifier, wr: any) {
    this.checkPhone(phone).subscribe(value => {
      if (value) {
        this._phone.next(phone);
        // storage.write('phone', phone);
        localStorage.setItem('phone', phone);
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

  isUser(): Observable<firebase.User> {
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
