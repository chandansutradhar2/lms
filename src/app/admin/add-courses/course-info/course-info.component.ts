import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course, DISCOUNT_TYPE } from 'src/app/models/course.model';
import { CheckNameValidator } from '../check-name.validator';
import { taxValidator } from '../tax.validator';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
})
export class CourseInfoComponent implements OnInit {
  frmGrp: FormGroup;
  imageUrl: string = '';
  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
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
        isTax: ['', Validators.required],
        taxType: [''],
        taxRate: [''],
      },
      {
        validators: taxValidator,
        updateOn: 'change',
      }
    );

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
  async save() {
    console.log(this.frmGrp.value);
    if (this.frmGrp.invalid) {
      return;
    }

    let data = this.frmGrp.value;

    let usr = await this.afAuth.currentUser;

    let course: Course = {
      createdBy: usr?.uid || '',
      createdOn: Date.now(),
      description: data.description,
      discountRate: data.discountRate,
      reviews: [],
      imageUrl: this.imageUrl,
      lessons: [],
      name: data.name,
      price: data.price,
      isDiscount: data.isDiscount,
      isTax: data.isTax,
      discountType: data.discountType,
    };

    this.firestore
      .collection('courses')
      .add(course)
      .then((ref) => {
        alert('saved successfully');
        console.log(ref.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
