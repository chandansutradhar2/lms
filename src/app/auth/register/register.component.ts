import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  frmGrp: FormGroup;
  constructor(
    private afauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private _snackBar: MatSnackBar
  ) {
    this.frmGrp = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNo: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  register() {
    if (this.frmGrp.invalid) return;

    console.log(this.frmGrp.value);
    this.afauth
      .createUserWithEmailAndPassword(
        this.frmGrp.controls['email'].value,
        this.frmGrp.controls['password'].value
      )
      .then((r) => {
        if (r.user) {
          this.firestore
            .collection('users')
            .doc(r.user.uid)
            .set(this.frmGrp.value)
            .then((res) => {
              this._snackBar.open('Account created successfully', 'ok', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
              });
            });
        }
      })
      .catch((err) => {
        this._snackBar.open('unable to create account', 'ok', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      });
  }
}
