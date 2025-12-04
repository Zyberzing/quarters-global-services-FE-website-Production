import React from 'react';
import Support from './Support';
import { getSupports } from '@/services/supportsService';
import { hasSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/layout/DashboardLayout';


const page = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
  const page = (await searchParams).page || '1';

  const session = await hasSession();
  if (!session?.id) {
    return redirect('/');
  }


  const supports = await getSupports({
    page,
  });

  return <DashboardLayout><Support supportsData={supports} /></DashboardLayout>;
};

export default page;
