import { NotifService } from './../../../core/service/notif.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '@core/service/user.service';
import { ProfileService } from '@core/service/profile.service';
import { Profiles } from '@core/models/profiles';
import { User } from '@core/authentication/interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationServiceService } from '@core/service/notification-service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  userFormAddNew: FormGroup;
  profilList: Profiles;

  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataLoading: boolean = true;


  constructor(private fb: FormBuilder,private profilService: ProfileService, private userService: UserService, public dialogRef: MatDialogRef<AddComponent>, 
    private notif: NotificationServiceService) { }

  ngOnInit(): void {
    this.userFormAddNew = this.fb.group({
      login: [''],
      nom: [''],
      prenom: [''],
      profile: [''],
      telephone: [''],
      email: [''],
      etat: [''],
    });
    this.listRoles();
    this.loadUsers();
  }

  ajouterUser(){
    this.userService.userAdd(this.userFormAddNew.value).subscribe((result)=>{
      if(result !==null){
        this.notif.showSuccess("Enregistrement effectué avec succès!");
        console.log("Enregistrement effectué avec succès!!!");
      }
    });
    this.dialogRef.close();
    this.userFormAddNew.reset();
    this.loadUsers();
  }

  private loadUsers(){
    this.userService.userListe().subscribe(
      (client: User[]) =>
      this.handlerUsers(client),
      (err)=> this.handlerUsersError(err)
    );
  }

  private handlerUsers(clients: User[],){
    console.log(clients)
    this.dataLoading =  false;
    this.dataSource = new MatTableDataSource(clients);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.filterPredicate = this.createFilter();
  }

  private handlerUsersError(err) {
      console.error(err);
  }


  onClose() {
    this.userFormAddNew.reset();
    this.dialogRef.close();
  }

  listRoles(){
    this.profilService.listProfiles().subscribe(resultRoles =>{
      this.profilList = resultRoles;
    })
  }

}
