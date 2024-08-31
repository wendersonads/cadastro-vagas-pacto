import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Token } from "../models/Oauth";
import { KEY_TOKEN } from "../models/keysStorage";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  public usernameAndToken: Token | null = null;
  private userDataSubject = new BehaviorSubject<Token | null>(this.getUsernameAndToken());

  public userData$ = this.userDataSubject.asObservable();
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

  public setUsernameAndToken(token: Token): void {
     if (token !== null) {
      localStorage.setItem(KEY_TOKEN, JSON.stringify(token));
      this.userDataSubject.next(token);
     }
  }

  private getAuthHeaders(): HttpHeaders {
    const tokenData = this.getUsernameAndToken();
    let headers = new HttpHeaders();

    if (tokenData) {
      headers = headers.set('token', `${tokenData.token}`);
    }

    return headers;
  }
}
