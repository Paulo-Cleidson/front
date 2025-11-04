import axiosInstance from "./axios";

export interface Carteira {
  id: number;
  nome: string;
  saldo_inicial: number;
}

export const listarCarteiras = async (): Promise<Carteira[]> => {
  const { data } = await axiosInstance.get("/carteiras/");
  return data;
};

export const criarCarteira = async (carteira: {
  usuario: number;
  nome: string;
  saldo_inicial: number;
}) => {
  const { data } = await axiosInstance.post("/carteiras/", carteira);
  return data;
};
