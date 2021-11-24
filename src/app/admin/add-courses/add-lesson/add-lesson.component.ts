import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss'],
})
export class AddLessonComponent implements OnInit {
  frmGrp: FormGroup;
  constructor(private fb: FormBuilder) {
    this.frmGrp = fb.group({
      lessons: fb.array([]),
    });
  }

  get lessons() {
    return this.frmGrp.controls['lessons'] as FormArray;
  }

  addLesson() {
    const frmObj = this.fb.group({
      description: '',
      duration: 2,
      isVisible: [true, []],
    });

    this.lessons.push(frmObj);
  }

  removeLesson(idx: number) {
    this.lessons.removeAt(idx);
  }

  ngOnInit(): void {}

  save() {
    console.log(this.frmGrp);
  }
}
