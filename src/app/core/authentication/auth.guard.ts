import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, Router} from '@angular/router';
import { LocalStorageService } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private store: LocalStorageService) {
  }

  canActivate() {
    //return this.authenticate();
    const user = this.store.getByKey();
    console.log("Guard:::::::::::::", user);
    if (user === null || JSON.stringify(user) === '{}') {
      this.router.navigate(['/auth']);
      return false;
    } else {
      return true;
    }
  }

//  canActivateChild() {
//    return this.authenticate();
//  }

  private authenticate(): boolean {
    const user = this.store.getByKey();
    console.log("Guard:::::::::::::", user);
    if (user === null || JSON.stringify(user) === '{}') {
      this.router.navigate(['/auth']);
      return false;
    } else {
      return true;
    }
  }
}
