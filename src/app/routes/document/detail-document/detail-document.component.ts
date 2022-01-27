import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentService } from '@core/service/document.service';
import { NotifService } from '@core/service/notif.service';
import { ProfileService } from '@core/service/profile.service';
import { Document } from '../../../core/models/document'

@Component({
  selector: 'app-detail-document',
  templateUrl: './detail-document.component.html',
  styleUrls: ['./detail-document.component.scss']
})
export class DetailDocumentComponent implements OnInit {

  piece = 'Select File';
  documentFormDetail: FormGroup
  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;

  constructor(private fb: FormBuilder,
    private notifService: NotifService,
    public dialogRefUpdate: MatDialogRef<DetailDocumentComponent>,
    private documentService: DocumentService, @Inject(MAT_DIALOG_DATA) public document: Document) { }

  ngOnInit(): void {
    this.documentFormDetail = this.fb.group({
      id: [this.document.id, Validators.required],
      nomDocument: [this.document.nomDocument, Validators.required],
      objetDocument: [this.document.objetDocument, Validators.required],
      dateNotification: [this.document.dateNotification, Validators.required],
      typeDocument: [this.document.typeDocument, Validators.required],
      delaiReponse: [this.document.delaiReponse, Validators.required],
      dateAlerte: [this.document.dateAlerte],
      emails: [this.document.emails, Validators.required],
      statut: [this.document.statut, Validators.required],
      piece_jointe: [this.document.piece_jointe, Validators.required],
      intitule: [this.document.intitule, Validators.required],
      objetEmail: [this.document.objetEmail, Validators.required],
      datePremierNotif: [this.document.datePremierNotif, Validators.required],
      dateSecondNotif: [this.document.dateSecondNotif, Validators.required],
      etatNotif:[this.document.etatNotif, Validators.required]
    });
  }

  onClose(){
  }
  fileChangeEvent(fileInput: any) {
      this.piece = fileInput.target.files[0];
      this.uploadFileInput.nativeElement.value = "";
  }

  downloadFile(){
    window.open(this.document.piece_jointe);
  }


}
