import React from 'react';
import Application from './Application';
import { getApplications } from '@/services/applicatonService';
import { ApplicationSource } from '@/lib/Types';
import DashboardLayout from '@/layout/DashboardLayout';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    applicationSources?: ApplicationSource;
    q?: string;
    from?: string;
    to?: string;
    status?: string;
  }>;
}) => {
  const page = (await searchParams).page || '1';
  const applicationSources = (await searchParams).applicationSources || 'Website';
  const search = (await searchParams).q || '';
  const from = (await searchParams).from || '';
  const to = (await searchParams).to || '';
  const status = (await searchParams).status || '';



  const applications = await getApplications({
    page: page,
    applicationSources,
    isSubmittedFromApplication: '1',
    search,
    from,
    to,
    status,
  });

  return (
    <DashboardLayout>
    <Application applicationsData={applications} selectedApplicationSources={applicationSources} />

    </DashboardLayout>
  );
};

export default page;
