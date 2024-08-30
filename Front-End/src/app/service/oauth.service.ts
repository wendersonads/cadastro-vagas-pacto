import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Oauth, Token } from "../models/Oauth";
import { API_URL } from "../app.config";

@Injectable({
  providedIn: "root",
})
export class OauthService {
  constructor(private http: HttpClient) {}

  public async logar(user: Oauth): Promise<Token | HttpErrorResponse> {
    return new Promise<Token | HttpErrorResponse>((resolve, reject) => {
      this.http.post<Token>(API_URL + "/login", user).subscribe(
        (token: Token) => {
          if (token) {
            resolve(token);
          }
        },(error: HttpErrorResponse) => {
          resolve(error);
        }
      );
    });
  }
}
