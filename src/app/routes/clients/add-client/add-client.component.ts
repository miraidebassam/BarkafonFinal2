import { NotifService } from './../../../core/service/notif.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../../core/service/client.service';
import { HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Client } from '@core/models/client';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationServiceService } from '@core/service/notification-service.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {

  // @@ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';

  dataSource: MatTableDataSource<Client>;
  dataLoading: boolean = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  clientFormAddNew: FormGroup;
  dossierFormAddNew: FormGroup;

  filenames: string[] = [];
  fileStatus = {status: '', requestType: '', percent: 0};

  constructor(private fb: FormBuilder, private clientService: ClientService, 
    public dialogRefUpdate: MatDialogRef<AddClientComponent>, private notif: NotificationServiceService) {}

  ngOnInit(): void {
    this.clientFormAddNew = this.fb.group({
      nom: [''],prenom: [''],type_client: [''],
      adresse: [''],nif: [''],telephone: [''],
      email: [''],foto: [''],etat: [''],
      data_creation: [''],data_modification: [''],
  });

    this.dossierFormAddNew = this.fb.group({
      id_client: [''],nom_contrat: [''],lieu_execution_contrat: [''],
      data_signature: [''],duree_contrat: [''],
      date_fin_contrat: [''],type_contrat: [''],
      sout_typologie_contrat: [''],reference_contrat: [''],priece_jointe: [''],
      date_alerte: [''],emails_alerter: [''],
      nom_document: [''],objet__document: [''],
      date_notification: [''],statut: [''],
    });
  }

  private loadClients(){
    this.clientService.clientsListe().subscribe(
      (client: Client[]) =>
      this.handlerClients(client),
      (err)=> this.handlerClientsError(err)
    );
  }

  private handlerClients(clients: Client[],){
    console.log(clients)
    this.dataLoading =  false;
    this.dataSource = new MatTableDataSource(clients);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.filterPredicate = this.createFilter();
  }

  private handlerClientsError(err) {
      console.error(err);
  }

  ajouteClient() {
    this.clientService.ajouterClient(this.clientFormAddNew.value).subscribe(resutl =>{
      console.log("New User : "+resutl.message)
      this.notif.showSuccess("Utilisateur ajoute avec succes !!");
      this.onClose();
      this.loadClients();
    },
    (error)=>{
      console.log("DDDDDDDDDDDDDDDD : "+JSON.stringify(error))
       this.notif.showError(JSON.stringify(error.message)
      ) })
    this.loadClients();
  }

  onClose() {
    this.dialogRefUpdate.close();
  }

  uploadFiles(files: File[]): void {
    const formDate = new FormData();
    if (files.length !== 0) {
      for (const file of files) {
        formDate.append('file', file, file.name);
      }
      this.clientService.sevaFiles(formDate).subscribe(event => {
        console.log(event);
        this.reportProgress(event);
      }),
        (error: HttpErrorResponse) => {
          console.log(error);
        };
    }
  }

  downloadFile(filename: string) {
    this.clientService.readFiles(filename).subscribe(
      event => {
        console.log(event);
        this.reportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private reportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total, 'Uploading');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total, 'Downlaoding');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if(httpEvent.body instanceof Array){
          for (const fileName of httpEvent.body){
            this.filenames.unshift(fileName)
          }
        }else{
          console.log("Download the file...");
          // saveAs(new File([httpEvent.body], 'File-Name', {type: 'text/json; charset=utf-8'}));
          // saveAs(new File([httpEvent.body], httpEvent.headers.get('File-Name'), {type: `${httpEvent.headers.get('Content-Type')}; charset=utf-8`}));
          // fileSaver.saveAs(new Blob([httpEvent.body], {type: `${httpEvent.headers.get('Content-Type')}`}), httpEvent.headers.get('File-Name'));
        }
        break;
        default :
        console.log(httpEvent)
        break;
    }
  //   throw new Error('Method not implemented.');
  }

  updateStatus(loaded: number, total: number, requestType: string) {
    this.fileStatus.status ='progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }
}
