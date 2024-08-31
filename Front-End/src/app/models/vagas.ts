export interface Vagas {
  idVaga: number;
  descricaoVaga?: string;
  tituloVaga?: string;
  candidatos?: Candidato[];
}

export interface Candidato {
 nomeUsuario: string;
}