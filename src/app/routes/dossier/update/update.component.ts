import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@core/authentication/interface';
import { Dossier } from '@core/models/dossier';
import { Client } from '@core/service/client.service';
import { DossierService } from '@core/service/dossier.service';
import { NotificationServiceService } from '@core/service/notification-service.service';
import { UserService } from '@core/service/user.service';
import { ClientService } from 'app/client.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  piece_jointe = 'Selectionner Fichier';
  file: any;

  searchText: any;

  dossierFormUpdate: FormGroup
  profilList: Client[];
  userList: User[];
  listEmail: any;

  dateAlerte: Date;

  selectedValue: any ;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSourceDossier: MatTableDataSource<Dossier>;
  dataLoading: boolean = true;



  constructor(private fb: FormBuilder,
    public dialogRefUpdate: MatDialogRef<UpdateComponent>, private userService: UserService,
    private dossierService: DossierService,@Inject(MAT_DIALOG_DATA) public dossier: Dossier, 
    public clientService: ClientService, private http: HttpClient, private notif: NotificationServiceService) { }

  ngOnInit(): void {

    //this.listEmail = this.dossier.emails;
    //console.log(this.dossier.emails);
    this.selectedValue = this.dossier.emails.split(",");
    this.dateAlerte = this.dossier.date_alerte;
    //console.log(this.selectedValue);

    this.listClient();
    this.listUsers();

    this.dossierFormUpdate = this.fb.group({
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
      piece_jointe: [this.piece_jointe],
      date_alerte: [this.dateAlerte, Validators.required],
      emails: [this.selectedValue, Validators.required],
      client: [this.dossier.client, Validators.required],
      search: [Validators.required],
      intitule: [this.dossier.intitule, Validators.required],
      objetEmail: [this.dossier.objetEmail, Validators.required],
      dateNotification: [this.dossier.dateNotification, Validators.required],
      datePremierNotif: [this.dossier.datePremierNotif, Validators.required],
      dateSecondNotif: [this.dossier.dateSecondNotif, Validators.required],
      etatNotif:[this.dossier.etatNotif, Validators.required]
    });

    this.loadDossiers();
  }

  onClose() {
    this.dossierFormUpdate.reset();
    this.dialogRefUpdate.close();
  }

  modifierDossier(){
    var formData: any = new FormData();
    var dateAjout = new Date(this.dateAlerte);
    formData.set('nom_cocontractant', this.dossierFormUpdate.get('nom_cocontractant').value);
    formData.set('lieu_execution', this.dossierFormUpdate.get('lieu_execution').value);
    formData.set('montant', this.dossierFormUpdate.get('montant').value);
    formData.set('date_signature', this.dossierFormUpdate.get('date_signature').value);
    formData.set('duree', this.dossierFormUpdate.get('duree').value);
    formData.set('date_fin', this.dossierFormUpdate.get('date_fin').value);
    formData.set('type', this.dossierFormUpdate.get('type').value);
    formData.set('sous_typologie', this.dossierFormUpdate.get('sous_typologie').value);
    formData.set('reference', this.dossierFormUpdate.get('reference').value);
    formData.set('piece_jointe',this.file);
    formData.set('date_alerte', this.dossierFormUpdate.get('date_alerte').value);
    formData.set('emails', this.dossierFormUpdate.get('emails').value);
    formData.set('client', this.dossierFormUpdate.get('client').value);
    formData.set('intitule', this.dossierFormUpdate.get('intitule').value);
    formData.set('objetEmail', this.dossierFormUpdate.get('objetEmail').value);
    formData.set('dateNotification', this.dossierFormUpdate.get('dateNotification').value);
    formData.set('datePremierNotif', new Date(dateAjout.setDate(dateAjout.getDate() - 30)).toISOString().slice(0,10));
    formData.set('dateSecondNotif', new Date(dateAjout.setDate(dateAjout.getDate() - 15)).toISOString().slice(0,10));
    formData.set('etatNotif', this.dossierFormUpdate.get('etatNotif').value);

    this.http.put('http://localhost:8197/api/dossier/dossier-upd/'+this.dossier.id, formData).subscribe(
      (response) => this.notif.showSuccess("Document modifie avec succes !!!"),
      (error) => console.log(error)
    )
    this.onClose();
    this.loadDossiers();
  }

  updateSansFichier(){
    var formData: any = new FormData();
    var dateAjout = new Date(this.dateAlerte);
    formData.set('nom_cocontractant', this.dossierFormUpdate.get('nom_cocontractant').value);
    formData.set('lieu_execution', this.dossierFormUpdate.get('lieu_execution').value);
    formData.set('montant', this.dossierFormUpdate.get('montant').value);
    formData.set('date_signature', this.dossierFormUpdate.get('date_signature').value);
    formData.set('duree', this.dossierFormUpdate.get('duree').value);
    formData.set('date_fin', this.dossierFormUpdate.get('date_fin').value);
    formData.set('type', this.dossierFormUpdate.get('type').value);
    formData.set('sous_typologie', this.dossierFormUpdate.get('sous_typologie').value);
    formData.set('reference', this.dossierFormUpdate.get('reference').value);
    formData.set('date_alerte', this.dossierFormUpdate.get('date_alerte').value);
    formData.set('emails', this.dossierFormUpdate.get('emails').value);
    formData.set('client', this.dossierFormUpdate.get('client').value);
    formData.set('intitule', this.dossierFormUpdate.get('intitule').value);
    formData.set('objetEmail', this.dossierFormUpdate.get('objetEmail').value);
    formData.set('dateNotification', this.dossierFormUpdate.get('dateNotification').value);
    formData.set('datePremierNotif', new Date(dateAjout.setDate(dateAjout.getDate() - 30)).toISOString().slice(0,10));
    formData.set('dateSecondNotif', new Date(dateAjout.setDate(dateAjout.getDate() - 15)).toISOString().slice(0,10));
    formData.set('etatNotif', this.dossierFormUpdate.get('etatNotif').value);

    this.http.put('http://localhost:8197/api/dossier/dossier-update/'+this.dossier.id, formData).subscribe(
      (response) => this.notif.showSuccess("Document modifie ave succes !!!"),
      (error) => console.log(error)
    )
    this.onClose();
    this.loadDossiers();
  }

  loadDossiers(){
    this.dossierService.listerDossier().subscribe(
      (dossier: Dossier[]) =>
      this.handlerDossier(dossier),
      (err)=> this.handlerDossierError(err)
    );
  }

  private handlerDossier(dossiers: Dossier[]){
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

  listClient(){
    this.clientService.clientListe().subscribe(resultClients =>{
      this.profilList = resultClients;
    })
  }

  listUsers(){
    this.userService.userListe().subscribe(resultClients =>{
      this.userList = resultClients;
    })
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



