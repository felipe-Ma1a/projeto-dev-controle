"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/lib/api";

import { Input } from "@/components/input";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório!"),
  email: z
    .string()
    .email("Digite um email válido")
    .min(1, "O email é obrigatório!"),
  phone: z.string().refine(
    (value) => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value)
      );
    },
    {
      message: "Número de telefone inválido",
    }
  ),
  address: z.string(),
});

type FormData = z.infer<typeof schema>;

export function NewCustomerForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  async function handleRegisterCustomer(data: FormData) {
    await api.post("/api/customer", {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      userId: userId,
    });

    router.replace("/dashboard/customer");
    router.refresh();
  }

  return (
    <form
      className="flex flex-col mt-6"
      onSubmit={handleSubmit(handleRegisterCustomer)}
    >
      <label className="mb-1 text-lg font-medium">Nome completo</label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo..."
        error={errors.name?.message}
        register={register}
      />

      <section className="flex flex-col sm:flex-row gap-2 my-2">
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Telefone</label>
          <Input
            type="text"
            name="phone"
            placeholder="Exemplo (DD) 999101900"
            error={errors.phone?.message}
            register={register}
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="Digite o email..."
            error={errors.email?.message}
            register={register}
          />
        </div>
      </section>

      <label className="mb-1 text-lg font-medium">Endereço</label>
      <Input
        type="text"
        name="address"
        placeholder="Digite o endereço do cliente..."
        error={errors.address?.message}
        register={register}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white my-4 px-2 h-11 rounded font-bold hover:opacity-95 duration-200"
      >
        Cadastrar
      </button>
    </form>
  );
}
