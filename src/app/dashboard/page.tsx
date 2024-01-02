import { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

import { Container } from "@/components/container";
import { TicketItem } from "./components/ticket";
import { ButtonRefresh } from "./components/button";

export const metadata: Metadata = {
  title: "Dashboard | DevControle",
  description:
    "Dashboard DevControle | Gerencie seus clientes e atendimentos de forma fácil",
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      status: "ABERTO",
      customer: {
        userId: session.user.id,
      },
    },
    include: {
      customer: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/new"
              className="bg-blue-500 px-4 py-1 rounded text-white"
            >
              Abrir chamado
            </Link>
            <ButtonRefresh />
          </div>
        </div>

        <table className="min-w-full my-4">
          {tickets.length > 0 && (
            <thead>
              <tr>
                <th className="font-medium text-left uppercase pl-1">
                  Cliente
                </th>
                <th className="font-medium text-center uppercase hidden sm:block">
                  Data cadastro
                </th>
                <th className="font-medium text-center uppercase">Status</th>
                <th className="font-medium text-right uppercase">#</th>
              </tr>
            </thead>
          )}

          <tbody>
            {tickets.map((ticket) => (
              <TicketItem
                key={ticket.id}
                ticket={ticket}
                customer={ticket.customer}
              />
            ))}
          </tbody>
        </table>

        {tickets.length === 0 && (
          <h1 className="text-gray-600">
            Nenhum ticket aberto foi encontrado...
          </h1>
        )}
      </main>
    </Container>
  );
}
