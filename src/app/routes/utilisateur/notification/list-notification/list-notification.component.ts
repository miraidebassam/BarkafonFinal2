import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Notification } from '@core/service/notif-service.service';
import { NotifService } from '@core/service/notif.service';
import { AddNotificationComponent } from '../add-notification/add-notification.component';
import { DetailNotificationComponent } from '../detail-notification/detail-notification.component';
import { UpdateNotificationComponent } from '../update-notification/update-notification.component';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.scss']
})
export class ListNotificationComponent implements OnInit {

  displayedColumns: string[] = [
    "intitule",
    "objetEmail",
    //"listeAdresse",
    //"contenu",
    //"fichier",
    "dateNotif",
    "datePremierNotif",
    "dateSecondNotif",
    //"etat",
    "action",
  ];

  dataSource: MatTableDataSource<Notification>;
  dataLoading: boolean = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;



  constructor(private notifService: NotifService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  private loadNotifications(){
    this.notifService.getAllNotifs().subscribe(
      (notif: Notification[]) =>
      this.handlerNotif(notif),
      (err)=> this.handleNotifError(err)
    );
  }

  private handlerNotif(notifications: Notification[]){
    console.log(notifications)
    this.dataLoading =  false;
    this.dataSource = new MatTableDataSource(notifications);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.filterPredicate = this.createFilter();
  }

  private handleNotifError(err) {
    console.error(err);
  }

  createNewNotification(){
    this.notifService.inicializerFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus =  true;
    dialogConfig.width = "750%";
    this.dialog.open(AddNotificationComponent, dialogConfig).afterClosed().subscribe(() =>{
      this.loadNotifications();
    });
  }

  updateHoldNotification(row: Notification){
    this.notifService.inicializerFormGroup();
    this.dialog.open(UpdateNotificationComponent, {
      width: "650px",
      data: row,
      disableClose: false,
      autoFocus: true
    }).afterClosed().subscribe(rs=>{
      this.loadNotifications();
    })
  }

  detailNotification(row: Notification){
    this.notifService.inicializerFormGroup();
    this.dialog.open(DetailNotificationComponent, {
      width: "650px",
      data: row,
      disableClose: false,
      autoFocus: true
    }).afterClosed().subscribe(rs=>{
      this.loadNotifications();
    })
  }

  deleteNotification(row: Notification){
    if(confirm("Vous etes sur de vouloir supprimer cette notification?")){
      this.notifService.deleteNotification(row)
      .subscribe(
        response => {
          console.log(response);
          this.loadNotifications();
        },
        error => {
          console.log(error);
        }
      )
      console.log("User supprimer avec success!");
    }
  }

}
