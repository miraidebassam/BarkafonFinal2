import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListNotificationComponent } from './notification/list-notification/list-notification.component';
import { ListerComponent } from './lister/lister.component';

const routes: Routes = [
  {path: "lister", component: ListerComponent},
  {path: "notification", component: ListNotificationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateurRoutingModule { }
