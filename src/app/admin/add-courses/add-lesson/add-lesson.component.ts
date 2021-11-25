import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lesson } from 'src/app/models/course.model';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss'],
})
export class AddLessonComponent implements OnInit {
  frmGrp: FormGroup;

  @Output() onSaveLessonEvent: EventEmitter<Lesson[]> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private stateSvc: StateService
  ) {
    this.frmGrp = fb.group({
      lessons: fb.array([]),
    });

    //code to get notified when the course is saved
    this.stateSvc.onCourseSaved.subscribe((r) => {
      if (r) {
        this.frmGrp.reset();
        this.lessons.clear();
      }
    });
  }

  get lessons() {
    return this.frmGrp.controls['lessons'] as FormArray;
  }

  addLesson() {
    const frmObj = this.fb.group({
      description: ['', Validators.required],
      duration: [2, Validators.required],
      isVisible: [true, [Validators.required]],
    });

    this.lessons.push(frmObj);
  }

  removeLesson(idx: number) {
    this.lessons.removeAt(idx);
  }

  ngOnInit(): void {}

  save() {
    if (this.frmGrp.invalid) {
      this.snackBar.open(
        'Lesson information is incomplete. please complete it before saving',
        'ok',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        }
      );
      return;
    }

    let lessonsArr: Lesson[] = [];
    for (let index = 0; index < this.lessons.length; index++) {
      let data = this.lessons.controls[index].value;

      let lesson: Lesson = {
        chapters: [],
        description: data.description,
        duration: data.duration,
        isDone: false,
      };

      lessonsArr.push(lesson);
    }

    this.onSaveLessonEvent.emit(lessonsArr);
  }
}
