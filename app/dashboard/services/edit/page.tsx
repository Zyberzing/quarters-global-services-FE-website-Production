 import ServiceForm from '@/components/form/serviceForm/ServiceForm';
import hasAccess from '@/hooks/useAccessControl/hasAccess';
import { PERMISSIONS_LIST_ENUM } from '@/hooks/useAccessControl/permissions';
import DashboardLayout from '@/layout/DashboardLayout';
import { ApplicationSource } from '@/lib/Types';
import { getApplicationById } from '@/services/applicatonService';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    application?: string;
    isView?: string;
    search?: string;
    applicationSources?: ApplicationSource;
  }>;
}) => {
  const application = (await searchParams).application || '';
  const isView = (await searchParams).isView === '1';

  const applicationData = await getApplicationById(application);

  if (!applicationData) {
    return 'no found';
  }
  return (
    <DashboardLayout>
      <p className="py-4 text-lg font-semibold">{isView ? 'View' : 'Edit'} Service</p>
      <ServiceForm defaultData={applicationData} isView={isView} />
    </DashboardLayout>
  );
};

export default page;
