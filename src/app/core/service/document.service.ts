import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Document } from '../../core/models/document'

export interface MessageResponse{
  message?: string;
  etat?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class DocumentService {

  url = environment.baseUrlDefault;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  baseUrl = environment.baseUrlDefault;

  documentListe(): Observable<Document[]>{
    return this.http.get<Document[]>(this.baseUrl+"/document/all");
  }

  ajouterDocument(document: Document): Observable<Document>{
    console.log("Result :::::", document);
    //return null;
    return this.http.post<Document>(this.baseUrl+"/document/add", document);
  }

  getAllDocuments(): Observable<Document[]>{
    return this.http.get<Document[]>(this.url+"/document/all");
  }

  getTotalDocuments():Observable<any>{
    return this.http.get<any>(this.url+"/document/count-document");
  }

  documentModifier(docMod: Document): Observable<Document>{
    return this.http.put<Document>(this.baseUrl+"/document/document-update/"+docMod.id, docMod);
  }

  deleteDocument(docDel: Document): Observable<Document>{
    return this.http.delete<any>(this.baseUrl+"/document/document-delete/"+docDel.id);
  }

  getExcelData(){
    return this.http.get<Document>(this.baseUrl+"/document/export/", { responseType: 'arraybuffer' as 'json'});
  }

  form = this.fb.group({
    id: ['', Validators.required],
    nomDocument: ['', Validators.required],
    objetDocument: ['', Validators.required],
    dateNotification: ['', Validators.required],
    typeDocument: ['', Validators.required],
    delaiReponse: ['', Validators.required],
    dateAlerte: ['', Validators.required],
    emails: ['', Validators.required],
    statut: ['', Validators.required],
    piece_jointe: ['', Validators.required],
    intitule: ['', Validators.required],
    objetEmail: ['', Validators.required],
    datePremierNotif: ['', Validators.required],
    dateSecondNotif: ['', Validators.required],
    etatNotif:['', Validators.required]
  });

  inicializerFormGroup(){
    this.form.setValue({
      id: '',
      nomDocument: '',
      objetDocument: '',
      dateNotification: '',
      typeDocument: '',
      delaiReponse: '',
      dateAlerte: '',
      emails: '',
      statut: '',
      piece_jointe: '',
      intitule: '',
      objetEmail: '',
      datePremierNotif: '',
      dateSecondNotif: '',
      etatNotif:'',
    });
  }
}
