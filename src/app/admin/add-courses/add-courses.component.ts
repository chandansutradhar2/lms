import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
import { Course, DISCOUNT_TYPE } from 'src/app/models/course.model';
import { CheckNameValidator } from './check-name.validator';
import { taxValidator } from './tax.validator';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.scss'],
})
export class AddCoursesComponent implements OnInit {
  ngOnInit(): void {}
}
