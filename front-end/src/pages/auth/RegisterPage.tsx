import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { registerUser } from "../../services/auth.service";
import { useToast } from "../../hooks/useToast";
import MediumCard from "../../components/ui/MediumCard"

export default function RegisterPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    birthday: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function validate() {
    const newErrors = {
      name: "",
      birthday: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Informe seu nome.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Informe seu e-mail.";
      isValid = false;
    }

    if (!formData.birthday.trim()) {
      newErrors.birthday = "Informe sua data de nascimento.";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Informe sua senha.";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres.";
      isValid = false;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirme sua senha.";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await registerUser({
        email: formData.email,
        password: formData.password,
        person: {
          name: formData.name,
          birthday: formData.birthday,
        },
      });

      showToast("Cadastro realizado com sucesso.", "success");
      navigate("/login");
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "Não foi possível realizar o cadastro.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-110">
      <MediumCard
        title="Criar conta"
        subtitle=""
      >
         <div className="mt-6 flex justify-center">
          <img
            src="/bolsa-de-dinheiro.gif"
            alt="Dashboard"
            className="w-64 rounded-xl md:w-40"
          />
        </div>
        <p className="text-center py-1" >Cadastre-se para começar a usar o sistema</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            name="name"
            type="text"
            label="Nome"
            placeholder="Digite seu nome"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          <Input
            id="birthday"
            name="birthday"
            type="date"
            label="Data de nascimento"
            value={formData.birthday}
            onChange={handleChange}
            error={errors.birthday}
          />

          <Input
            id="email"
            name="email"
            type="email"
            label="E-mail"
            placeholder="Digite seu e-mail"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirmar senha"
            placeholder="Repita sua senha"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <Button type="submit" disabled={loading} fullWidth={true}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Já tem conta?{" "}
          <Link to="/login" className="font-medium text-slate-900">
            Entrar
          </Link>
        </p>
      </MediumCard>
    </div>
  );
}