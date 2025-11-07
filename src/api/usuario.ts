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

export interface CriarUsuarioData {
  username: string;
  password: string;
  email?: string;
}

export const listarUsuarios = async (): Promise<Usuario[]> => {
  const { data } = await axiosInstance.get("v1/usuarios/");
  console.log("Retorno da API de usuários:", data);
  return data.results;
};

export const criarUsuario = async (usuario: CriarUsuarioData): Promise<Usuario> => {
  const { data } = await axiosInstance.post(
    `${import.meta.env.VITE_API_VERSION}/usuarios/`,
    usuario
  );
  return data;
};
