import { User } from '@core/authentication/interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/authentication/auth.service';
import { LocalStorageService } from '@shared/services/storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { UserService } from '@core/service/user.service';
import { NotificationServiceService } from '@core/service/notification-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  usr_barkafon: string = "usr_barkafon"
  urlDefautl = environment.baseUrlDefault;

  constructor(private userService: UserService, private http: HttpClient, private fb: FormBuilder, private router: Router, private auth: AuthService,
    private storage: LocalStorageService, private notifService:NotificationServiceService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember_me: [false],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('remember_me');
  }

  // login() {
  //   this.auth.login(this.username.value, this.password.value, this.rememberMe.value)
  //     .pipe(filter(authenticated => authenticated))
  //     .subscribe(
  //       () => this.router.navigateByUrl('/'),
  //       (error: HttpErrorResponse) => {
  //         if (error.status === 422) {
  //           const form = this.loginForm;
  //           const errors = error.error.errors;
  //           Object.keys(errors).forEach(key => {
  //             form.get(key === 'email' ? 'username' : key)?.setErrors({
  //               remote: errors[key][0],
  //             });
  //           });
  //         }
  //       }
  //     );
  // }

  onSubmit() {
    //const { username, password } = this.loginForm;
    //this.ad.authUserAd(username, password).subscribe(restAd => {
        //if (restAd === 1) {
            this.userService.userLogin(this.username.value).subscribe(
                userInfo => {
                    if (userInfo == null) {
                        console.log("Vous n'êtes pas autorisé à vous connecter à cette application, merci de contactez votre administrateur");
                    } else {
                        if (userInfo.etat === true) {
                          this.storage.set(userInfo);
                          this.storage.get(userInfo.profile);
                          this.notifService.showSuccess('Connexion reussit !');
                          this.router.navigateByUrl('/');
                          console.log("Connexion reussit!");
                        } else {
                            console.log("Votre compte a été bloqué, Merci de contacter l'administrateur");
                        }
                    }
                },
                error => {
                   console.log("Erreur inattendue - veuillez réessayer plus tard.");
                  console.log(error);
                });
        /*}  else if (restAd === 0) {
            console.log("Nom d'utilisateur ou mot de passe invalide");
            //this.formSubmitted = false;
        } else {
            console.log("Erreur inattendue - veuillez contacter l'assistance");
            //this.formSubmitted = false;
        } */
    /* //},
    error => {
        console.log("Erreur inattendue - veuillez réessayer plus tard.");
        //this.formSubmitted = false;
    }); */
  }

  loginAuth() {
    console.log(this.username.value, this.password.value)
    this.auth.adAuthLogin(this.username.value, this.password.value).subscribe(
      userInfo => {
        if (userInfo === 0) {
          console.log("Vous n'êtes pas autorisé à vous connecter à cette application, merci de contactez votre administrateur");
          this.notifService.showError('Vous n êtes pas autorisé à vous connecter à cette application, merci de contactez votre administrateur');
        } else {
          this.userService.userLogin(this.username.value).subscribe(
            userInfo => {
              if (userInfo === null) {
                console.log("Vous n'êtes pas autorisé à vous connecter à cette application, merci de contactez votre administrateur");
              } else {
                if (userInfo.etat === true) {
                  this.storage.set(userInfo);
                  this.storage.get(userInfo.profile);
                  this.notifService.showSuccess('Connexion reussit !');
                  this.router.navigateByUrl('/');
                  console.log("Connexion reussit!");
                } else {
                  this.notifService.showWarning("Votre compte a été bloqué, merci de contacter l'administrateur !");
                  console.log("Votre compte a été bloqué, Merci de contacter l'administrateur");
                }
              }
            },
          error => {
            this.notifService.showError('Erreur inattendue - veuillez réessayer plus tard.');
            console.log("Erreur inattendue - veuillez réessayer plus tard.");
            console.log(error);
          });
        }
      },
      error => {
      this.notifService.showError('Erreur inattendue - veuillez réessayer plus tard.');
      console.log("Erreur inattendue - veuillez réessayer plus tard.");
      console.log(error);
    });
     /*  */
   }


  /*   loginAuth() {
  //  this.auth.adAuthLogin(this.username.value, this.password.value).then(functionr=>{
   //   if(r === true) {
        //console.log("Usario encontrado no AD!");
        //this.auth.authLogin(this.username.value).subscribe((rest: User) =>{
        //  if(rest != null){
        //    this.storage.set(rest);
        //    this.router.navigateByUrl('/')
        //  }else{
        //    console.log("Usario nao autorizado no systema!");
        //  }
        //})
       // this.router.navigateByUrl('/');
     // }else{
    //    console.log("Usuario ou senha incorecto!");
    //  }
    //});
  }
 */

}
