import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UikitModule } from '../uikit/uikit.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddCoursesComponent } from './add-courses/add-courses.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  {
    path: 'add-course',
    component: AddCoursesComponent,
  },
];

@NgModule({
  declarations: [AdminDashboardComponent, AddCoursesComponent],
  imports: [
    CommonModule,
    UikitModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AdminModule {}
