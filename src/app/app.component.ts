import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

//meta data or decorator
@Component({
  selector: 'my-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lmsapp';
  toggleState: boolean = true;

  constructor(private afAuth: AngularFireAuth) {}
  clickHandler() {}

  toggleMenu() {
    this.toggleState ? (this.toggleState = false) : (this.toggleState = true);
  }
}
