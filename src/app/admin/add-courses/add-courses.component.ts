import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { DISCOUNT_TYPE } from 'src/app/models/course.model';
import { CheckNameValidator } from './check-name.validator';
import { taxValidator } from './tax.validator';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.scss'],
})
export class AddCoursesComponent implements OnInit {
  frmGrp: FormGroup;
  showDiscount: boolean = false;
  imageUrl: string = '';
  constructor(private fb: FormBuilder, private firestore: AngularFirestore) {
    this.frmGrp = fb.group(
      {
        name: [
          '',
          [Validators.required],
          new CheckNameValidator(this.firestore).validate.bind(this),
        ],
        description: ['', [Validators.required]],
        price: ['', [Validators.required]],
        isDiscount: ['', [Validators.required]],
        discountRate: ['', [Validators.required]],
        discountType: ['', [Validators.required]],
        lessons: fb.array([]),
        isTax: ['', Validators.required],
        taxType: [''],
        taxRate: [''],
      },
      {
        validators: taxValidator,
        updateOn: 'blur',
      }
    );

    this.frmGrp.controls['isDiscount'].valueChanges.subscribe((r) => {
      this.showDiscount = r;
    });

    this.frmGrp.controls['discountType'].valueChanges.subscribe((value) => {
      if (value == DISCOUNT_TYPE.FIXED) {
        this.frmGrp.controls['discountRate'].setValidators(
          Validators.max(this.frmGrp.controls['price'].value)
        );
      } else {
        this.frmGrp.controls['discountRate'].setValidators(Validators.max(100));
      }

      this.frmGrp.controls['discountRate'].updateValueAndValidity();
    });
  }

  ngOnInit(): void {}

  get form() {
    return this.frmGrp.controls;
  }
  save() {
    console.log(this.frmGrp);
  }
}
