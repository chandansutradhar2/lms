import { EventEmitter, Injectable } from '@angular/core';
import { Course, Lesson } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  onCourseSaved: EventEmitter<boolean> = new EventEmitter();
  menuButtonClicked: EventEmitter<any> = new EventEmitter();
  lessons: Lesson[] = [];
  course!: Course;
  constructor() {}
}
