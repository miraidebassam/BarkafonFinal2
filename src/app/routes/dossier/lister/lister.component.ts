import { AddComponent } from './../add/add.component';
import { UpdateComponent } from './../update/update.component';
import { DossierService } from './../../../core/service/dossier.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Dossier } from '@core/models/dossier';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetailDossierComponent } from '../detail-dossier/detail-dossier.component';
import * as XLSX from 'xlsx';
import { ExportToExcelService } from '@core/service/export-to-excel.service';
import { LocalStorageService } from '@shared';
import { environment } from '@env/environment';


@Component({
  selector: 'app-lister',
  templateUrl: './lister.component.html',
  styleUrls: ['./lister.component.scss']
})

export class ListerComponent implements OnInit {

  searchText: any;
  selectedValue: any;

  displayedColumns: string[] = [
    'nom_cocontractant',
    'lieu_execution',
    'montant',
    //'date_signature',
    //'duree',
    //'date_fin',
    'type',
    'sous_typologie',
    'reference',
    //'date_alerte',
    //'emails',
    'client',
    //'piece_jointe',
    'action',
  ];

  //dataSource: MatTableDataSource<Dossier>;
  dataSource: MatTableDataSource<Dossier>
  dataLoading: boolean = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  piece = 'Select File';

  dossierData: Dossier;
  nomCocontractant: string ;
  title = 'angular-app';
  fileName= 'ListDossier.xlsx';

  isCanDelete: boolean = false;
  isCanUpdate: boolean = false;
  isCanExport: boolean = false;
  isCanDetail: boolean = false;
  isCanCreate: boolean = false;


  userProfil: any;
  key = environment.key;

  dataDossiers: Dossier[];


  constructor(private dossierService: DossierService, private dialog: MatDialog,
    private excelService: ExportToExcelService, private storage: LocalStorageService) { }

  ngOnInit(): void {
    this.userProfil = this.storage.get(this.key).profile;
    this.checkProfi(this.userProfil)
    this.loadDossier();
  }

  ngAfterViewInit() {
    this.loadDossier();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    console.log('this.dataSource.data :::::::::',this.dataSource.data);
    console.log('this.dataSource.filteredData :::::::::',this.dataSource.filteredData);
    /* Le dataSource.filteredDta renvoi les donnees de la recherche effectue, donc je lui afectue a mon
    dataClient pour avoir la possibilite d'exporter seulement les donnees de la recherche et au cas ou on
    effectue pas une recherche, on exporte toutes les donnees */
    this.dataDossiers = this.dataSource.filteredData;
  }

  exportAsXLSX() {
      console.log('Data :', this.dataDossiers);
      this.excelService.exportAsExcel(this.dataDossiers, 'dossier_data');
  }

  newDossier(){
    this.dossierService.inicializerFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus =  true;
    dialogConfig.width = "650px";
    this.dialog.open(AddComponent, dialogConfig).afterClosed().subscribe(res =>{
      this.loadDossier();
    });
  }

  loadDossier(){
    this.dossierService.listerDossier().subscribe(
      (resul: Dossier[]) =>
      this.handlerDossier(resul),
      (err)=>this.handleDossierError(err),
      );
  }

  private handlerDossier(dossiers: Dossier[]) {
    console.log(dossiers)
    this.dataLoading =  false;
    this.dataSource = new MatTableDataSource(dossiers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //this.dataSource.filterPredicate = this.createFilter();
  }

  private handleDossierError(err) {
    console.log(
      "Problème de chargement de campagne CBM!",
      "Avertissement"
    );
  }

  createNewDossier(){
    this.dossierService.inicializerFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus =  true;
    dialogConfig.width = "750px";
    this.dialog.open(AddComponent, dialogConfig).afterClosed().subscribe(res =>{
      this.loadDossier();
    });
  }

  updateHoldDossier(row: Dossier){
    console.log(row);
    console.log(row.emails);
    this.dossierService.inicializerFormGroup();
    this.dialog.open(UpdateComponent,{
        width: "750%",
        data: row,
        disableClose: false,
        autoFocus: true
    }).afterClosed().subscribe(rs=>{
      this.loadDossier();
    });

  }

  detailDossier(row: Dossier){
    this.dossierService.inicializerFormGroup();
    this.dialog.open(DetailDossierComponent, {
      width: "800px",
      data: row,
      disableClose: true,
      autoFocus: false,
    }).afterClosed().subscribe(rs=>{
      this.loadDossier();
    });
  }

  deleteDossier(row: Dossier){
    if(confirm("Vous etes sur de vouloir supprimer ce contrat ?")){
      this.dossierService.deleteDossier(row)
      .subscribe(
       response => {
         console.log(response);
         this.loadDossier();
       },
       error => {
         console.log(error);
       }
     )
   console.log("Dossier supprime!");
    }
  }

  fileChangeEvent(fileInput: any) {
    this.piece = fileInput.target.files[0];
    this.uploadFileInput.nativeElement.value = "";
  }

  exportExcel(){
    /* Passage de l'id du table */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generer workbook et additionner le worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* sauvegarder le fichier */
    XLSX.writeFile(wb, this.fileName);
  }

  checkProfi(profil){
    console.log("Profil::::::", profil)
    switch(profil){
      case "Juridique":
        this.isCanDelete = false
        this.isCanExport = true
        this.isCanDetail = true
        this.isCanCreate = true
        this.isCanUpdate = true
        break;
      case "Comptable":
        this.isCanDelete = false
        this.isCanExport = true
        this.isCanDetail = true
        this.isCanCreate = true
        this.isCanUpdate = false
        break;
      case "Support SI":
        this.isCanDelete = false
        this.isCanExport = true
        this.isCanDetail = true
        this.isCanCreate = false
        this.isCanUpdate = false
        break;
      case "Admin":
        this.isCanDelete = true
        this.isCanUpdate = true
        this.isCanExport = true
        this.isCanDetail = true
        this.isCanCreate = true
        break;
        default:
        console.log("Une erreur s'est produite !");
    }
  }



}

