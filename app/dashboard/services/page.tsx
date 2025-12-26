import React from 'react';
import Services from './Services';
import { redirect } from 'next/navigation';
import hasAccess from '@/hooks/useAccessControl/hasAccess';
import { PERMISSIONS_LIST_ENUM } from '@/hooks/useAccessControl/permissions';
import { getApplications } from '@/services/applicatonService';
import { ApplicationSource } from '@/lib/Types';
import DashboardLayout from '@/layout/DashboardLayout';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    applicationSources?: ApplicationSource;
    platformServiceCategoryPackageId?: string;
    q?: string;
    from?: string;
    to?: string;
    status?: string;
  }>;
}) => {
  const page = (await searchParams).page || '1';
  const applicationSources = (await searchParams).applicationSources || 'Website';
  const platformServiceCategoryPackageId =
    (await searchParams).platformServiceCategoryPackageId || '';
  const search = (await searchParams).q || '';
  const from = (await searchParams).from || '';
  const to = (await searchParams).to || '';
  const status = (await searchParams).status || '';


  const applications = await getApplications({
    page: page,
    applicationSources,
    isSubmittedFromService: '1',
    platformServiceCategoryPackageId,
    search,
    from,
    to,
    status,
  });

  return (
    <DashboardLayout>
    <Services applicationsData={applications} selectedApplicationSources={applicationSources} />

    </DashboardLayout>
  );
};

export default page;
