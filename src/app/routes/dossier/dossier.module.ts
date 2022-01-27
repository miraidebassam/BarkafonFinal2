import { NgModule } from '@angular/core';

import { DossierRoutingModule } from './dossier-routing.module';
import { NouveauComponent } from './nouveau/nouveau.component';
import { ListerComponent } from './lister/lister.component';
import { SharedModule } from '@shared';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DetailDossierComponent } from './detail-dossier/detail-dossier.component';


@NgModule({
  declarations: [NouveauComponent, ListerComponent, AddComponent, UpdateComponent, DetailDossierComponent],
  imports: [SharedModule,DossierRoutingModule,FlexLayoutModule]
})
export class DossierModule { }
