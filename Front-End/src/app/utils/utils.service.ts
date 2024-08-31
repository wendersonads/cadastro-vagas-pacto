import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  constructor(private messageService: MessageService) {}

  public async messageError(errorApi?: HttpErrorResponse) {
    if (errorApi) {
      this.messageService.add({
        severity: "error",
        detail: errorApi.error.message,
        life: 2000,
      });
    } 
  }

  public async messageSucess(success?: string) {
    if (success) {
      this.messageService.add({
        severity: "success",
        detail: success,
        life: 2000,
      });
    }
  }
}
