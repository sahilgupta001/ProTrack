import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './modules/admin-module/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { CreateDepartmentComponent } from './modules/admin-module/department/createDepartment/createDepartment.component';
import { RolesComponent } from './modules/admin-module/department/createRoles/roles.component';
import { AssignRolesComponent } from './modules/admin-module/department/assignRoles/assign-roles.component';
import { InitializeProjectComponent } from './modules/admin-module/project/initialize-project/initialize-project.component';
import { AssignProjectComponent } from './modules/admin-module/project/assign-project/assign-project.component';
import { ProjectListComponent } from './modules/admin-module/project/project-list/project-list.component';
import { HomeProjectListComponent } from './shared/home-project-list/home-project-list.component';
import { ProjectDetailComponent } from './shared/project-detail/project-detail.component';
import { DocumentationUploadComponent } from './shared/documentation/documentation-upload/documentation-upload.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: ProjectListComponent, canActivate: [AuthGuard] },
  { path: 'userHome', component: HomeProjectListComponent, canActivate: [AuthGuard] },
  { path: 'auth/signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'dept/createDept', component: CreateDepartmentComponent, canActivate: [AuthGuard] },
  { path: 'dept/createRole', component: RolesComponent, canActivate: [AuthGuard] },
  { path: 'dept/assignRole', component: AssignRolesComponent, canActivate: [AuthGuard] },
  { path: 'project/initiateProject', component: InitializeProjectComponent, canActivate: [AuthGuard] },
  { path: 'project/assignProject', component: AssignProjectComponent, canActivate: [AuthGuard] },
  { path: 'projectDetail/:projectId', component: ProjectDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
