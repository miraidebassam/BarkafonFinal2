import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dossier } from '@core/models/dossier';
import { Client } from '@core/service/client.service';
import { DossierService } from '@core/service/dossier.service';
import { NotifService } from '@core/service/notif.service';
import { ClientService } from 'app/client.service';

@Component({
  selector: 'app-detail-dossier',
  templateUrl: './detail-dossier.component.html',
  styleUrls: ['./detail-dossier.component.scss']
})

export class DetailDossierComponent implements OnInit {

  dossierFormDetail: FormGroup
  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;

  fileDossier: Dossier;

  profilList: Client[];

  constructor(private fb: FormBuilder,
    private notifService: NotifService,
    public dialogRefUpdate: MatDialogRef<DetailDossierComponent>,
    private dossierService: DossierService, @Inject(MAT_DIALOG_DATA) public dossier: Dossier, public clientService: ClientService) { }

    ngOnInit(): void {
    this.listClient();
    this.dossierFormDetail = this.fb.group({
      id : [this.dossier.id, Validators.required],
      nom_cocontractant: [this.dossier.nom_cocontractant, Validators.required],
      lieu_execution: [this.dossier.lieu_execution, Validators.required],
      montant: [this.dossier.montant, Validators.required],
      date_signature: [this.dossier.date_signature, Validators.required],
      duree: [this.dossier.duree, Validators.required],
      date_fin: [this.dossier.date_fin],
      type: [this.dossier.type, Validators.required],
      sous_typologie: [this.dossier.sous_typologie, Validators.required],
      reference: [this.dossier.reference, Validators.required],
      piece_jointe: [this.dossier.piece_jointe, Validators.required],
      date_alerte: [this.dossier.date_alerte, Validators.required],
      emails: [this.dossier.emails, Validators.required],
      client: [this.dossier.client, Validators.required],
      intitule: [this.dossier.intitule, Validators.required],
      objetEmail: [this.dossier.objetEmail, Validators.required],
      dateNotification: [this.dossier.dateNotification, Validators.required],
      datePremierNotif: [this.dossier.datePremierNotif, Validators.required],
      dateSecondNotif: [this.dossier.dateSecondNotif, Validators.required],
      etatNotif:[this.dossier.etatNotif, Validators.required]
    });
  }

  listClient(){
    this.clientService.clientListe().subscribe(resultClients =>{
      this.profilList = resultClients;
    })
    //console.log(this.profilList);
  }

  onClose(){
  }

  downloadFile(){
    window.open(this.dossier.piece_jointe);
  }

}
