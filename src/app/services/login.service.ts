import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class LoginService {

  constructor(
    private auth: AngularFireAuth,
    private router: Router,

  ) { }

  login(email, senha) {
    return this.auth.signInWithEmailAndPassword(email, senha).then((user) => {
      localStorage['user-flow'] = user.user.uid;
      this.router.navigate(['/home'])
    }).catch(e => {
      this.router.navigate(['/login']);
    })
  }

  logout() {
    return this.auth.signOut().then(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
    }).catch()
  }
}
