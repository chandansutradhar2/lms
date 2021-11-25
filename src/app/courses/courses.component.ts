import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course.model';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  // courses: any[] = [
  //   {
  //     name: 'Angular Bootcamp',
  //     imageUrl:
  //       'https://firebasestorage.googleapis.com/v0/b/infrasoft-lms.appspot.com/o/courses%2Fangular-logo.png?alt=media&token=a6775a01-f1f3-4c12-9ae4-e47b21012d3b',
  //     description: 'This is Angular from basic to advance',
  //     price: 45000,
  //     duration: 10,
  //     avgRating: 4,
  //     reviews: [
  //       {
  //         dateCreated: '23/12/2019',
  //         comments: 'It was ok course.',
  //         createdBy: 'Mr XYZ',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'MongoDB Bootcamp',
  //     imageUrl:
  //       'https://firebasestorage.googleapis.com/v0/b/infrasoft-lms.appspot.com/o/courses%2Fmongodb-logo.png?alt=media&token=097d1a82-12fd-41fd-8682-8edb3cb23190',
  //     description: 'This course covers MongoDB No Sql Database',
  //     price: 78000,
  //     duration: 12,
  //     avgRating: 4.5,
  //     reviews: [
  //       {
  //         dateCreated: '22/12/2019',
  //         comments: 'great course.',
  //         createdBy: 'Mr ABC',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'React Bootcamp',
  //     description: 'This is React from basic to advance',
  //     imageUrl:
  //       'https://firebasestorage.googleapis.com/v0/b/infrasoft-lms.appspot.com/o/courses%2Freact-logo.png?alt=media&token=b2c7cb10-0d4b-41af-83e3-c3d4620a87e1',
  //     price: 45000,
  //     duration: 10,
  //     avgRating: 4,
  //     reviews: [
  //       {
  //         dateCreated: '23/12/2019',
  //         comments: 'It was ok course.',
  //         createdBy: 'Mr XYZ',
  //       },
  //     ],
  //   },
  // ];

  courses: Course[] = [];
  constructor(private dbSvc: DbService) {
    this.dbSvc.fetchDocs('courses').then((docs) => {
      this.courses = docs;
      console.log(this.courses);
    });
  }

  ngOnInit(): void {}
}
