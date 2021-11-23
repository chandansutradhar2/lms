import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { UikitModule } from '../uikit/uikit.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ResetPasswordComponent],
  imports: [CommonModule, UikitModule, ReactiveFormsModule],
  exports: [RegisterComponent, ResetPasswordComponent, LoginComponent],
  providers: [],
})
export class AuthModule {}
