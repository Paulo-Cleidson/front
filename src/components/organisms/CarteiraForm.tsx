import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listarUsuarios } from "../../api/usuario";
import { criarCarteira } from "../../api/carteiras";
import type { Usuario } from "../../api/usuario";

const CarteiraForm: React.FC = () => {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    usuario: 0,
    nome: "",
    saldo_inicial: 0,
  });

  const { data: usuarios, isLoading } = useQuery({
    queryKey: ["usuarios"],
    queryFn: listarUsuarios,
  });

  const mutation = useMutation({
    mutationFn: criarCarteira,
    onSuccess: () => {
      alert("Carteira criada com sucesso!");
      setForm({ usuario: 0, nome: "", saldo_inicial: 0 });
      queryClient.invalidateQueries({ queryKey: ["carteiras"] });
    },
    onError: () => {
      alert("Erro ao criar carteira.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "saldo_inicial" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.usuario) {
      alert("Selecione um usuário!");
      return;
    }
    mutation.mutate(form);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2 className="form-title">Criar Carteira</h2>

      <label className="block text-sm font-bold mb-2">Usuário</label>
      {isLoading ? (
        <p>Carregando usuários...</p>
      ) : (
        <select
          name="usuario"
          value={form.usuario}
          onChange={handleChange}
          className="form-select mb-3"
        >
          <option value="">Selecione um usuário</option>
          {usuarios?.map((u: Usuario) => (
            <option key={u.id} value={u.id}>
              {u.username} — {u.email}
            </option>
          ))}
        </select>
      )}

      <Input
        label="Nome da Carteira"
        name="nome"
        value={form.nome}
        onChange={handleChange}
        type="text"
        placeholder="Carteira Principal"
      />

      <Input
        label="Saldo Inicial (R$)"
        name="saldo_inicial"
        value={String(form.saldo_inicial)}
        onChange={handleChange}
        type="number"
        placeholder="0.00"
      />

      <div className="mt-4 text-center">
        <Button label="Salvar" type="submit" />
      </div>
    </form>
  );
};

export default CarteiraForm;
