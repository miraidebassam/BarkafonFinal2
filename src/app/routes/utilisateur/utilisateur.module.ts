import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';


import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { ListerComponent } from './lister/lister.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { AddNotificationComponent } from './notification/add-notification/add-notification.component';
import { ListNotificationComponent } from './notification/list-notification/list-notification.component';
import { UpdateNotificationComponent } from './notification/update-notification/update-notification.component';
import { DetailNotificationComponent } from './notification/detail-notification/detail-notification.component';


@NgModule({
  declarations: [ListerComponent, AddComponent, UpdateComponent, DetailUserComponent, AddNotificationComponent, ListNotificationComponent, UpdateNotificationComponent, DetailNotificationComponent],
  imports: [SharedModule, UtilisateurRoutingModule]
})
export class UtilisateurModule { }
