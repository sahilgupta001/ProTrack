import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './shared/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './modules/admin-module/signup/signup.component';
import { ErrorDisplayComponent } from './shared/error/error-display.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { CreateDepartmentComponent } from './modules/admin-module/department/createDepartment/createDepartment.component';
import { RolesComponent } from './modules/admin-module/department/createRoles/roles.component';
import { AssignRolesComponent } from './modules/admin-module/department/assignRoles/assign-roles.component';
import { InitializeProjectComponent } from './modules/admin-module/project/initialize-project/initialize-project.component';
import { AssignProjectComponent } from './modules/admin-module/project/assign-project/assign-project.component';
import { ProjectListComponent } from './modules/admin-module/project/project-list/project-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ErrorDisplayComponent,
    CreateDepartmentComponent,
    RolesComponent,
    AssignRolesComponent,
    InitializeProjectComponent,
    AssignProjectComponent,
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:  AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
