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
import { ProjectListComponent } from './modules/admin-module/project/project-list/project-list.component';
import { AdminHeaderComponent } from './modules/admin-module/admin-header/admin-header.component';
import { DepartmentHeaderComponent } from './shared/department-header/department-header.component';
import { HomeProjectListComponent } from './shared/home-project-list/home-project-list.component';
import { ProjectDetailComponent } from './shared/project-detail/project-detail.component';
import { DocumentationUploadComponent } from './shared/documentation/documentation-upload/documentation-upload.component';
import { DefectRaiseComponent } from './shared/defect/defect-raise/defect-raise.component';
import { DefectSummaryComponent } from './shared/defect/defect-summary/defect-summary.component';
import { DefectRaiseBulkComponent } from './shared/defect/defect-raise-bulk/defect-raise-bulk.component';
import { ViewDocumentsComponent } from './shared/documentation/view-documents/view-documents.component';
import { CloseDefectsComponent } from './shared/defect/close-defects/close-defects.component';
import { DeleteDefectsComponent } from './modules/admin-module/delete-defects/delete-defects.component';
import { AssignProjectComponent } from './modules/admin-module/project/assign-project/assign-project.component';
import { ProjectAssignComponent } from './shared/project-assign/project-assign.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminHeaderComponent,
    DepartmentHeaderComponent,
    LoginComponent,
    SignupComponent,
    ErrorDisplayComponent,
    CreateDepartmentComponent,
    RolesComponent,
    AssignRolesComponent,
    InitializeProjectComponent,
    AssignProjectComponent,
    ProjectListComponent,
    HomeProjectListComponent,
    ProjectDetailComponent,
    DocumentationUploadComponent,
    DefectRaiseComponent,
    DefectSummaryComponent,
    DefectRaiseBulkComponent,
    CloseDefectsComponent,
    ViewDocumentsComponent,
    DeleteDefectsComponent,
    ProjectAssignComponent
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
