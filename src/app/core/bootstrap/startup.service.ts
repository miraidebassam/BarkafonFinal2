import { UserService } from '@core/service/user.service';
import { LocalStorageService } from '@shared/services/storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iif, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  private menu$ = this.http.get('/me/menu');

  constructor(private menu: MenuService, private http: HttpClient, private userService: UserService) {}

  load() {
    this.userService.change().pipe(switchMap(() => iif(() => this.userService.valid(), this.menu$, of({ menu: [] })))).subscribe((response: any) => {
        this.menu.recursMenuForTranslation(response.menu, 'menu');
        this.menu.set(response.menu);
      });
    return Promise.resolve();
  }
}
