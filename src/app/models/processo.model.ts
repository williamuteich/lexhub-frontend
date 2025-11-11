export interface ProcessoResponse {
  message: string;
  processo: ItemsProcesso[];
}

export interface ItemsProcesso {
  id: string;
  numeroProcesso: number;
  tipo: string;
  status: string;
  tribunal: string | null;
  dataAbertura: string;
  dataEncerramento: string | null;
  clientId: string;
  responsavelId: string;
  parteContraria: string;
  client: ProcessoPessoa;       
  responsavel: ProcessoPessoa;   
  createdAt: string;
  updatedAt: string;
}

export interface ProcessoPessoa {
  id: string;
  name: string;
}
