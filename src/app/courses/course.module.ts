import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UikitModule } from '../uikit/uikit.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent } from './courses.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: CoursesComponent }];
@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    UikitModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [],
})
export class CourseModule {}
