import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';

export const APP_ROUTES: Routes = [

  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  

   // otherwise redirect to home
   { path: '**', redirectTo: '' }
];

