import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profiles } from '@core/models/profiles';
import { Client, ClientService } from '@core/service/client.service';
import { NotifService } from '@core/service/notif.service';
import { ProfileService } from '@core/service/profile.service';
import { UpdateClientComponent } from '../update-client/update-client.component';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.scss']
})
export class DetailClientComponent implements OnInit {

  clientFormDetail: FormGroup
  roles: Profiles;

  constructor(private fb: FormBuilder,
    private notifService: NotifService,
    public dialogRefUpdate: MatDialogRef<UpdateClientComponent>,private profil: ProfileService,
    private clientService: ClientService, @Inject(MAT_DIALOG_DATA) public client: Client) { }

  ngOnInit(): void {
    this.allProfiles();

    this.clientFormDetail = this.fb.group({
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

  allProfiles(){
    return this.profil.listProfiles().subscribe(result=>{
      this.roles = result;
    })
  }

  onClose() {
    this.clientFormDetail.reset();
    this.dialogRefUpdate.close();
  } 
}
