import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component'

export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'members', component: MembersComponent, canActivate: [AuthGuard], children: [
        { path: 'dashboard', component: DashboardComponent , outlet: 'dashboard'}
    ] },
    
        
    


]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);