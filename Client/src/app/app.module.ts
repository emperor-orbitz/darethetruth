//ANGULAR CORE/FORMS/ETC
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {HttpClientModule} from "@angular/common/http"

//FIREBASE MODULES
import {AngularFireModule} from "angularfire2"
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFirestoreModule} from "angularfire2/firestore";
import { AngularFireStorageModule } from 'angularfire2/storage';


//MATERIAL MODULES
import { MatInputModule } from "@angular/material/input"
import { MatCardModule } from "@angular/material/card"
import {MatButtonModule} from "@angular/material/button"
import { MatGridListModule } from "@angular/material/grid-list"
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule} from '@angular/material/dialog';
import { MatExpansionModule} from "@angular/material/expansion";
import { MatIconModule} from "@angular/material/icon"
import { MatToolbarModule} from "@angular/material/toolbar";

//PAGE COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component'
import {environment} from "../environments/environment.prod";
import { TruthOptionsComponent } from './truth-options/truth-options.component';
import { DareOptionsComponent } from './dare-options/dare-options.component';
import { PlayGameComponent } from './play-game/play-game.component';
import { CheckAnswerComponent } from './check-answer/check-answer.component';
import { IndexComponent } from './index/index.component';
import { ModalboxComponent } from './modalbox/modalbox.component';
import { ProfileComponent } from './profile/profile.component'



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    TruthOptionsComponent,
    DareOptionsComponent,
    PlayGameComponent,
    CheckAnswerComponent,
    IndexComponent,
    ModalboxComponent,
    ProfileComponent,
  ],
  imports: [
    OverlayModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    MatInputModule, MatCardModule, MatButtonModule, MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    MatGridListModule,
    AngularFirestoreModule,
    //RouterModule.forRoot(),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule

    
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
