import { T } from '@angular/cdk/keycodes';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { DocumentService } from '@core/service/document.service';
import { DossierService } from '@core/service/dossier.service';
import { UserService } from '@core/service/user.service';
import { ClientService } from 'app/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      .mat-raised-button {
        margin-right: 8px;
        margin-top: 8px;
      }
    `,
  ],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  //providers: [DashboardService],
})

export class DashboardComponent implements OnInit {
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  //dataSource = this.dashboardSrv.getData();

  //messages = this.dashboardSrv.getMessages();

  //charts = this.dashboardSrv.getCharts();
 
  _totalDocument: number;
  _totalContrat: number;
  _totalUtilisateur: number;
  _totalClients: number;

  //stats = this.dashboardSrv.getStats();

  constructor(
    //private ngZone: NgZone,
    private documentService: DocumentService, 
    private clientService: ClientService,
    private userService: UserService,
    private dossierService: DossierService
    //private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
   this.totalDocuments();
   this.totalContrats();
   this.totalClients();
   this.totalUsers();
  }

  totalDocuments(){
    this.documentService.getTotalDocuments().subscribe((data: any)=> {
     // console.log("Dta::::::::::",data);
      this._totalDocument = data
      
    })
  }

  totalContrats(){
    this.dossierService.getAllDossiers().subscribe((data: any)=> {
      //console.log("Dta::::::::::",data);
      this._totalContrat = data
    })
  }

  totalClients(){
    this.clientService.getAllClients().subscribe((data: any)=> {
     // console.log("Dta::::::::::",data);
      this._totalClients = data
      
    })
  }

  totalUsers(){
    this.userService.getAllUsers().subscribe((data: any)=> {
      //console.log("Dta::::::::::",data);
      this._totalUtilisateur = data
      
    })
  }

  /* initChart() {
    this.chart1 = new ApexCharts(document.querySelector('#chart1'), this.charts[0]);
    this.chart1.render();
    this.chart2 = new ApexCharts(document.querySelector('#chart2'), this.charts[1]);
    this.chart2.render();
  } */
}
