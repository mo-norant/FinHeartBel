import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadzoneComponent } from './uploadzone/uploadzone.component';
import { IndexComponent } from './index/index.component';
import { ECGViewerComponent } from './ecg-viewer/ecg-viewer.component';
import { ArrythmiaComponent } from './arrythmia/arrythmia.component'



export const router: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: IndexComponent },
    { path: 'arrythmia', component: ArrythmiaComponent},
    { path: 'signup', component: SignupComponent },
    {
        path: 'members', component: MembersComponent, canActivate: [AuthGuard], children: [
            {
                path: 'dashboard', component: DashboardComponent, outlet: 'dashboard', data: {
                    name: 'Dashboard'
                }

            },
            {
                path: 'upload', component: UploadzoneComponent, outlet: 'dashboard', data: {
                    name: 'Dashboard'

                }
            },
            {
                path: 'egc-viewer', component: ECGViewerComponent, outlet: 'dashboard', data: {
                    name: 'Dashboard'

                }
            }
        ]
    }
    





]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);