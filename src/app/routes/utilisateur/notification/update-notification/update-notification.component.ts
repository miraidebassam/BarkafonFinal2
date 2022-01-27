import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notification } from '@core/models/notification';
import { NotifService } from '@core/service/notif.service';

@Component({
  selector: 'app-update-notification',
  templateUrl: './update-notification.component.html',
  styleUrls: ['./update-notification.component.scss']
})
export class UpdateNotificationComponent implements OnInit {

  notifFormModif: FormGroup
  constructor(private fb: FormBuilder,
    public dialogRefUpdate: MatDialogRef<UpdateNotificationComponent>, private http: HttpClient,
    private notifService: NotifService,@Inject(MAT_DIALOG_DATA) public notification: Notification) { }

  ngOnInit(): void {
    this.notifFormModif = this.fb.group({
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

  modifierNotif(){
    this.notifService.notificationModifier(this.notifFormModif.value).subscribe((result: Notification) => {
      if(result != null){
        console.log("Modification effectue avec success!");
      }
    });
    this.onClose();
  }

  onClose(){
    this.notifFormModif.reset();
    this.dialogRefUpdate.close();
  }

}
