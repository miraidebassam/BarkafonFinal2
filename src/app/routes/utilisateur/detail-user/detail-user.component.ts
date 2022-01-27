import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@core/authentication/interface';
import { Profiles } from '@core/models/profiles';
import { NotifService } from '@core/service/notif.service';
import { ProfileService } from '@core/service/profile.service';
import { UserService } from '@core/service/user.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {

  roles: Profiles;
  userFormDetail: FormGroup

  constructor(private fb: FormBuilder,
    private notifService: NotifService,
    public dialogRefUpdate: MatDialogRef<DetailUserComponent>,private profil: ProfileService,
    private userService: UserService, @Inject(MAT_DIALOG_DATA) public user: User) { }

  ngOnInit(): void {
    this.allProfiles();

    this.userFormDetail = this.fb.group({
      id: [this.user.id, Validators.required],
      login: [this.user.login, Validators.required],
      nom: [this.user.nom, Validators.required],
      prenom: [this.user.prenom, Validators.required],
      profile: [this.user.profile, Validators.required],
      telephone: [this.user.telephone],
      email: [this.user.email, Validators.required],
      etat: [this.user.etat, Validators.required],
    });
  }

  onClose(){
    this.userFormDetail.reset();
    this.dialogRefUpdate.close();
  }

  allProfiles(){
    return this.profil.listProfiles().subscribe(result=>{
      this.roles = result;
    })
  }


}
