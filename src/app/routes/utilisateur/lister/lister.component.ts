import { NotifService } from './../../../core/service/notif.service';
import { AddComponent } from './../add/add.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from './../../../core/service/user.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateComponent } from '../update/update.component';
import { User } from '@core/authentication/interface';
import { DetailUserComponent } from '../detail-user/detail-user.component';
import * as XLSX from 'xlsx';
import { ExportToExcelService } from '@core/service/export-to-excel.service';
import { environment } from '@env/environment';
import { LocalStorageService } from '@shared';
import { NotificationServiceService } from '@core/service/notification-service.service';

@Component({
  selector: 'app-lister',
  templateUrl: './lister.component.html',
  styleUrls: ['./lister.component.scss']
})
export class ListerComponent implements OnInit {

  displayedColumns: string[] = [
    "login",
    "nom",
    "prenom",
    "email",
    "telephone",
    "profile",
    "etat",
    //"data_creation",
    "action",
  ];

  title = 'angular-app';
  fileName= 'ListUsers.xlsx';
  dataUsers: User[];

  isCanDelete: boolean = false;
  isCanUpdate: boolean = false;
  isCanExport: boolean = false;
  isCanDetail: boolean = false;
  isCanCreate: boolean = false;


  userProfil: any;

  key = environment.key;

  dataSource: MatTableDataSource<User>;
  dataLoading: boolean = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog,
    private notif: NotificationServiceService, private excelService: ExportToExcelService, private storage: LocalStorageService) { }

  ngOnInit(): void {
    this.userProfil = this.storage.get(this.key).profile;
    this.checkProfi(this.userProfil)
    this.loadUsers();
  }

  ngAfterViewInit() {

  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    console.log('this.dataSource.data :::::::::',this.dataSource.data);
    console.log('this.dataSource.filteredData :::::::::',this.dataSource.filteredData);
    /* Le dataSource.filteredDta renvoi les donnees de la recherche effectue, donc je lui afectue a mon
    dataClient pour avoir la possibilite d'exporter seulement les donnees de la recherche et au cas ou on
    effectue pas une recherche, on exporte toutes les donnees */
    this.dataUsers = this.dataSource.filteredData;
  }

  exportAsXLSX() {
      console.log('Data :', this.dataUsers);
      this.excelService.exportAsExcel(this.dataUsers, 'user_data');
  }

  private loadUsers(){
    this.userService.userListe().subscribe(
      (user: User[]) =>
      this.handlerUser(user),
      (err)=> this.handleUserError(err)
    );
  }

  private handlerUser(users: User[]){
      console.log(users)
      this.dataLoading =  false;
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.dataSource.filterPredicate = this.createFilter();
  }

  private handleUserError(err) {
      console.error(err);
  }

  createNewUser(){
    this.userService.inicializerFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus =  true;
    dialogConfig.width = "650px";
    this.dialog.open(AddComponent, dialogConfig).afterClosed().subscribe(() =>{
      this.loadUsers();
    });
  }

  updateHoldUser(row: User){
    this.userService.inicializerFormGroup();
    this.dialog.open(UpdateComponent,{
        width: "650px",
        data: row,
        disableClose: false,
        autoFocus: true
    }).afterClosed().subscribe(rs=>{
      this.loadUsers();
    });
  }

  detailUser(row){
    this.userService.inicializerFormGroup();
    this.dialog.open(DetailUserComponent,{
      width: "650px",
      data: row,
      disableClose: false,
      autoFocus: true
      }).afterClosed().subscribe(rs=>{
        this.loadUsers();
    });
  }

  deleteUser(row: User){
    if(confirm("Vous etes sur de vouloir supprimer cet utilisateur ?")){
    this.userService.deleteUser(row)
       .subscribe(
        response => {
          this.notif.showSuccess("Utilisateur supprime avec succes !");
          console.log(response);
          this.loadUsers();
        },
        error => {
          this.notif.showError("Une erreur s'est produit !");
          console.log(error);
        }
      )
      console.log("User supprime!");
      this.loadUsers();
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
