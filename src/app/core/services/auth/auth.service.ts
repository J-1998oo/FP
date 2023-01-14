import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserCredential } from '@firebase/auth-types';
import { BehaviorSubject, from, Observable } from 'rxjs';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  dbPath = '/users';
  dbRef: AngularFireList<any>;
  userInfo = new BehaviorSubject<any>({});
  userId: string = '';
  isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('userId'));

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    private router: Router
  ) {
    this.dbRef = angularFireDatabase.list(this.dbPath);
    this.authStateSubscripe();
  }
  get isLoggedIn() {
    return this.isLoggedIn$.getValue();
  }
  login(email: string, password: string): Observable<any> {
    return from(
      this.angularFireAuth
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
          window.alert(error.message);/* تغيير ل ديلوغ  */
        })
    );
  }

  signup(email: string, password: string): Observable<any> {
    return from(
      this.angularFireAuth
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
          window.alert(error.message);/* تغيير ل ديلوغ  */
        })
    );
  }
  createUser(userId: string, name: string, email: string): Observable<any> {
    this.userId = userId;
    return from(
      this.dbRef.update(userId, {
        userId: userId,
        name: name,
        email: email,
        role: 'enduser',
      })
    );
  }
  authStateSubscripe() {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        if (!this.isLoggedIn) {
          this.router.navigate(['/startup/all-startup']);
        }
        this.getUserById(user.uid);

        localStorage.setItem('userId', user.uid);
        this.isLoggedIn$.next(true);
      } else {
        localStorage.removeItem('userId');
        this.isLoggedIn$.next(false);
      }
    });
  }
  logout() {
    this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('userId');
      this.router.navigate(['/home']);
      this.isLoggedIn$.next(false);
    });
  }

  getUserById(userId: string) {
    this.angularFireDatabase
      .object(`${this.dbPath}/${userId}`)
      .valueChanges()
      .subscribe((user) => {
        this.userInfo.next(user);
      });
  }
}
