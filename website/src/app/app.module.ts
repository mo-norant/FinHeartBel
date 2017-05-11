import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service';
import { routes } from './app.routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { UploadzoneComponent } from './uploadzone/uploadzone.component';
import { IndexComponent } from './index/index.component';
import { ECGViewerComponent } from './ecg-viewer/ecg-viewer.component';



// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyCipIk2HHAC0cHIi63D-PbaQocDgHS7mok",
  authDomain: "finheartbel.firebaseapp.com",
  databaseURL: "https://finheartbel.firebaseio.com",
  projectId: "finheartbel",
  storageBucket: "finheartbel.appspot.com",
  messagingSenderId: "1059985304838"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MembersComponent,
    DashboardComponent,
    UploadzoneComponent,
    IndexComponent,
    ECGViewerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes,
    ChartsModule

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
