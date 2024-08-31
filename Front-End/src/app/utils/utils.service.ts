import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Token } from "../models/Oauth";
import { KEY_TOKEN } from "../models/keysStorage";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  public usernameAndToken: Token | null = null;

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

  public getUsernameAndToken(): Token | null {
    const dataSorage = localStorage.getItem(KEY_TOKEN);
    if (dataSorage !== null) {
      this.usernameAndToken = JSON.parse(dataSorage);
    } else {
      this.usernameAndToken = null;
    }
    return this.usernameAndToken;
  }
}
