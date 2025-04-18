import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FormInputComponent } from '../../shared/components/form-input/form-input.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    RegisterPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FormInputComponent,
  ],
})
export class AuthModule {}
