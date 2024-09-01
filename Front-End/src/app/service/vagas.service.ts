import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UtilsService } from "../utils/utils.service";
import { NovaVaga, Vagas } from "../models/vagas";
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

  public novaVaga(novaVaga: NovaVaga): Promise<NovaVaga | void> {
    return new Promise<NovaVaga |void>((resolve, reject) => {
      this.http.post<NovaVaga>(API_URL + "/api/vagas", novaVaga, {headers: this.utils.getHeaders()}).subscribe(
        (vaga: NovaVaga) => {
         if (vaga) {
           resolve(vaga);
         }
        },error => {
          reject(error);
      }
     );
    });
  }

  public candidatarNaVaga(idVaga: number, idCandidato: number): Promise<string> {
    return new Promise<string>((resolve, reject)=> {
      if (idCandidato !== null && idVaga !== null) {
        this.http.post<string>(API_URL + `/api/vagas/cadastrar/${idVaga}/${idCandidato}`,{},{responseType: 'text' as 'json', headers: this.utils.getHeaders()}).subscribe(
          (retCad: string)=>{
            resolve(retCad);
        },(error: HttpErrorResponse) => { 
          reject(error);
        })
      }
    });
  }
}
