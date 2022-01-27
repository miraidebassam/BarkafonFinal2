import { MatDialogRef } from '@angular/material/dialog';
import { DossierService } from './../../../core/service/dossier.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'app/client.service';
import { Client } from '../../../core/models/client'
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@core/authentication/interface';
import { UserService } from '@core/service/user.service';
import { Dossier } from '@core/models/dossier';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NotificationServiceService } from '@core/service/notification-service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  piece = "Selectionner fichier";
  file: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSourceDossier: MatTableDataSource<Dossier>;
  dataLoading: boolean = true;


  date_sign: Date;
  date_fin: Date;
  duree: any;

  datePremier = Date;
  dateSecond: Date;
  dateAlerte: Date;

  dataSource: MatTableDataSource<Client>;

  searchText: any;
  selectedValue: any;

  clientList: import("c:/Users/delll/Desktop/Stage - Orange/Projet Barkafon/Application/barkafon-web/src/app/core/service/client.service").Client[];

  documentFormAddNew : FormGroup


  //clients: Client[] = [];
  dossierFormAddNew: FormGroup;

  dosAddNew: FormGroup;
  userList: User[]


  constructor(private fb: FormBuilder, private dossierService: DossierService, private userService: UserService,
    private dialogRef: MatDialogRef<AddComponent>, private clientService: ClientService, 
    private http: HttpClient, private notif: NotificationServiceService) { }

  ngOnInit(): void {
     this.dossierFormAddNew = this.fb.group({
      nom_cocontractant: [''],
      lieu_execution: [''],
      montant: [''],
      date_signature: [''],
      duree: [''],
      date_fin: [''],
      type: [''],
      sous_typologie: [''],
      reference: [''],
      piece_jointe: [''],
      date_alerte: [''],
      emails: [''],
      client: [''],
      search: [''],
      intitule: [''],
      objetEmail: [''],
      dateNotification:[''],
      datePremierNotif: [''],
      dateSecondNotif: [''],
      etatNotif:['']

    });
    this.listUsers();
    this.listClient();
  }

  ajouterDossier(){
    var formData: any = new FormData();
    var dateAjout = new Date(this.dateAlerte);
    formData.append('nom_cocontractant', this.dossierFormAddNew.get('nom_cocontractant').value);
    formData.append('lieu_execution', this.dossierFormAddNew.get('lieu_execution').value);
    formData.append('montant', this.dossierFormAddNew.get('montant').value);
    formData.append('date_signature', this.dossierFormAddNew.get('date_signature').value);
    formData.append('duree', this.dossierFormAddNew.get('duree').value);
    formData.append('date_fin', this.dossierFormAddNew.get('date_fin').value);
    formData.append('type', this.dossierFormAddNew.get('type').value);
    formData.append('sous_typologie', this.dossierFormAddNew.get('sous_typologie').value);
    formData.append('reference', this.dossierFormAddNew.get('reference').value);
    formData.append('piece_jointe', this.file);
    formData.append('date_alerte', this.dossierFormAddNew.get('date_alerte').value);
    formData.append('emails', this.dossierFormAddNew.get('emails').value);
    formData.append('client', this.dossierFormAddNew.get('client').value);
    formData.append('intitule', this.dossierFormAddNew.get('intitule').value);
    formData.append('objetEmail', this.dossierFormAddNew.get('objetEmail').value);
    formData.append('dateNotification', this.dossierFormAddNew.get('dateNotification').value);
    formData.append('datePremierNotif',  new Date(dateAjout.setDate(dateAjout.getDate() - 30)).toISOString().slice(0,10));
    formData.append('dateSecondNotif', new Date(dateAjout.setDate(dateAjout.getDate() - 15)).toISOString().slice(0,10));
    formData.append('etatNotif', this.dossierFormAddNew.get('etatNotif').value);

    this.http.post('http://localhost:8197/api/dossier/add', formData).subscribe(
      (response) => this.notif.showSuccess("Contrat ajoute avec succes !!"),
      (error) => console.log(error)
    )
    this.loadDossiers();
    this.dialogRef.close();
  }

  loadDossiers(){
    this.dossierService.listerDossier().subscribe(
      (dossier: Dossier[]) =>
      this.handlerDocuments(dossier),
      (err)=> this.handlerDossierError(err)
    );
  }

  private handlerDocuments(dossiers: Dossier[],){
    console.log(dossiers)
    this.dataLoading =  false;
    this.dataSourceDossier = new MatTableDataSource(dossiers);
    this.dataSourceDossier.paginator = this.paginator;
    this.dataSourceDossier.sort = this.sort;
    // this.dataSource.filterPredicate = this.createFilter();
  }

  private handlerDossierError(err) {
      console.error(err);
  }

  onClose() {
    this.dosAddNew.reset();
    this.dialogRef.close();
  }

  listUsers(){
    this.userService.userListe().subscribe(resultUser => {
      this.userList = resultUser;
      console.log(this.userList);
    })
  }

  listClient(){
    this.clientService.clientListe().subscribe(resultClients =>{
      this.clientList = resultClients;
      console.log(this.clientList);
    })
  }

  fileChangeEvent(fileInput: any) {
      this.piece = fileInput.target.files[0];
      this.piece = '';
      Array.from(fileInput.target.files).forEach((file: File) => {
        console.log(file);
        this.piece += file.name;
      });
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


  valueChangeEvent(){
    var dateDebut = new Date(this.date_sign);
    var dateFin = new Date(this.date_fin);
    var diff_temps = dateFin.getTime() - dateDebut.getTime();
    this.duree = diff_temps / (1000 * 3600 * 24);


    var dateAjout = new Date(this.dateAlerte);
    console.log("Date d'alerte:::::::::::::::::::::::::", dateAjout.toLocaleString());
    dateAjout.setDate(dateAjout.getDate() - 30)
    console.log("Date Premier(30 jours avast)::::::::::", dateAjout.toLocaleString());

    console.log("Date d'alerte:::::::::::::::::::::::::", dateAjout.toLocaleString());
    dateAjout.setDate(dateAjout.getDate() - 15)
    console.log("Date Premier(15 jours avast)::::::::::", dateAjout.toLocaleString());
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


}


