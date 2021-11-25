import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DemoComponent } from 'src/app/demo/demo.component';
import {
  Chapter,
  Course,
  DISCOUNT_TYPE,
  Lesson,
} from 'src/app/models/course.model';
import { DbService } from 'src/app/services/db.service';
import { StateService } from 'src/app/services/state.service';
import { UtilService } from 'src/app/services/util.service';
import { PromptDialogComponent } from 'src/app/shared/prompt-dialog/prompt-dialog.component';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.scss'],
})
export class AddCoursesComponent implements OnInit {
  course!: Course | null;

  chapters!: Chapter[] | null;
  constructor(
    private snackBar: MatSnackBar,
    private dbSvc: DbService,
    private stateSvc: StateService,
    private utilSvc: UtilService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit(): void {
    console.log('ngIninit of Add Course Component');
  }

  saveCourseInfo(course: Course) {
    console.log('recieved from course-info', course);
    this.course = course;
    this.course.name = 'New Name';
    console.log(this.course);

    if (this.stateSvc.lessons.length > 0) {
      this.course.lessons = this.stateSvc.lessons;
      this.saveToDB();
      //code to save to database;
    } else {
      //lesson is not recieved,
      this.utilSvc.showSnackBar('You need to save Lessons as well');
    }
  }

  saveToDB() {
    this.dbSvc.createDoc('courses', this.course).then((r) => {
      this.utilSvc.showSnackBar('Course Created successfully');
      this.course = null;
      this.stateSvc.lessons = [];
      this.stateSvc.onCourseSaved.emit(true);
    });
  }

  saveLessonInfo() {
    if (this.course) {
      this.course.lessons = this.stateSvc.lessons;
      this.saveToDB();
    } else {
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
