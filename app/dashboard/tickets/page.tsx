import React from 'react';
import Tickets from './Tickets';
import { getTickets } from '@/services/ticketsService';
import DashboardLayout from '@/layout/DashboardLayout';


const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; from?: string; to?: string }>;
}) => {
  const page = (await searchParams).page || '1';
  const search = (await searchParams).q || '';
  const from = (await searchParams).from || '';
  const to = (await searchParams).to || '';

  const tickets = await getTickets({
    page,
    search,
    from,
    to,
  });
  return <DashboardLayout>
    <Tickets ticketsData={tickets} />
    </DashboardLayout>;
};

export default page;
