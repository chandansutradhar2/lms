import { EventEmitter, Injectable } from '@angular/core';
import { Lesson } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  onCourseSaved: EventEmitter<boolean> = new EventEmitter();
  lessons!: Lesson[];
  constructor() {}
}
