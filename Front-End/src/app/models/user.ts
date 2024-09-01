export interface User {
    nomeUsuario: string;
    idUsuario: number;
    idPerfilUsuario: number;
    descricaoPerfil: string;
    vagas: VagasUser[];
}
export interface UserStorage {
    nomeUsuario: string;
    idUsuario: number;
    idPerfilUsuario: number;
    descricaoPerfil: string;
}

export interface VagasUser {
 idVaga: number;
 descricaoVaga: string;
 tituloVaga: string;
}