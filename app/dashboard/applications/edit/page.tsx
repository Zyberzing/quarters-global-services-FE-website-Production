import React from 'react';
import Actions from './Actions';
import { getApplicationById } from '@/services/applicatonService';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ApplicationSource } from '@/lib/Types';
import ApplicationForm from '@/components/form/applicationForm/ApplicationForm';
import DashboardLayout from '@/layout/DashboardLayout';

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
  const isView = (await searchParams).isView || '';



  const applicationData = await getApplicationById(application);

  if (!applicationData) {
    return 'no found';
  }
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button size="icon" asChild variant="ghost">
            <Link href="/dashboard/applications">
              <ArrowLeft />
              <span className="sr-only">back</span>
            </Link>
          </Button>
          <p className="text-base font-semibold grow">Application ID: {application} </p>
          <Actions />
        </div>
        {/* <StatusTimeLine activeStatus={applicationData.status || 'Submitted'} /> */}
        <ApplicationForm isEdit={true} isView={!!isView} applicationData={applicationData} />
      </div>
    </DashboardLayout>

  );
};

export default page;