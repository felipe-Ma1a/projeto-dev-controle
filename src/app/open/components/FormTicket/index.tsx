"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/lib/api";

import { CustomerDataInfo } from "../../page";

import { Input } from "@/components/input";

const schema = z.object({
  name: z.string().min(1, "O nome do chamado é obrigatório"),
  description: z.string().min(1, "Descreva um pouco sobre o seu problema..."),
});

type FormData = z.infer<typeof schema>;

interface FormTicketProps {
  customer: CustomerDataInfo;
}

export function FormTicket({ customer }: FormTicketProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleRegisterTicket(data: FormData) {
    const response = await api.post("/api/ticket", {
      name: data.name,
      description: data.description,
      customerId: customer.id,
    });

    setValue("name", "");
    setValue("description", "");
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegisterTicket)}
      className="bg-slate-200 mt-6 py-6 px-4 rounded border-2"
    >
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome do chamado..."
        register={register}
        error={errors.name?.message}
      />

      <textarea
        className={`w-full border-2 rounded-md h-24 resize-none mb-2 mt-4 px-2 outline-none ${
          errors.description ? "border-red-500 mb-0" : ""
        }`}
        placeholder="Descreva o seu problema..."
        id="description"
        {...register("description")}
      />
      {errors.description?.message && (
        <p className="text-red-500 mb-4">{errors.description.message}</p>
      )}

      <button
        type="submit"
        className="bg-blue-500 rounded-md w-full h-11 px-2 text-white font-bold hover:opacity-95 duration-200"
      >
        Cadastrar
      </button>
    </form>
  );
}
