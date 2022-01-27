import { NouveauComponent } from './nouveau/nouveau.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListerComponent } from './lister/lister.component';

const routes: Routes = [
  {path: 'nouveau', component: NouveauComponent},
  {path: 'lister', component: ListerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DossierRoutingModule { }
