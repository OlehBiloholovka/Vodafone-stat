import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authState: firebase.User;

  get authenticated(): boolean {
    return this.authState !== null;
  }

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => this.authState = user);
  }

  logout(): void {
    this.afAuth.auth.signOut().catch(console.log);
  }
}
