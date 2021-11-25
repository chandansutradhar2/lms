import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { MatSnackBar } from '@angular/material/snack-bar';
import { DemoComponent } from 'src/app/demo/demo.component';
import {
  Chapter,
  Course,
  DISCOUNT_TYPE,
  Lesson,
} from 'src/app/models/course.model';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.scss'],
})
export class AddCoursesComponent implements OnInit {
  course!: Course | null;
  lessons!: Lesson[] | null;
  chapters!: Chapter[] | null;
  constructor(
    private snackBar: MatSnackBar,
    private afAuth: AngularFirestore,
    private firestore: AngularFirestore,
    private stateSvc: StateService
  ) {}
  ngOnInit(): void {
    console.log('ngIninit of Add Course Component');
  }

  saveCourseInfo(course: Course) {
    console.log('recieved from course-info', course);
    this.course = course;
    if (this.lessons) {
      this.course.lessons = this.lessons;
      this.saveToDB();
      //code to save to database;
    } else {
      //lesson is not recieved,
      this.snackBar.open('You need to save Lessons as well', 'OK', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  }

  saveToDB() {
    this.firestore
      .collection('courses')
      .add(this.course)
      .then((r) => {
        this.snackBar.open('Course Saved Succesfully', 'OK', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.course = null;
        this.lessons = null;
        this.stateSvc.onCourseSaved.emit(true);
      });
  }

  saveLessonInfo(lessons: Lesson[]) {
    if (this.course) {
      this.course.lessons = lessons;
      this.saveToDB();
    } else {
      this.lessons = lessons;
      this.snackBar.open(
        'You need to save Course Name and course info as well. please save it',
        'OK',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        }
      );
    }
  }

  saveChapterInfo(chapters: Chapter[]) {}

  saveToLocalStorage(key: any, value: any) {
    localStorage.setItem(key, value);
  }
}
