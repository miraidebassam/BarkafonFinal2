import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment.hmr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profiles } from '@core/models/profiles';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  listProfiles():Observable<Profiles>{
    return this.http.get<Profiles>(this.baseUrl+"/profiles/all");
  }

}
