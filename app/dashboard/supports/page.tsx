import React from 'react';
import { getSupports } from '@/services/supportsService';
import { hasSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import SupportPage from './Support';
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

  const session = await hasSession();
  if (!session?.id) {
    return redirect('/');
  }

  const supports = await getSupports({
    page,
    search,
    from,
    to,
  });

  return<DashboardLayout><SupportPage supportsData={supports} /></DashboardLayout> ;
};

export default page;
