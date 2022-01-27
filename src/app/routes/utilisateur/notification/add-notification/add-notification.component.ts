import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { NotifService } from '@core/service/notif.service';
import { Notification } from '@core/models/notification';
import { Dossier } from '@core/models/dossier';
import { Document } from '@core/models/document';
import { DossierService } from '@core/service/dossier.service';
import { DocumentService } from '@core/service/document.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss']
})
export class AddNotificationComponent implements OnInit {

  notifFormAddNew: FormGroup
  listeAdresse: FormControl
  selectedIndex = 'Autres Documents'

  listNotification: Notification[] =[]
  dossierList: Dossier[];
  documentList: Document[];


  @ViewChild('matTabGroup') tab: MatTabGroup;
  //@ViewChild('UploadFileInput') uploadFileInput: ElementRef;

  piece = 'Choisir un fichier';
  searchText: any

  constructor(private notifService: NotifService, private documentService: DocumentService,
              private fb: FormBuilder, private dossierService: DossierService,
              public dialogRef: MatDialogRef<AddNotificationComponent>,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.notifFormAddNew = this.fb.group({
      intitule: [''],
      objetEmail: [''],
      listeAdresse: [''],
      contenu: [''],
      dateNotif: [''],
      datePremierNotif: [''],
      dateSecondNotif: [''],
      etat: [''],
      id_contrat: [''],
      id_document: [''],
      type_archive: [''],
      search:['']
    });
    this.listContrats();
    this.listDocuments();
  }

  add(event: MatChipInputEvent, inputName): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.listNotification.push({listeAdresse: value});
    }

    // Clear the input value
    //event.chipInput!.clear();
    inputName.value="";

    //this.listeAdresse.setValue(null);
  }

  remove(notification: Notification): void {
    const index = this.listNotification.indexOf(notification);

    if (index >= 0) {
      this.listNotification.splice(index, 1);
    }
  }

  tabClick(event) {
  console.log(event);

  }
  ajouterNotif(){
    console.log(this.tab.selectedIndex);
    this.notifFormAddNew.value['type_archive'] = this.tab.selectedIndex === 0 ? "autres-documents" : "Contrat";
    console.log(this.notifFormAddNew.value);

    this.notifService.ajouterNotif(this.notifFormAddNew.value).subscribe((result)=>{
      if(result !==null){
        console.log("Enregistrement effectué avec succès!!!");
      }
    });
    this.dialogRef.close();
    this.notifFormAddNew.reset();
  }

  fileChangeEvent(fileInput: any) {
    this.piece = fileInput.target.files[0];
    //this.uploadFileInput.nativeElement.value = "";
  }


  onClose() {
    this.notifFormAddNew.reset();
    this.dialogRef.close();
  }

  listContrats(){
    this.dossierService.listerDossier().subscribe(resultContrat => {
      this.dossierList = resultContrat;
      console.log(this.dossierList);
    })
  }

  listDocuments(){
    this.documentService.documentListe().subscribe(resultDocument => {
      this.documentList = resultDocument;
      console.log(this.documentList);
    })
  }
}
