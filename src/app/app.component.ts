import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

//meta data or decorator
@Component({
  selector: 'my-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lmsapp';
  toggleState: boolean = true;
  isLoggedIn: boolean = false;
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    afAuth.onAuthStateChanged((state) => {
      debugger;
      if (state) {
        this.isLoggedIn = true;
        router.navigate(['home']);
      } else {
        this.isLoggedIn = false;
        router.navigate(['login']);
      }
    });
  }
  clickHandler() {}

  toggleMenu() {
    this.toggleState ? (this.toggleState = false) : (this.toggleState = true);
  }
}
