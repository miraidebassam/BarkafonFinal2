import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client, ClientService } from '@core/service/client.service';
//import { ClientMdel } from '../../../core/models/client'
import { DetailClientComponent } from '../detail-client/detail-client.component';
import { UpdateClientComponent } from '../update-client/update-client.component';
import * as XLSX from 'xlsx';
import { AddClientComponent } from '../add-client/add-client.component';
import { ExportToExcelService } from '@core/service/export-to-excel.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {

  displayedColumns: string[] = [
    "nom",
    "prenom",
    //"type_client",
    "adresse",
    "nif",
    //"telephone",
    "email",
    //"foto",
    //"etat",
    //"data_creation",
    "action"
  ];

  //dataClient: Client[];

  dataSource: MatTableDataSource<Client>;
  dataLoading: boolean = true;

  title = 'angular-app';
  fileName= 'ListClients.xlsx';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataClient: Client[];

  constructor(private clientService: ClientService,private dialog: MatDialog, private excelService: ExportToExcelService) { }

  ngOnInit(): void {
    this.loadClients();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    console.log('this.dataSource.data :::::::::',this.dataSource.data);
    console.log('this.dataSource.filteredData :::::::::',this.dataSource.filteredData);
    /* Le dataSource.filteredDta renvoi les donnees de la recherche effectue, donc je lui afectue a mon
    dataClient pour avoir la possibilite d'exporter seulement les donnees de la recherche et au cas ou on
    effectue pas une recherche, on exporte toutes les donnees */
    this.dataClient = this.dataSource.filteredData;
  }

  exportAsXLSX() {
      console.log('Data :', this.dataClient);
      this.excelService.exportAsExcel(this.dataClient, 'client_data');
  }

  loadClients(){
    return this.clientService.getAllClients().subscribe((lients: Client[])=>{
      this.handlerClient(lients);
    },(err)=>this.handlerClientError(err))
  }

  loadTotalClients(){
    return this.clientService.getTotalClients();
  }

  private handlerClientLoad(clients: Client[]){
    this.dataLoading = false;
    this.dataSource = new MatTableDataSource(clients);
  }

  private handlerClientError(error){
    console.log("Error : "+error);
  }

  private handlerClient(clients: Client[]){
    console.log(clients)
    this.dataClient = clients; //initialisation de dataClient
    this.dataLoading =  false;
    this.dataSource = new MatTableDataSource(clients);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.filterPredicate = this.createFilter();
  }

  createNewClient(){
    console.log(this.loadTotalClients());
    this.clientService.inicializerFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "650px";
    this.dialog.open(AddClientComponent, dialogConfig).afterClosed().subscribe(() => {
      this.loadClients();
    });
  }

  updateHoldClient(row: Client){
    this.clientService.inicializerFormGroup();
    this.dialog.open(UpdateClientComponent,{
        width: "650px",
        data: row,
        disableClose: false,
        autoFocus: true
    }).afterClosed().subscribe(rs=>{
      this.loadClients();
    });
  }

  detailClient(row: Client){
    this.clientService.inicializerFormGroup();
    this.dialog.open(DetailClientComponent,{
      width: "650px",
      data: row,
      disableClose: false,
      autoFocus: true
    }).afterClosed().subscribe(rs => {
      this.loadClients
    })
  }

  deleteClient(row: Client){
    if(confirm("Vous etes sur de vouloir supprimer ce partenaire ?")){
    this.clientService.deleteClient(row)
       .subscribe(
        response => {
          console.log(response);
          this.loadClients();
        },
        error => {
          console.log(error);
        }
      )
      console.log("Client supprime!");
    }
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



}
