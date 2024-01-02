import Link from "next/link";

import { Container } from "@/components/container";

export function DashboardHeader() {
  return (
    <Container>
      <header className="w-full bg-gray-900 my-4 p-3 rounded flex gap-4 items-center">
        <Link
          href="/dashboard"
          className="text-white hover:font-bold duration-300"
        >
          Chamados
        </Link>
        <Link
          href="/dashboard/customer"
          className="text-white hover:font-bold duration-300"
        >
          Clientes
        </Link>
      </header>
    </Container>
  );
}
