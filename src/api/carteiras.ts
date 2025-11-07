import axiosInstance from "./axios";

export interface Carteira {
  id: number;
  nome: string;
  saldo_inicial: number;
}

export const listarCarteiras = async (): Promise<Carteira[]> => {
  const { data } = await axiosInstance.get(import.meta.env.VITE_API_VERSION + "/carteiras/");
  return data.results || data; // Handle both cases
};