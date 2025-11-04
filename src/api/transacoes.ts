import axiosInstance from "./axios";

export interface Transacao {
  tipo: "R" | "D";
  descricao: string;
  valor: number;
  carteira: number;
}

export const listarTransacoes = async (): Promise<Transacao[]> => {
  const { data } = await axiosInstance.get("/transacoes/");
  return data;
};

export const criarTransacao = async (transacao: Transacao): Promise<Transacao> => {
  const { data } = await axiosInstance.post("/transacoes/", transacao);
  return data;
};
