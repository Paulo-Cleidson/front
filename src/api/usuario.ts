import axiosInstance from "./axios";

export interface Usuario {
  id?: number;
  username: string;
  email: string;
  password: string;
  cpf?: string;
  telefone?: string;
  meta_financeira?: number;
}

export const listarUsuarios = async (): Promise<Usuario[]> => {
  const { data } = await axiosInstance.get("/usuarios/");
  console.log("Retorno da API de usuários:", data);
  return data.results;
};

export const criarUsuario = async (usuario: Usuario): Promise<Usuario> => {
  const { data } = await axiosInstance.post("/usuarios/", usuario);
  return data;
};
