import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentService } from '@core/service/document.service';
import { AddDocumentComponent } from '../add-document/add-document.component';
import { UpdateDocumentComponent } from '../update-document/update-document.component';
import { Document } from '../../../core/models/document'
import { DetailDocumentComponent } from '../detail-document/detail-document.component';
import { Client } from '@core/service/client.service';
import { ExportToExcelService } from '@core/service/export-to-excel.service';
import { LocalStorageService } from '@shared';
import { UserService } from '@core/service/user.service';
import { environment } from '@env/environment';


@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.scss']
})

export class ListDocumentComponent implements OnInit {

  displayedColumns: string [] = [
    "nomDocument",
    "objetDocument",
    "dateNotification",
    "typeDocument",
    "action"
  ];

  title = 'angular-app';
  fileName= 'ListDocuments.xlsx';
  client: Client

  isCanDelete: boolean = false;
  isCanUpdate: boolean = false;
  isCanExport: boolean = false;
  isCanDetail: boolean = false;
  isCanCreate: boolean = false;


  userProfil: any;

  dataDocuments: Document[];

  key = environment.key;
  dataSource: MatTableDataSource<Document>;
  dataLoading: boolean = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private documentService: DocumentService, private dialog: MatDialog,private excelService: ExportToExcelService,
    private storage: LocalStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.userProfil = this.storage.get(this.key).profile;
    this.checkProfi(this.userProfil)
    this.loadDocuments();
  }

  loadDocuments(){
    return this.documentService.getAllDocuments().subscribe(
      (docs: Document[])=>{
      this.handlerDocument(docs);
    },(err)=>this.handlerDocumentError(err))
  }

  ladTotalDocuments(){
    return this.documentService.getTotalDocuments();
  }

/*   public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

 */private handlerDocument(documents: Document[]){
    console.log(documents)
    this.dataLoading =  false;
    this.dataSource = new MatTableDataSource(documents);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.filterPredicate = this.createFilter();
  }

  private handlerDocumentError(err) {
    console.error(err);
  }

  createNewDocument(){
    this.documentService.inicializerFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus =  true;
    dialogConfig.width = "650px";
    this.dialog.open(AddDocumentComponent, dialogConfig).afterClosed().subscribe(() =>{
      this.loadDocuments();
    });
  }

  updateHoldDocument(row: Document){
    console.log(row);
    console.log(row.emails);
    this.documentService.inicializerFormGroup();
    this.dialog.open(UpdateDocumentComponent, {
      width: "790%",
      data: row,
      disableClose: false,
      autoFocus: true
    }).afterClosed().subscribe(rs => {
      this.loadDocuments();
    })
  }

  detailDocument(row: Document){
    this.documentService.inicializerFormGroup();
    this.dialog.open(DetailDocumentComponent,{
      width: "650px",
      data: row,
      disableClose: false,
      autoFocus: true
    }).afterClosed().subscribe(rs=>{
      this.loadDocuments();
    })
  }

  deleteDocument(row: Document){
    if(confirm("Vous etes sur de vouloir supprimer ce document ?")){
    this.documentService.deleteDocument(row)
       .subscribe(
        response => {
          console.log(response);
          this.loadDocuments();
        },
        error => {
          console.log(error);
        }
      )
    console.log("Document supprime!");
    }
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    console.log('this.dataSource.data :::::::::',this.dataSource.data);
    console.log('this.dataSource.filteredData :::::::::',this.dataSource.filteredData);
    /* Le dataSource.filteredData renvoi les donnees de la recherche effectue, donc je lui afectue a mon
    dataClient pour avoir la possibilite d'exporter seulement les donnees de la recherche et au cas ou on
    effectue pas une recherche, on exporte toutes les donnees */
    this.dataDocuments = this.dataSource.filteredData;
  }

  exportAsXLSX() {
      console.log('Data :', this.dataDocuments);
      this.excelService.exportAsExcel(this.dataDocuments, 'document_data');
  }

  downloadFile(url) {
    //url = this.piece;
    window.open(url);
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
