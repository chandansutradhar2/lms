import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UikitModule } from '../uikit/uikit.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddCoursesComponent } from './add-courses/add-courses.component';

@NgModule({
  declarations: [AdminDashboardComponent, AddCoursesComponent],
  imports: [CommonModule, UikitModule, ReactiveFormsModule],
  exports: [AdminDashboardComponent],
})
export class AdminModule {}
