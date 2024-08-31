import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UtilsService } from "../utils/utils.service";
import { Vagas } from "../models/vagas";
import { API_URL } from "../app.config";

@Injectable({
  providedIn: "root",
})
export class VagasService {
  constructor(private http: HttpClient, private utils: UtilsService) {}

  public listarVagas(): Promise<Vagas[] | undefined> {
    return new Promise<Vagas[] | undefined>((resolve, reject) => {
      this.http.get<Vagas[]>(API_URL + "/api/vagas/candidatos", {
          headers: this.utils.getHeaders(),}).subscribe(
          (vagas: Vagas[]) => {
            if (vagas) {
              resolve(vagas);
            }
          },
          (error) => {
            reject(undefined);
          }
        );
    });
  }
}
