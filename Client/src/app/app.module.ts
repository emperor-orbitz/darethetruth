import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { JoinGameComponent } from './join-game/join-game.component';
import { SearchGameComponent } from './search-game/search-game.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateGameComponent,
    JoinGameComponent,
    SearchGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([{
      path:"create",
      component:CreateGameComponent
    },
    {
      path:"join",
      component: JoinGameComponent
    },
    {
      path:"search",
      component:SearchGameComponent
    }
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
