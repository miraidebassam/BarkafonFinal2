import { ProfileService } from './../../../core/service/profile.service';
import { UserService } from './../../../core/service/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '@core/authentication/interface';
import { Profiles } from '@core/models/profiles';
import { NotifService } from '@core/service/notif.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NotificationServiceService } from '@core/service/notification-service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  userFormUpdate: FormGroup;
  roles: Profiles;

  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataLoading: boolean = true;



  constructor(private fb: FormBuilder,
    private notifService: NotifService,
    public dialogRefUpdate: MatDialogRef<UpdateComponent>,private profil: ProfileService,
    private userService: UserService,@Inject(MAT_DIALOG_DATA) public user: User,
    private notif: NotificationServiceService) { }

  ngOnInit(): void {

    this.allProfiles();

    this.userFormUpdate = this.fb.group({
      id: [this.user.id, Validators.required],
      login: [this.user.login, Validators.required],
      nom: [this.user.nom, Validators.required],
      prenom: [this.user.prenom, Validators.required],
      profile: [this.user.profile, Validators.required],
      telephone: [this.user.telephone],
      email: [this.user.email, Validators.required],
      etat: [this.user.etat, Validators.required],
    });
    this.loadUsers();
  }

  modifierUser(){
    this.userService.userModifier(this.userFormUpdate.value).subscribe((result: User)=>{
      if(result !== null){
        this.notif.showSuccess("Modification effectué avec succès!!!");
        console.log("Modification effectué avec succès!!!")
      }
    });
    this.onClose();
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
    this.userFormUpdate.reset();
    this.dialogRefUpdate.close();
  }

  allProfiles(){
    return this.profil.listProfiles().subscribe(result=>{
      console.log("Prof : "+JSON.stringify(result));
      this.roles = result;
    })
  }

}
