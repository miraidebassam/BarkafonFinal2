import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Client, ClientService } from '@core/service/client.service';
import { Dossiers } from '@core/models/Dossiers';
import { Document } from '@core/models/document';
import { DocumentService } from '@core/service/document.service';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Injectable()
export class DashboardService {

  client: Client[] = [];
  dossiers: Dossiers[] = [];
  document: Document[] = [];

  url = environment.baseUrlDefault;
  baseUrl = environment.baseUrlDefault;

 
  constructor(private http: HttpClient, private clientService: ClientService,
    private documentService: DocumentService) {}

  getData():Observable<number> {
    return this.http.get<number>(this.baseUrl+"/client/count-clients");
  }

   

  /* getStats() {
    return this.stats;
  } */
}
