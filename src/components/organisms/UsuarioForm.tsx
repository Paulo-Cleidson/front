import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { criarUsuario } from "../../api/usuario";
import type { Usuario } from "../../api/usuario";

const UsuarioForm: React.FC = () => {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<Usuario>({
    username: "",
    email: "",
    password: "",
    cpf: "",
    telefone: "",
    meta_financeira: 0,
  });

  const mutation = useMutation({
    mutationFn: criarUsuario,
    onSuccess: () => {
      alert("Usuário criado com sucesso!");
      setForm({
        username: "",
        email: "",
        password: "",
        cpf: "",
        telefone: "",
        meta_financeira: 0,
      });
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
    onError: () => {
      alert("Erro ao criar usuário. Verifique os dados.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "meta_financeira" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2 className="form-title">Cadastrar Usuário</h2>

      <Input label="Nome de Usuário" name="username" value={form.username} onChange={handleChange} type="text" placeholder="nome" />
      <Input label="Email" name="email" value={form.email} onChange={handleChange} type="email" placeholder="email@exemplo.com" />
      <Input label="Senha" name="password" value={form.password} onChange={handleChange} type="password" placeholder="********" />
      <Input label="CPF" name="cpf" value={form.cpf || ""} onChange={handleChange} type="text" placeholder="000.000.000-00" />
      <Input label="Telefone" name="telefone" value={form.telefone || ""} onChange={handleChange} type="text" placeholder="(00) 00000-0000" />
      <Input label="Meta Financeira (R$)" name="meta_financeira" value={String(form.meta_financeira)} onChange={handleChange} type="number" placeholder="1000.00" />

      <div className="mt-4 text-center">
        <Button label="Salvar" type="submit" />
      </div>
    </form>
  );
};

export default UsuarioForm;
