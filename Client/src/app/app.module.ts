import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { JoinGameComponent } from './join-game/join-game.component';
import { SearchGameComponent } from './search-game/search-game.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlayGameComponent } from './play-game/play-game.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateGameComponent,
    JoinGameComponent,
    SearchGameComponent,
    LogoutComponent,
    LoginComponent,
    DashboardComponent,
    PlayGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path:"login",
        component: LoginComponent,
      },
      {
        path:"",
        component: AppComponent
      },
    
      {
        path:"app",
        component: DashboardComponent
      },
      {
        path:"app/play",
        component: PlayGameComponent
      },
      {
        path:"app/create",
        component:CreateGameComponent
      },
      {
        path:"app/join",
        component: JoinGameComponent
      },
      {
        path:"app/search",
        component:SearchGameComponent
      },
      {
        path:"logout",
        component: LogoutComponent
      }
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
