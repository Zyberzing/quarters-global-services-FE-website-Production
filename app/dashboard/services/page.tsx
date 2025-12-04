import React from 'react';

import ServicesPage from './Services';
import { ApplicationSource } from '@/lib/Types';
import { getApplications } from '@/services/applicatonService';
import DashboardLayout from '@/layout/DashboardLayout';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; applicationSources?: ApplicationSource }>;
}) => {
  const page = (await searchParams).page || '1';
  const applicationSources = "Website";


  const applications = await getApplications({
    page: page,
    applicationSources,
    isSubmittedFromService: '1',
  });

  return (
   <DashboardLayout><ServicesPage applicationsData={applications} selectedApplicationSources={applicationSources} /></DashboardLayout> 
  );
};

export default page;