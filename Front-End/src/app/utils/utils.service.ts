import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Token } from "../models/Oauth";
import { KEY_TOKEN, KEY_USER } from "../models/keysStorage";
import { BehaviorSubject } from "rxjs";
import { UserStorage } from "../models/user";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  public usernameAndToken: Token | null = null;
  private userDataSubject = new BehaviorSubject<Token | null>(this.getUsernameAndToken());
  private userStorage = new BehaviorSubject<UserStorage | null>(this.getDataUserStorage());
  public vValidaAdmin: boolean = false;
  public userData$ = this.userDataSubject.asObservable();
  public userStorage$ = this.userStorage.asObservable();
  constructor(private messageService: MessageService, private router: Router) {
    this.userStorage$.subscribe((userStorage) => {
      if (userStorage !== null) {
         if (userStorage.idPerfilUsuario === 1) {
          this.vValidaAdmin = true;
         }
      };
    });
  }

  public async messageError(errorApi?: HttpErrorResponse) {
    if (errorApi) {
      this.messageService.add({
        severity: "error",
        detail: errorApi.error.message,
        life: 2000,
      });
    }
  }

  public async messageErrorCantidatarVaga(errorApi?: HttpErrorResponse) {
    if (errorApi) {
      let errorMessage = 'Erro desconhecido';
      
      if (typeof errorApi.error === 'string') {
        try {
          const errorObj = JSON.parse(errorApi.error);
          errorMessage = errorObj.message || errorApi.message || errorMessage;
        } catch (e) {
          errorMessage = errorApi.error;
        }
      } else if (errorApi.error?.message) {
        errorMessage = errorApi.error.message;
      } else {
        errorMessage = errorApi.message || errorMessage;
      }
      this.messageService.add({
        severity: "error",
        detail: errorMessage,
        life: 2000,
      });
    }
  }


  public async messageErrorGeneric(error: string) {
    if (error) {
      this.messageService.add({
        severity: "error",
        detail: error,
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

  public setDataUserStorage(userStorage: UserStorage): void {
    if (userStorage !== null) {
      localStorage.setItem(KEY_USER,JSON.stringify(userStorage));
    }
  }

  public getDataUserStorage(): UserStorage | null {
    let user: UserStorage | null = null;
    const userStorage = localStorage.getItem(KEY_USER);
    if (userStorage !== null) {
      user = JSON.parse(userStorage);
    }
    return user;
  }
 
  public getHeaders(): HttpHeaders {
    const tokenData = this.getUsernameAndToken();
    let headers = new HttpHeaders();

    if (tokenData) {
      headers = headers.set('token', `${tokenData.token}`);
    }

    return headers;
  }

  public redirecionarLogin(): void {
    localStorage.removeItem(KEY_TOKEN);
    this.router.navigate(["/login"]);
  }
}
