import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  frmGrp: FormGroup;
  constructor(private afauth: AngularFireAuth) {
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

    // this.afauth.createUserWithEmailAndPassword(
    //   this.frmGrp.controls['email'].value,
    //   this.frmGrp.controls['password'].value
    // );
  }
}
