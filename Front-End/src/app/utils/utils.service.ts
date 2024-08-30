import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Message } from "primeng/api";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  messages: Message[] = [];

  constructor() {}

  public messageError(errorApi?: HttpErrorResponse, sucess?: any): Message[] {
    if (errorApi) {
      const errorMessage = errorApi.message;
      this.messages.push({severity: 'error', summary: 'Erro', detail: errorMessage});
    }
    return this.messages;
  }
}
