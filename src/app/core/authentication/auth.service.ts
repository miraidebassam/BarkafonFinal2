import { UserService } from '@core/service/user.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { guest, User } from './interface';
import { environment } from '@env/environment';
import { LocalStorageService } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private user$ = new BehaviorSubject<User>(guest);
  urlDefautl = environment.baseUrlDefault;
  urlAd = environment.adUrl;
  ad = environment.ad;

  constructor(private http: HttpClient, private userService: UserService, private storage: LocalStorageService) {}

  authLogin(login: string) {
    return this.http.get<User>(this.urlDefautl + '/user/auth/' + login);
  }

  adAuthLogin(username: string, password: string):Observable<any> {
    return this.http.post<any>(this.ad + 'authUser_i/'+ username+ '/'+ password, null);
  }

  logout() {
    this.storage.removeByKey();
    window.location.reload();
    /* return this.http.post('/auth/logout', {}).pipe(
      tap(() => this.userService.clear()),
      map(() => !this.check())
    ); */
  }

  check() {
    return this.userService.valid();
  }
}
