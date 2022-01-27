import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

export interface Notification {
  id?: any;
  intitule?: any;
  objetEmail?: any;
  listeAdresse?: any;
  contenu?: any;
  dateNotif?: any;
  datePremierNotif?: any;
  dateSecondNotif?: any;
  etat?: any;
}

export interface MessageResponse{
  message?: string;
  etat?: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class NotifService {
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  url = environment.baseUrlDefault;

  ajouterNotif(client: Notification): Observable<MessageResponse>{
    return this.http.post<MessageResponse>(`${this.url}/notification/add`, client);
  }

  getAllNotifs(): Observable<Notification[]>{
    return this.http.get<Notification[]>(this.url+"/notification/all");
  }

  notificationModifier(notifMod: Notification): Observable<Notification>{
    return this.http.put<Notification>(this.url+"/notification/notification-update/"+notifMod.id, notifMod);
  }

  deleteNotification(notifDel: Notification): Observable<Notification>{
    return this.http.delete<Notification>(this.url+"/notification/notification-delete/"+notifDel.id);
  }

  form = this.fb.group({
    id: ['', Validators.required],
    intitule: ['', Validators.required],
    objetEmail: ['', Validators.required],
    listeAdresse: ['', Validators.required],
    contenu: ['', Validators.required],
    dateNotif: [''],
    datePremierNotif: ['', Validators.required],
    dateSecondNotif: ['', Validators.required],
    etat: ['', Validators.required],
    type_archive: ['', Validators.required],
  });

  inicializerFormGroup(){
    this.form.setValue({
      id: '',
      intitule: '',
      objetEmail: '',
      listeAdresse: '',
      contenu: '',
      dateNotif: '',
      datePremierNotif: '',
      dateSecondNotif: '',
      etat: '',
      type_archive: ''
    });
  }

}
