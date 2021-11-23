import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdminGuard } from './admin-guard.guard';
import { LoginComponent } from './auth/login/login.component';

import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'profile', component: MyprofileComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((a) => a.AdminModule),
    canActivate: [AdminGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((a) => a.AuthModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
