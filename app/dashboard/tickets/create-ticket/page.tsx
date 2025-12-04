import React from 'react';
import { getAllCustomers } from '@/services/customerService';
import { getUsers } from '@/services/usersService';
import DashboardLayout from '@/layout/DashboardLayout';
import TicketForm from '@/components/forms/ticketForm/TicketForm';

const page = async () => {
 
  // Fetch customers and staff data
  const [customersResponse, staffResponse] = await Promise.all([
    getAllCustomers({ page: '1' }),
    getUsers({ page: '1' }),
  ]);

  // Filter customers to only include users with role 'user'
  const customers = customersResponse.data?.data?.filter((user) => user.role === 'user') || [];
  const staff = staffResponse.data || [];

  return (
    <DashboardLayout>
      {/* <p className="py-4 text-lg font-semibold">Add New Services</p> */}
      <TicketForm customers={customers} staff={staff} />
    </DashboardLayout>
  );
};

export default page;
