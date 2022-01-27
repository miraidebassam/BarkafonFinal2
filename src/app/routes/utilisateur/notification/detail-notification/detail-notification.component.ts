import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifService } from '@core/service/notif.service';
import { Notification } from '@core/models/notification'
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-detail-notification',
  templateUrl: './detail-notification.component.html',
  styleUrls: ['./detail-notification.component.scss']
})
export class DetailNotificationComponent implements OnInit {

  notificationFormDetail: FormGroup;

  notifications: Notification[]

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fb: FormBuilder,
    private notifService: NotifService,
    public dialogRefUpdate: MatDialogRef<DetailNotificationComponent>,
     @Inject(MAT_DIALOG_DATA) public notification: Notification) { }

  ngOnInit(): void {
    this.notificationFormDetail = this.fb.group({
      id : [this.notification.id, Validators.required],
      intitule: [this.notification.intitule, Validators.required],
      objetEmail: [this.notification.objetEmail, Validators.required],
      listeAdresse: [this.notification.listeAdresse, Validators.required],
      contenu: [this.notification.contenu, Validators.required],
      dateNotif: [this.notification.dateNotif, Validators.required],
      datePremierNotif: [this.notification.datePremierNotif, Validators.required],
      dateSecondNotif: [this.notification.dateSecondNotif, Validators.required],
      etat: [this.notification.etat, Validators.required],
    })
  }

  onClose(){
    this.notificationFormDetail.reset();
    this.dialogRefUpdate.close();
  }


}
