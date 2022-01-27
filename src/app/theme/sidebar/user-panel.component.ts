import { UserService } from '@core/service/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/authentication/auth.service';
import { Router } from '@angular/router';
import { User } from '@core/authentication/interface';

@Component({
  selector: 'app-user-panel',
  template: `
    <div class="matero-user-panel" fxLayout="column" fxLayoutAlign="center center">
      <!-- <img class="matero-user-panel-avatar" [src]="" alt="avatar" width="64" /> -->
      <h4 class="matero-user-panel-name">{{ user.nom }}</h4>
      <h5 class="matero-user-panel-email">{{ user.email }}</h5>
      <div class="matero-user-panel-icons">
        <!-- <a routerLink="/profile/overview" mat-icon-button>
          <mat-icon class="icon-20">account_circle</mat-icon>
        </a> -->
        <!-- <a routerLink="/profile/settings" mat-icon-button>
          <mat-icon class="icon-20">settings</mat-icon>
        </a> -->
        <!-- <a (click)="logout()" mat-icon-button>
          <mat-icon class="icon-20">exit_to_app</mat-icon>
        </a> -->
      </div>
    </div>
  `,
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit {

  user: User;

  constructor(private router: Router, private auth: AuthService, private userSerivce: UserService) {}

  ngOnInit(): void {
    this.user = this.userSerivce.get();
  }

  logout() {
    this.auth.logout();
  }
}