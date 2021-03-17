import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AdminLayoutComponent} from "./shared/components/admin-layout/admin-layout.component";
import {LoginPageComponent} from "./shared/components/login-page/login-page.component";
import {CreatePageComponent} from "./shared/components/create-page/create-page.component";
import {DashboardPageComponent} from "./shared/components/dashboard-page/dashboard-page.component";
import {EditPageComponent} from "./shared/components/edit-page/edit-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {AuthService} from "../shared/services/auth.service";
import {AuthGuard} from "../shared/services/auth.guard";

@NgModule({
  declarations:[
    LoginPageComponent,
    CreatePageComponent,
    DashboardPageComponent,
    EditPageComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
        {
          path: '', component: AdminLayoutComponent, children: [
            {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
            {path: 'login', component: LoginPageComponent},
            {path: 'create', component: CreatePageComponent, canActivate:[AuthGuard]},
            {path: 'dashboard', component: DashboardPageComponent, canActivate:[AuthGuard]},
            {path: 'post/:id/edit', component: EditPageComponent, canActivate:[AuthGuard]}
          ]
        }
      ]
    ),
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ],
  providers:[
    AuthGuard
  ]
})

export class AdminModule{

}
