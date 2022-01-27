import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';
import { User } from '@core/authentication/interface';
import { LocalStorageService } from '@shared';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private key: string = "usr-barka";

  private change$ = new BehaviorSubject<User>(this.store.get(this.key) as User);

  constructor(private http: HttpClient, private fb: FormBuilder, private store: LocalStorageService) { }

  baseUrl = environment.baseUrlDefault;


  change() {
    return this.change$.pipe(share());
  }

  valid() {
    // console.log("Result : "+JSON.stringify(this.get()))
    return !!this.get();
  }

  clear() {
    this.store.remove(this.key);
    this.change$.next({});
  }

  get() {
    return this.change$.getValue();
  }

  userListe(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl+"/user/lister");
  }

  userAdd(user: User): Observable<User>{
    return this.http.post<User>(this.baseUrl+"/user/user-add", user);
  }

  userLogin(login: string): Observable<User>{
    return this.http.get<User>(this.baseUrl+"/user/auth/"+login)
  }

  userModifier(userMod: User): Observable<User>{
    return this.http.put<User>(this.baseUrl+"/user/user-update/"+userMod.id, userMod);
  }

  deleteUser(userDel: User): Observable<User>{
    return this.http.delete<User>(this.baseUrl+"/user/user-delete/"+userDel.id);
  }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl+"/user/count-users");
  }


  form = this.fb.group({
    id: ['', Validators.required],
    login: ['', Validators.required],
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    profile: ['', Validators.required],
    telephone: [''],
    email: ['', Validators.required],
    etat: ['', Validators.required],
  });

  inicializerFormGroup(){
    this.form.setValue({
      id: '',
      login: '',
      nom: '',
      prenom: '',
      profile: '',
      telephone: '',
      email: '',
      etat: '',
    });
  }

}
