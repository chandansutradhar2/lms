import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide: boolean = true;
  showIcon: boolean = false;
  constructor(private afAuth: AngularFireAuth, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  doLogin() {
    if (this.email.invalid || this.password.invalid) return;

    this.showIcon = true;
    this.afAuth
      .signInWithEmailAndPassword(this.email.value, this.password.value)
      .then((r) => {
        console.log(r.user);

        this.snackBar.open('login success!!', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      })
      .catch((err) => {
        this.snackBar.open('invalid credentials', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      })
      .finally(() => (this.showIcon = false));
  }
}
