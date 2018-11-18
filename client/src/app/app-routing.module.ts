import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './auth/authGaurd/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    // pathMatch: 'full'
  }, {
    path: 'signup',
    component: SignupComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,
      { useHash: true })
  ],
  declarations: [],
  providers: [
    AuthGuard
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
