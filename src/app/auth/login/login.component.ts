import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide: boolean = true;
  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit(): void {}

  doLogin() {
    if (this.email.invalid || this.password.invalid) return;

    this.afAuth
      .signInWithEmailAndPassword(this.email.value, this.password.value)
      .then(
        (r) => {
          console.log(r.user);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
