import React from 'react';
import Users from './Users';

import { getAllCustomers } from '@/services/customerService';
import DashboardLayout from '@/layout/DashboardLayout';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; from?: string; to?: string; status?: string }>;
}) => {
  const page = (await searchParams).page || '1';
  const search = (await searchParams).q || '';
  const from = (await searchParams).from || '';
  const to = (await searchParams).to || '';
  const status = (await searchParams).status || '';

  // Fetch customers data
  const customersData = await getAllCustomers({ page, search, from, to, status });

  return <DashboardLayout>    
      <div className="min-h-screen  py-10 px-6">
    <Users customersData={customersData.data} currentPage={parseInt(page)} />;
  </div>
  </DashboardLayout>
};

export default page;