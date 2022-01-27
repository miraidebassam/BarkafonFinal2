import { UserService } from '@core/service/user.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '@core';
import { AuthService } from '@core/authentication/auth.service';
import { debounceTime, tap } from 'rxjs/operators';
import { User } from '@core/authentication/interface';
import { LocalStorageService } from '@shared';

@Component({
  selector: 'app-user',
  template: `
    <button
      class="matero-toolbar-button matero-avatar-button"
      mat-button
      [matMenuTriggerFor]="menu"
    >
      <!-- <img class="matero-avatar" [src]="user.avatar" width="32" alt="avatar" /> -->
      <span class="matero-username" fxHide.lt-sm>{{ user.nom }} | {{user.prenom}}</span>
    </button>

    <mat-menu #menu="matMenu">
      <button routerLink="/profile/overview" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>{{ 'user.profile' | translate }}</span>
      </button>
      <!-- <button routerLink="/profile/settings" mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>{{ 'user.settings' | translate }}</span>
      </button> -->
      <button mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>{{ 'user.logout' | translate }}</span>
      </button>
    </mat-menu>
  `,
})
export class UserComponent implements OnInit {
  user: User;

  constructor(
    private router: Router,
    private menu: MenuService,
    private auth: AuthService,
    private userService: UserService,
    private storage: LocalStorageService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.user = this.storage.getByKey();
    this.changeDetectorRef.detectChanges()
  }

  logout() {
    this.auth.logout();
  }
}
