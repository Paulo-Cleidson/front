import axiosInstance from "./axios";

export interface Transacao {
  tipo: "R" | "D";
  descricao: string;
  valor: number;
}

export const listarTransacoes = async (): Promise<Transacao[]> => {
  const token = localStorage.getItem("access_token");
  const { data } = await axiosInstance.get(
    `${import.meta.env.VITE_API_VERSION}/transacoes/`,
    {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  );
  return data;
};

export const criarTransacao = async (transacao: Transacao): Promise<Transacao> => {
  const token = localStorage.getItem("access_token");
  const { data } = await axiosInstance.post(
    `${import.meta.env.VITE_API_VERSION}/transacoes/`,
    transacao,
    {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  );
  return data;
};