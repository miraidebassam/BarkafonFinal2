import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profiles } from '@core/models/profiles';
import { Client } from '@core/service/client.service';
import { NotifService } from '@core/service/notif.service';
import { NotificationServiceService } from '@core/service/notification-service.service';
import { ProfileService } from '@core/service/profile.service';
import { ClientService } from 'app/client.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent implements OnInit {

  clientFormUpdate: FormGroup;
  roles: Profiles;

  constructor( private fb: FormBuilder,
    private notifService: NotifService,
    public dialogRefUpdate: MatDialogRef<UpdateClientComponent>,private profil: ProfileService,
    private clientService: ClientService,@Inject(MAT_DIALOG_DATA) public client: Client, private notif: NotificationServiceService) { }

  ngOnInit(): void {
    this.allProfiles();

    this.clientFormUpdate = this.fb.group({
      id : [this.client.id, Validators.required],
      nom: [this.client.nom, Validators.required],
      prenom: [this.client.prenom, Validators.required],
      type_client: [this.client.type_client, Validators.required],
      adresse: [this.client.adresse, Validators.required],
      nif: [this.client.nif, Validators.required],
      telephone: [this.client.telephone],
      email: [this.client.email, Validators.required],
      foto: [this.client.foto, Validators.required],
      etat: [this.client.etat, Validators.required],

    })
  }

  modifierClient(){
    this.clientService.clientModifier(this.clientFormUpdate.value).subscribe((result: Client)=>{
      if(result !== null){
        this.notif.showSuccess("Modification effectué avec succès!!!")
        console.log("Modification effectué avec succès!!!")
      }
    });
    this.onClose();
  }


  allProfiles(){
    return this.profil.listProfiles().subscribe(result=>{
      this.roles = result;
    })
  }

  onClose() {
    this.clientFormUpdate.reset();
    this.dialogRefUpdate.close();
  }
}
