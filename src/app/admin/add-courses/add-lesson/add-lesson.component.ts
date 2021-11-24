import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

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

  ngOnInit(): void {}
}
