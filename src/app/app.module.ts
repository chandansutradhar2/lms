import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { UikitModule } from './uikit/uikit.module';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CoursesComponent } from './courses/courses.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidemenuComponent,
    HomeComponent,
    AboutusComponent,
    CoursesComponent,
    MyprofileComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, UikitModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
