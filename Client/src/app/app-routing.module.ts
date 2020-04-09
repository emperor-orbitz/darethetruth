import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGameComponent } from './create-game/create-game.component';
import { JoinGameComponent } from './join-game/join-game.component';
import { SearchGameComponent } from './search-game/search-game.component';
import { LogoutComponent } from './logout/logout.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  
 /*{
path:"",
component:
}, */


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
