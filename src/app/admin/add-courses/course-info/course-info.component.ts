import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Course, DISCOUNT_TYPE } from 'src/app/models/course.model';
import { StateService } from 'src/app/services/state.service';
import { UtilService } from 'src/app/services/util.service';
import { PromptDialogComponent } from 'src/app/shared/prompt-dialog/prompt-dialog.component';
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
  @Output() onCourseInfoSaveEvent: EventEmitter<Course> = new EventEmitter();
  showIcon: boolean = false;
  constructor(
    private svc: StateService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private utilSvc: UtilService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.svc.menuButtonClicked.subscribe(() => {
      if (this.frmGrp.touched || this.frmGrp.dirty) {
        let dialogRef = this.dialog.open(PromptDialogComponent, {
          data: {
            title: 'Data Loss Prevention',
            msg: 'You have unsaved data in course form. do you want to continue without saving them',
          },
        });

        dialogRef.afterClosed().subscribe((r) => {
          r ? this.router.navigate(['courses']) : null;
        });
      }
    });

    this.svc.onCourseSaved.subscribe((r) => {
      if (r) {
        this.imageUrl = '';
        this.frmGrp.reset();
      }
    });
    this.frmGrp = fb.group(
      {
        name: [
          '',
          [Validators.required],
          new CheckNameValidator(this.firestore).validate.bind(this),
        ],
        description: ['', [Validators.required]],
        price: ['', [Validators.required]],
        isDiscount: [false],
        discountRate: [''],
        discountType: [''],
        isTax: [false],
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
      this.utilSvc.showSnackBar(
        'Course Info is incomplete. please complete it before saving'
      );
      return;
    }
    this.showIcon = true;
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

    this.onCourseInfoSaveEvent.emit(course);
    setTimeout(() => {
      this.showIcon = false;
    }, 4000);

    console.log(course);
  }
}
