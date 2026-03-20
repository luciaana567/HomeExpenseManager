import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { useToast } from "../../hooks/useToast";
import { getPersonById, updatePerson } from "../../services/person.service";
import { deleteUser, getUserById, updateUser } from "../../services/user.service";

type ProfileFormData = {
  email: string;
  password: string;
  name: string;
  birthday: string;
};

export default function ProfilePage() {
  const { showToast } = useToast();

  const userId = localStorage.getItem("userId");
  const personId = localStorage.getItem("personId");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState<ProfileFormData>({
    email: "",
    password: "",
    name: "",
    birthday: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadData() {
      if (!userId || !personId) {
        showToast("Não foi possível identificar o usuário logado.", "error");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const [user, person] = await Promise.all([
          getUserById(userId),
          getPersonById(personId),
        ]);

        setFormData({
          email: user.email ?? "",
          password: "",
          name: person.name ?? "",
          birthday: person.birthday ? person.birthday.split("T")[0] : "",
        });
      } catch (error) {
        showToast(
          error instanceof Error
            ? error.message
            : "Erro ao carregar dados do perfil.",
          "error",
        );
      } finally {
        setLoading(false);
      }
    }

    void loadData();
  }, [userId, personId, showToast]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
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
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Informe o e-mail.";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Informe o nome.";
    }

    if (!formData.birthday) {
      newErrors.birthday = "Informe a data de nascimento.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!userId || !personId) {
      showToast("Não foi possível identificar o usuário logado.", "error");
      return;
    }

    if (!validate()) return;

    try {
      setSubmitting(true);

      await Promise.all([
        updateUser(userId, {
          id: userId,
          email: formData.email.trim(),
          ...(formData.password.trim()
            ? { password: formData.password.trim() }
            : {}),
        }),
        updatePerson(personId, {
          name: formData.name.trim(),
          birthday: formData.birthday,
        }),
      ]);

      localStorage.setItem("name", formData.name.trim());

      showToast("Dados atualizados com sucesso.", "success");

      setFormData((prev) => ({
        ...prev,
        password: "",
      }));
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "Erro ao atualizar dados.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteUser() {
    if (!userId) {
      showToast("Não foi possível identificar o usuário logado.", "error");
      return;
    }

    const confirmed = window.confirm(
      "Deseja realmente excluir sua conta? Essa ação não pode ser desfeita.",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await deleteUser(userId);

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("personId");
      localStorage.removeItem("name");

      showToast("Usuário excluído com sucesso.", "success");

      window.location.href = "/login";
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "Erro ao excluir usuário.",
        "error",
      );
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Meu perfil</h1>
        <p className="mt-2 text-slate-500">Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Meu perfil</h1>
        <p className="mt-2 text-slate-500">
          Aqui você poderá visualizar e atualizar seus dados.
        </p>
      </div>

      <Card
        title="Editar usuário"
        subtitle="Atualize seus dados de acesso e informações pessoais"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              id="email"
              name="email"
              type="email"
              label="E-mail"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="Digite seu e-mail"
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Nova senha"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Preencha somente se quiser alterar"
            />

            <Input
              id="name"
              name="name"
              type="text"
              label="Nome"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Digite seu nome"
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
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Salvando..." : "Salvar alterações"}
            </Button>
          </div>
        </form>
      </Card>

      <Card
        title="Zona de perigo"
        subtitle="Essa ação remove o acesso do usuário"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            Ao excluir o usuário, sua conta será removida. Faça isso apenas se
            tiver certeza.
          </p>

          <div className="self-start">
            <Button
              type="button"
              onClick={handleDeleteUser}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? "Excluindo..." : "Excluir usuário"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}