import React from 'react';
import Tickets from './Tickets';
import { getTickets } from '@/services/ticketsService';
import DashboardLayout from '@/layout/DashboardLayout';

const page = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
  const page = (await searchParams).page || '1';

 
  const tickets = await getTickets({
    page,
  });
  return <DashboardLayout>
    <Tickets ticketsData={tickets} />
    </DashboardLayout>;
};

export default page;
