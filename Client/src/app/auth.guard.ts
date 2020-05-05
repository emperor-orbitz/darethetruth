import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {AuthService} from './auth.service'
import {AngularFireAuth} from "angularfire2/auth"
import {map, take , } from "rxjs/operators"


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  
  constructor( private Auth: AuthService, private afa:AngularFireAuth, private route: Router){

  }
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  return this.afa.authState.pipe( map(user =>{
    if(user){
      return true
    }

    return this.route.parseUrl("/login")
  })
  
  ) 

 
  }




  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.afa.authState.pipe( map(user =>{
        if(user){
          return true
        }
    
        return this.route.parseUrl("/login")
      })
      
      ) 
      }
  
}
