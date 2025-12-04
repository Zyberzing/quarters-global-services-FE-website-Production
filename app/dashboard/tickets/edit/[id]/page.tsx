import React from 'react';
import TicketForm from '@/components/forms/ticketForm/TicketForm';
import { getTicketById } from '@/services/ticketsService';
import { getAllCustomers } from '@/services/customerService';
import { getUsers } from '@/services/usersService';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const EditTicketPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

 

  // Fetch ticket data and dropdown data in parallel
  const [ticketData, customersResponse, staffResponse] = await Promise.all([
    getTicketById(id),
    getAllCustomers({ page: '1' }),
    getUsers({ page: '1' }),
  ]);

  if (!ticketData) {
    return redirect('/admin/tickets');
  }

  // Filter customers to only include users with role 'user'
  const customers = customersResponse.data?.data?.filter((user) => user.role === 'user') || [];
  const staff = staffResponse.data || [];

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center gap-2 ">
          <Link href="/admin/tickets">
            <ChevronLeft className="h-6 w-6 text-black" />
          </Link>
          <h1 className="text-2xl font-semibold">Edit Ticket</h1>
        </div>
        <p className="text-gray-600">Ticket ID: #{ticketData._id.slice(-8)}</p>
      </div>
      <TicketForm ticketData={ticketData} isEdit={true} customers={customers} staff={staff} />
    </div>
  );
};

export default EditTicketPage;
