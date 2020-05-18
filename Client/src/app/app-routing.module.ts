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
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
      path:"",
      component:IndexComponent
  },
  
  {
    path:"login",
    component: LoginComponent,
    
  },
  {
    path:"signup",
    component: SignupComponent,
  },
 

  {
    path:"app",
    component: DashboardComponent,
    //canActivate:[AuthGuard],
        children:[
          {
            path:"",
            component: PlayGameComponent,
            canActivate:[AuthGuard]
          },
          {
          path:"truth-options/:darer_id/:daree_id",
          component:TruthOptionsComponent
        },
        {
          path:"dare-options/:darer_id/:daree_id",
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
      
      
      ]}
    
       
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
