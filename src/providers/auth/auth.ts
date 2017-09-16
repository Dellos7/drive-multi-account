import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor( public afAuth: AngularFireAuth )  {
    console.log('Hello AuthProvider Provider');
  }

  loginUser( email: string, password: string ): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword( email, password );
  }

  resetPassword( email: string ): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail( email );
  }

  logoutUser(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }

  signupUser( newEmail: string, newPassword: string ): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword( newEmail, newPassword );
  }

}
