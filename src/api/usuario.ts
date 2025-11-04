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
  return data;
};

export const criarUsuario = async (usuario: Usuario): Promise<Usuario> => {
  const { data } = await axiosInstance.post("/usuarios/", usuario);
  return data;
};
