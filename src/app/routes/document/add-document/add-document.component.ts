import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '@core/authentication/interface';
import { DocumentService } from '@core/service/document.service';
import { UserService } from '@core/service/user.service';
import { ClientService } from 'app/client.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Document } from '../../../core/models/document'
import { LocalStorageService } from '@shared';
import { NotificationServiceService } from '@core/service/notification-service.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})

export class AddDocumentComponent implements OnInit {

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;

  piece = 'Selectionner fichier';
  fileName: any;
  file: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource: MatTableDataSource<Document>;
  dataLoading: boolean = true;

  searchText: any;


  clientList: import("c:/Users/delll/Desktop/Stage - Orange/Projet Barkafon/Application/barkafon-web/src/app/core/service/client.service").Client[];

  emails: FormGroup
  datePremier: Date;
  dateSecond: Date;
  dateAlerte: Date;

  userList: User[]
  documentFormAddNew : FormGroup

  constructor(private fb: FormBuilder, private documentService: DocumentService,private clientService: ClientService, private userService: UserService,
    public dialogRef: MatDialogRef<AddDocumentComponent>, private http: HttpClient,
    private storage: LocalStorageService, private notif: NotificationServiceService){ }

  ngOnInit(): void {

    this.documentFormAddNew = this.fb.group({
      nomDocument: [''],
      objetDocument: [''],
      dateNotification: [''],
      typeDocument: [''],
      delaiReponse: [''],
      dateAlerte: [''],
      emails: [''],
      statut: [''],
      piece_jointe: [''],
      search: [''],
      intitule: [''],
      objetEmail: [''],
      datePremierNotif: [''],
      dateSecondNotif: [''],
      etatNotif:['']
    })
    this.listClient();
    this.listUser();
    this.loadDocuments();
  }

  /*   ajouterDocument() {
    this.documentService.ajouterDocument(this.documentFormAddNew.value).subscribe(resutl =>{
      console.log("New Document : "+resutl.message)
      this.notifService.showSuccess(resutl.message);
    },
    (error)=>{
      console.log("DDDDDDDDDDDDDDDD : "+JSON.stringify(error))
      this.notifService.showError(JSON.stringify(error.message)
      )})
  }
 */

  listUser(){
    this.userService.userListe().subscribe(resultClients =>{
      this.userList = resultClients;
      console.log(this.userList);
    })
  }

  ajouterDocument(){
    var dateAjout = new Date(this.dateAlerte);
    var formData:any = new FormData();
    formData.append('nomDocument', this.documentFormAddNew.get('nomDocument').value);
    formData.append('objetDocument', this.documentFormAddNew.get('objetDocument').value);
    formData.append('dateNotification', this.documentFormAddNew.get('dateNotification').value);
    formData.append('typeDocument', this.documentFormAddNew.get('typeDocument').value);
    formData.append('delaiReponse', this.documentFormAddNew.get('delaiReponse').value);
    formData.append('dateAlerte', this.documentFormAddNew.get('dateAlerte').value);
    formData.append('emails', this.documentFormAddNew.get('emails').value);
    formData.append('statut', this.documentFormAddNew.get('statut').value);
    formData.append('piece_jointe', this.file);
    formData.append('intitule', this.documentFormAddNew.get('intitule').value);
    formData.append('objetEmail', this.documentFormAddNew.get('objetEmail').value);
    formData.append('datePremierNotif', new Date(dateAjout.setDate(dateAjout.getDate() - 30)).toISOString().slice(0,10));
    formData.append('dateSecondNotif', new Date(dateAjout.setDate(dateAjout.getDate() - 15)).toISOString().slice(0,10));

    console.log("Les donnees saisie::::::::", this.documentFormAddNew.value);

   this.http.post('http://localhost:8197/api/document/add', formData).subscribe(
      (response) => this.notif.showSuccess("Document ajoute avec success !!"),
      (err) => console.log(err),
    );
    this.loadDocuments();
    this.dialogRef.close();
  }

  private loadDocuments(){
    this.documentService.documentListe().subscribe(
      (document: Document[]) =>
      this.handlerDocuments(document),
      (err)=> this.handlerDocumentError(err)
    );
  }

  private handlerDocuments(users: Document[],){
    console.log(users)
    this.dataLoading =  false;
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.filterPredicate = this.createFilter();
  }

  private handlerDocumentError(err) {
      console.error(err);
  }

  onClose(){
    this.dialogRef.close();
  }

  listClient(){
    this.clientService.clientListe().subscribe(resultClients =>{
      this.clientList = resultClients;
      console.log(this.clientList);
    })
  }

  fileChangeEvent(fileInput: any) {
       this.piece = fileInput.target.files[0];
/*         this.piece = '';
      Array.from(fileInput.target.files).forEach((file: File) => {
        console.log(file);
        this.piece += file.name;
      });
 */
      this.uploadFileInput.nativeElement.value = "";
  }

  onFileSelected(event){
    const fileName:File = event.target.files[0];
      if (fileName) {
        this.piece = fileName.name;
      }
      this.file = event.target.files[0];
        console.log(fileName.name);
    }
}
