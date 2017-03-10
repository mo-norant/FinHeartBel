import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AngularFireModule} from 'angularfire2';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';

export const firebaseConfig = {
apiKey: "AIzaSyCipIk2HHAC0cHIi63D-PbaQocDgHS7mok",
    authDomain: "finheartbel.firebaseapp.com",
    databaseURL: "https://finheartbel.firebaseio.com",
    storageBucket: "finheartbel.appspot.com",
    messagingSenderId: "1059985304838"

}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
