import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@core/authentication/interface';
import { DocumentService } from '@core/service/document.service';
import { UserService } from '@core/service/user.service';
import { Document } from '../../../core/models/document'

@Component({
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.scss']
})
export class UpdateDocumentComponent implements OnInit, AfterViewInit {

  documentFormUpdate: FormGroup

  dataSource: MatTableDataSource<Document>;
  dataLoading: boolean = true;

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;

  piece_jointe = 'Selectionner Fichier';
  fileName: any;
  file: any;

  searchText: any;
  dateAlerteDoc: Date;


  userList: User[] = []

  selectedValue: any ;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private fb: FormBuilder,
    private userService: UserService, private http: HttpClient,
    public dialogRefUpdate: MatDialogRef<UpdateDocumentComponent>,
    private documentService: DocumentService,@Inject(MAT_DIALOG_DATA) public document: Document) { }


  ngAfterViewInit(): void {
    this.loadDocuments();
  }

  ngOnInit(): void {
    console.log(this.document.emails);
    this.selectedValue = this.document.emails.split(",");

    this.dateAlerteDoc = this.document.dateAlerte;

    console.log(this.selectedValue);

    this.listUsers();
    this.documentFormUpdate = this.fb.group({
      id: [this.document.id, Validators.required],
      nomDocument: [this.document.nomDocument, Validators.required],
      objetDocument: [this.document.objetDocument, Validators.required],
      dateNotification: [this.document.dateNotification, Validators.required],
      typeDocument: [this.document.typeDocument, Validators.required],
      delaiReponse: [this.document.delaiReponse, Validators.required],
      dateAlerte: [this.dateAlerteDoc, Validators.required],
      emails: [this.selectedValue, Validators.required],
      statut: [this.document.statut, Validators.required],
      piece_jointe: [this.piece_jointe, Validators.required],
      search: [Validators.required],
      intitule: [this.document.intitule, Validators.required],
      objetEmail: [this.document.objetEmail, Validators.required],
      datePremierNotif: [this.document.datePremierNotif, Validators.required],
      dateSecondNotif: [this.document.dateSecondNotif, Validators.required],
      etatNotif:[this.document.etatNotif, Validators.required]
    });
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

  listUsers(){
    this.userService.userListe().subscribe(resultUser => {
      this.userList = resultUser;
    })
  }

  modifierDocument(){
    var formData: any = new FormData();
    formData.set('nomDocument', this.documentFormUpdate.get('nomDocument').value);
    formData.set('objetDocument', this.documentFormUpdate.get('objetDocument').value);
    formData.set('dateNotification', this.documentFormUpdate.get('dateNotification').value);
    formData.set('typeDocument', this.documentFormUpdate.get('typeDocument').value);
    formData.set('delaiReponse', this.documentFormUpdate.get('delaiReponse').value);
    formData.set('dateAlerte', this.documentFormUpdate.get('dateAlerte').value);
    formData.set('emails', this.documentFormUpdate.get('emails').value);
    formData.set('statut', this.documentFormUpdate.get('statut').value);
    formData.set('piece_jointe', this.file);
    formData.set('intitule', this.documentFormUpdate.get('intitule').value);
    formData.set('objetEmail', this.documentFormUpdate.get('objetEmail').value);
    formData.set('datePremierNotif', this.documentFormUpdate.get('datePremierNotif').value);
    formData.set('dateSecondNotif', this.documentFormUpdate.get('dateSecondNotif').value);
    formData.set('etatNotif', this.documentFormUpdate.get('etatNotif').value);


    this.http.put('http://localhost:8197/api/document/document-upd/'+this.document.id, formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
    this.onClose();
    this.loadDocuments();
  }

  updateSansFichier(){
    var formData: any = new FormData();
    formData.set('nomDocument', this.documentFormUpdate.get('nomDocument').value);
    formData.set('objetDocument', this.documentFormUpdate.get('objetDocument').value);
    formData.set('dateNotification', this.documentFormUpdate.get('dateNotification').value);
    formData.set('typeDocument', this.documentFormUpdate.get('typeDocument').value);
    formData.set('delaiReponse', this.documentFormUpdate.get('delaiReponse').value);
    formData.set('dateAlerte', this.documentFormUpdate.get('dateAlerte').value);
    formData.set('emails', this.documentFormUpdate.get('emails').value);
    formData.set('statut', this.documentFormUpdate.get('statut').value);
    formData.set('intitule', this.documentFormUpdate.get('intitule').value);
    formData.set('objetEmail', this.documentFormUpdate.get('objetEmail').value);
    formData.set('datePremierNotif', this.documentFormUpdate.get('datePremierNotif').value);
    formData.set('dateSecondNotif', this.documentFormUpdate.get('dateSecondNotif').value);
    formData.set('etatNotif', this.documentFormUpdate.get('etatNotif').value);

    this.http.put('http://localhost:8197/api/document/document-update/'+this.document.id, formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
    this.onClose();
    this.loadDocuments();  }

  onClose() {
    this.dialogRefUpdate.close();
  }

  onFileSelected(event){
    const fileName:File = event.target.files[0];
      if (fileName) {
        this.piece_jointe = fileName.name;
      }
      this.file = event.target.files[0];
        console.log(fileName.name);
    }
}
