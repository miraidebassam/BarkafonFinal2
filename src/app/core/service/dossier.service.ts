import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Dossier } from './../models/dossier';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DossierService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  listerDossier():Observable<Dossier[]>{
    return this.http.get<Dossier[]>(this.baseUrl+"/dossier/all");
  }

  addDossier(dossier: Dossier){
    return this.http.post<Dossier>(this.baseUrl+"/dossier/add", dossier);
  }

  dossierModifier(dossierMod: Dossier): Observable<Dossier> {
    return this.http.put<Dossier>(this.baseUrl+"/dossier/dossier-update/"+dossierMod.id, dossierMod);
  }

  deleteDossier(dossierDel: Dossier): Observable<Dossier>{
    return this.http.delete<Dossier>(this.baseUrl+"/dossier/dossier-delete/"+dossierDel.id);
  }

  getAllDossiers(): Observable<Dossier[]>{
    return this.http.get<Dossier[]>(this.baseUrl+"/dossier/count-dossier");
  }


  public doSearch(dossierSer: Dossier) : Observable<Dossier> {
    return this.http.get<Dossier>(this.baseUrl + "/dossier/dossier-search/"+dossierSer.nom_cocontractant);
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
    client: ['', Validators.required],
    intitule: ['', Validators.required],
    objetEmail: ['', Validators.required],
    dateNotification: ['', Validators.required],
    datePremierNotif: ['', Validators.required],
    dateSecondNotif: ['', Validators.required],
    etatNotif:['', Validators.required],
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
      client: '',
      intitule: '',
      objetEmail: '',
      dateNotification: '',
      datePremierNotif: '',
      dateSecondNotif: '',
      etatNotif:'',
    });
  }

}
