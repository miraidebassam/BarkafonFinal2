import { Observable } from 'rxjs';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { FormBuilder, Validators } from '@angular/forms';

export interface Client {
  id?: string;
  nom?: string;
  prenom?: string;
  type_client?: string;
  adresse?: string;
  nif?: string;
  telephone?: string;
  email?: string;
  foto?: string;
  etat?: string;
  data_creation?: string;
  data_modification?: string;
}

export interface MessageResponse{
  message?: string;
  etat?: boolean;
}

export interface Dossier{
  id?: string;
  id_client?: string;
  nom_contrat?: string;
  lieu_execution_contrat?: string;
  data_signature?: string;
  duree_contrat?: string;
  date_fin_contrat?: string;
  type_contrat?: string;
  sout_typologie_contrat?: string;
  reference_contrat?: string;
  priece_jointe?: string;
  date_alerte?: string;
  emails_alerter?: string;
  nom_document?: string;
  objet__document?: string;
  date_notification?: string;
  statut?: string;
  agent?: string;
}


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = environment.baseUrlDefault;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  baseUrl = environment.baseUrlDefault;

  ajouterClient(client: Client): Observable<MessageResponse>{
    return this.http.post<MessageResponse>(`${this.url}/client/add`, client);
  }

  getAllClients(): Observable<Client[]>{
    return this.http.get<Client[]>(this.url+"/client/all");
  }

  clientsListe(): Observable<Client[]>{
    return this.http.get<Client[]>(this.url+"/client/all");
  }

  getTotalClients():Observable<number>{
    return this.http.get<number>(this.url+"/client/count-clients");
  }

  sevaFiles(formData: FormData): Observable<HttpEvent<string[]>>{
    return this.http.post<string[]>(`${this.url}/file/upload`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  readFiles(filename: string){
    return this.http.get(`${this.url}/file/download/${filename}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  clientModifier(clientMod: Client): Observable<Client>{
    return this.http.put<Client>(this.baseUrl+"/client/client-update/"+clientMod.id, clientMod);
  }

  deleteClient(clientDel: Client): Observable<Client>{
    return this.http.delete<Client>(this.baseUrl+"/client/client-delete/"+clientDel.id);
  }


  form = this.fb.group({
    id: ['', Validators.required],
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    type_client: ['', Validators.required],
    adresse: ['', Validators.required],
    nif: [''],
    telephone: ['', Validators.required],
    email: ['', Validators.required],
    foto: ['', Validators.required],
    etat: ['', Validators.required],
    date_creation: ['', Validators.required],
    date_modification: ['', Validators.required],
  });

  inicializerFormGroup(){
    this.form.setValue({
      id: '',
      nom: '',
      prenom: '',
      type_client: '',
      adresse: '',
      nif: '',
      telephone: '',
      email: '',
      foto: '',
      etat: '',
      date_creation: '',
      date_modification: '',
    });
  }


}
