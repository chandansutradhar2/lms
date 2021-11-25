import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, USER_ROLE } from 'src/app/models/user.model';
import { DbService } from 'src/app/services/db.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  frmGrp: FormGroup;
  constructor(
    private afauth: AngularFireAuth,
    private utilSvc: UtilService,
    private dbSvc: DbService,
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
          let data = this.frmGrp.value;
          let user: User = {
            dob: 0,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            mobileNo: data.mobileNo,
            role: USER_ROLE.student,
            uid: r.user.uid,
          };
          this.dbSvc.createDocWithId('users', user, r.user.uid).then((r) => {
            this.utilSvc.showSnackBar('Account created successfully', 5000);
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
