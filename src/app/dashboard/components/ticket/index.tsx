"use client";

import { useContext } from "react";

import { useRouter } from "next/navigation";

import { ModalContext } from "@/providers/modal";

import { api } from "@/lib/api";

import { TicketProps } from "@/utils/ticket.type";
import { CustomerProps } from "@/utils/customer.type";

import { FiCheckSquare, FiFile } from "react-icons/fi";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function TicketItem({ ticket, customer }: TicketItemProps) {
  const { handleModalVisible, setDetailTicket } = useContext(ModalContext);

  const router = useRouter();

  async function handleChangeStatus() {
    try {
      await api.patch("/api/ticket", {
        id: ticket.id,
      });

      router.refresh();
    } catch (err) {
      console.log(err);
    }
  }

  function handleOpenModal() {
    handleModalVisible();
    setDetailTicket({
      customer: customer,
      ticket: ticket,
    });
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-50 hover:bg-gray-200 duration-200">
        <td className="text-left pl-1">{customer?.name}</td>
        <td className="text-center hidden sm:table-cell">
          {ticket.created_at?.toLocaleDateString("pt-br")}
        </td>
        <td className="text-center">
          <span className="uppercase bg-green-500 px-2 py-1 rounded">
            {ticket.status}
          </span>
        </td>
        <td className="text-right">
          <button className="mr-3" onClick={handleChangeStatus}>
            <FiCheckSquare size={24} color="#4b5563" />
          </button>
          <button onClick={handleOpenModal}>
            <FiFile size={24} color="#3b82f6" />
          </button>
        </td>
      </tr>
    </>
  );
}
