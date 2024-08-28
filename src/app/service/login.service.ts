import { Injectable } from '@angular/core';
import { CadastroUsuario, Login } from '../models/Usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(private httpClient: HttpClient) { }

public cadastarNovoUser(novoUser: CadastroUsuario): Promise<CadastroUsuario> {
  return new Promise<CadastroUsuario>((resolve, reject) =>{

  });
}

public login(user: Login): Promise<Login> {
  return new Promise<Login>((resolve, reject) =>{

  });
 }
}
