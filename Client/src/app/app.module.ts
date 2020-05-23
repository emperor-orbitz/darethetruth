import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import { MatInputModule } from "@angular/material/input"
import { MatCardModule } from "@angular/material/card"
import {MatButtonModule, MatAnchor} from "@angular/material/button"
import {MatGridListModule } from "@angular/material/grid-list"
import { OverlayModule } from '@angular/cdk/overlay';

import {HttpClientModule} from "@angular/common/http"
import {AngularFireModule} from "angularfire2"
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFirestoreModule} from "angularfire2/firestore";

import { SignupComponent } from './signup/signup.component'
import {environment} from "../environments/environment.prod";
import { TruthOptionsComponent } from './truth-options/truth-options.component';
import { DareOptionsComponent } from './dare-options/dare-options.component';
import { PlayGameComponent } from './play-game/play-game.component';
import { GiveAnswerComponent } from './give-answer/give-answer.component';
import { CheckAnswerComponent } from './check-answer/check-answer.component';
import { MatDialogModule} from '@angular/material/dialog';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { IndexComponent } from './index/index.component';
import {MatIconModule} from "@angular/material/icon"
import {MatToolbarModule} from "@angular/material/toolbar";
import { ModalboxComponent } from './modalbox/modalbox.component';
import {MatExpansionModule} from "@angular/material/expansion"

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    TruthOptionsComponent,
    DareOptionsComponent,
    PlayGameComponent,
    GiveAnswerComponent,
    CheckAnswerComponent,
    IndexComponent,
    ModalboxComponent,
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
