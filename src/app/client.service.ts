import { Injectable } from '@angular/core';
import { Client } from '@core/service/client.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '@shared';
import { FormBuilder } from '@angular/forms';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private key: string = "usr-barka";

  private change$ = new BehaviorSubject<Client>(this.store.get(this.key) as Client);

  constructor(private http: HttpClient, private fb: FormBuilder, private store: LocalStorageService ) { }

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
    //this.change$.next();
  }

  get() {
    return this.change$.getValue();
  }

  clientListe(): Observable<Client[]>{
    return this.http.get<Client[]>(this.baseUrl+"/client/all");
  }

  userAdd(user: Client): Observable<Client>{
    return this.http.post<Client>(this.baseUrl+"/client/add", user);
  }

  clientModifier(clientMod: Client): Observable<Client> {
    return this.http.put<Client>(this.baseUrl+"/client/client-update/"+clientMod.id, clientMod);
  }

  deleteClient(clientDel: Client): Observable<Client>{
    return this.http.delete<Client>(this.baseUrl+"/user/user-delete/"+clientDel.id);
  }

  getAllClients(): Observable<Client[]>{
    return this.http.get<Client[]>(this.baseUrl+"/client/count-clients");
  }



}
