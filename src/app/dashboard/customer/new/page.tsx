import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { Container } from "@/components/container";
import { NewCustomerForm } from "../components/form";

export const metadata: Metadata = {
  title: "Novo Cliente | DevControle",
  description:
    "Novo cliente DevControle | Gerencie seus clientes e atendimentos de forma fácil",
};

export default async function NewCustomer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <Container>
      <main className="flex flex-col mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/customer"
            className="bg-gray-900 text-white px-4 py-1 rounded"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo cliente</h1>
        </div>

        <NewCustomerForm userId={session.user.id} />
      </main>
    </Container>
  );
}
