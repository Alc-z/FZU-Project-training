import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { LoginPage } from './login/login.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupPage } from './signup/signup.page';
import { LoginGuard } from 'src/app/core/login.guard';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupPage
  },
  {
    path: 'login',
    component: LoginPage,
    canActivate: [LoginGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassportRoutingModule { }
