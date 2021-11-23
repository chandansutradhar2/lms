import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User, USER_ROLE } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth.user.subscribe((r) => {
        if (r) {
          this.firestore
            .collection('users')
            .doc(r.uid)
            .get()
            .subscribe((doc) => {
              if (doc.exists) {
                let user: User = doc.data() as User;
                user.role == USER_ROLE.admin ? resolve(true) : resolve(false);
              } else {
                //no document found... can't authorize admin access
                resolve(false);
              }
            });
        } else {
          //user is not signin yet
          resolve(false);
        }
      });
    });
  }
}
