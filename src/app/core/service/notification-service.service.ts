import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, Observable } from "rxjs";
import { Notification, NotificationType } from "../models/notifSevice";

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  constructor(private toastr: ToastrService) {}

  showSuccess(message) {
    this.toastr.success(message);
  }

  showError(message) {
    this.toastr.error(message);
  }

  showInfo(message) {
    this.toastr.info(message);
  }

  showWarning(message) {
    this.toastr.warning(message);
  }
}
