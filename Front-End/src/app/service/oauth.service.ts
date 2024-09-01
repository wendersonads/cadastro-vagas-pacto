import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Oauth, Token } from "../models/Oauth";
import { API_URL } from "../app.config";
import { User } from "../models/user";
import { UtilsService } from "../utils/utils.service";

@Injectable({
  providedIn: "root",
})
export class OauthService {
  constructor(private http: HttpClient, private utils: UtilsService) {}

  public async logar(user: Oauth): Promise<Token | HttpErrorResponse> {
    return new Promise<Token | HttpErrorResponse>((resolve, reject) => {
      this.http.post<Token>(API_URL + "/login", user).subscribe(
        (token: Token) => {
          if (token) {
            resolve(token);
          }
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }

  public async cadastrar(user: Oauth): Promise<Oauth | HttpErrorResponse> {
    return new Promise<Oauth | HttpErrorResponse>((resolve, reject) => {
      this.http.post<Oauth>(API_URL + "/register", user).subscribe(
        (dadosUser: Oauth) => {
          if (dadosUser) {
            resolve(dadosUser);
          }
        },
        (error: HttpErrorResponse) => {
          reject(error);
        }
      );
    });
  }

  public async buscarDadosUser(username: string): Promise<User | void>{
    return new Promise<User | void>((resolve, reject) =>{
      this.http.get<User>(API_URL + `/api/perfil/user/${username}`, {headers: this.utils.getHeaders()}).subscribe(
        (retUser: User) =>{
          resolve(retUser);
        },error =>{
          reject(error);
        });
    });
  }

}
