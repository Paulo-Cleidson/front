import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { criarTransacao } from "../../api/transacoes";
import type { Transacao } from "../../api/transacoes";

interface TransactionFormProps {
  onTransactionCreated?: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onTransactionCreated }) => {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<Transacao>({
    tipo: "R",
    descricao: "",
    valor: 0,
  });

  const mutation = useMutation({
    mutationFn: criarTransacao,
    onSuccess: () => {
      alert("Transação registrada com sucesso!");
      setForm({ tipo: "R", descricao: "", valor: 0});
      queryClient.invalidateQueries({ queryKey: ["transacoes"] });
      
      // Call the callback to refresh the balance
      if (onTransactionCreated) {
        onTransactionCreated();
      }
    },
    onError: () => {
      alert("Erro ao registrar transação.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "valor" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2 className="form-title">Registrar Transação</h2>

      <label className="block text-sm font-bold mb-2">Tipo</label>
      <select
        name="tipo"
        value={form.tipo}
        onChange={handleChange}
        className="form-select mb-3"
      >
        <option value="R">Receita</option>
        <option value="D">Despesa</option>
      </select>

      <Input
        label="Descrição"
        value={form.descricao}
        onChange={handleChange}
        placeholder="Compras"
        type="text"
        name="descricao"
      />

      <Input
        label="Valor (R$)"
        value={String(form.valor)}
        onChange={handleChange}
        placeholder="99.99"
        type="number"
        name="valor"
      />

      <div className="mt-4 text-center">
        <Button label="Salvar" type="submit" />
      </div>
    </form>
  );
};

export default TransactionForm;