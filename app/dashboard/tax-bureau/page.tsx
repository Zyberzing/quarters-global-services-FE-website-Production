import React from 'react';
import TaxBureau from './TaxBureau';
import { getTaxBureau } from '@/services/taxBureauService';
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

 
  const data = await getTaxBureau({ page, search, from, to, status });

  return <DashboardLayout><TaxBureau data={data} /></DashboardLayout>;
};

export default page;
