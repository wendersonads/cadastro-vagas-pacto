export interface Oauth {
 name?: string;
 username: string;
 password: string;
}

export interface Token {
 username?: string;
 token?: string;
 idPerfilUsuario: number;  
}

export interface PerfilUser {
  idPerfilUsuario: number;  
}