import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';

import { AuthGuard } from './auth.guard';
import { TruthOptionsComponent } from './truth-options/truth-options.component';
import { PlayGameComponent } from './play-game/play-game.component';
import { DareOptionsComponent } from './dare-options/dare-options.component';
import { CheckAnswerComponent } from './check-answer/check-answer.component';
import { GiveAnswerComponent } from './give-answer/give-answer.component';
import  { JoinGameComponent } from "./join-game/join-game.component"

const routes: Routes = [
  {
    path:"login",
    component: LoginComponent,
    
  },
  {
    path:"signup",
    component: SignupComponent,
  },
  // {
  //   path:"",
  //   component: AppComponent,
  //   canActivate:[AuthGuard],

  // },

  {
    path:"app",
    component: DashboardComponent,
    canActivate:[AuthGuard],
        children:[
          {
            path:"",
            component: PlayGameComponent,

          },
          {
          path:"truth-options",
          component:TruthOptionsComponent
        },
        {
          path:"dare-options",
          component:DareOptionsComponent
        },
        {
          path:"check-answer",
          component:CheckAnswerComponent
        },
        {
          path:"give-answer",
          component:GiveAnswerComponent
        },
        { path:"join-game",
        component: JoinGameComponent
      }
      
      ]}
    
       
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
