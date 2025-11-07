import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/token";

interface LoginFormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      setForm({ username: "", password: "" });
      navigate("/"); // Redirect to home page
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      alert("Erro ao fazer login. Verifique suas credenciais.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };


  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2 className="form-title">Login</h2>
      
      <Input
        label="Usuário"
        value={form.username}
        onChange={handleChange}
        placeholder="Digite seu usuário"
        type="text"
        name="username"
        required
      />

      <Input
        label="Senha"
        value={form.password}
        onChange={handleChange}
        placeholder="Digite sua senha"
        type="password"
        name="password"
        required
      />

      <div className="mt-4 text-center">
        <Button 
          label={mutation.isPending ? "Entrando..." : "Entrar"} 
          type="submit" 
          disabled={mutation.isPending}
        />
      </div>
    </form>
  );
};

export default LoginForm;