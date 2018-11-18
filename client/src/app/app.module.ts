import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/authGaurd/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppService } from './service/app.service';
import { AppRoutingModule } from './/app-routing.module';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TodoComponent } from './components/todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    SidebarComponent,
    TodoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AppService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
