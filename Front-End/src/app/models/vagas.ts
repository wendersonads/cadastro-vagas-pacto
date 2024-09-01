export interface Vagas {
  idVaga: number;
  descricaoVaga?: string;
  tituloVaga?: string;
  candidatos?: Candidato[];
}

export interface NovaVaga {
   id?: number;
   titulo: string;
   descricao: string; 
}

export interface Candidato {
 nomeUsuario: string;
}