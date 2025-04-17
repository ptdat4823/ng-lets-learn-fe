import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../modules/auth/components/login-page/login-page.component';
import { RegisterPageComponent } from '../modules/auth/components/register-page/register-page.component';

const routes: Routes = [
  { path: 'auth/login', component: LoginPageComponent },
  { path: 'auth/signup', component: RegisterPageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
