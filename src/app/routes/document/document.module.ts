import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';

import { DocumentRoutingModule } from './document-routing.module';
import { ListDocumentComponent } from './list-document/list-document.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { UpdateDocumentComponent } from './update-document/update-document.component';
import { DetailDocumentComponent } from './detail-document/detail-document.component';
//import { SearchFilterPipe } from '../../search-filter.pipe';


@NgModule({
  declarations: [ListDocumentComponent, AddDocumentComponent, UpdateDocumentComponent, DetailDocumentComponent],
  imports: [SharedModule, DocumentRoutingModule]
})
export class DocumentModule { }
