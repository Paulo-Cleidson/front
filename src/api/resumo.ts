import axiosInstance from "./axios";

export interface ResumoTransacoes {
  total_receitas: number;
  total_despesas: number;
  saldo: number;
  usuario: string;
}

export const obterResumoTransacoes = async (): Promise<ResumoTransacoes> => {
  const { data } = await axiosInstance.get(
    `${import.meta.env.VITE_API_VERSION}/transacoes/somar-transacoes/`
  );
  return data;
};