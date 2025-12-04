import ApplicationForm from '@/components/form/applicationForm/ApplicationForm';
import DashboardLayout from '@/layout/DashboardLayout';
import React from 'react';

const page = async () => {

  return <DashboardLayout><ApplicationForm /></DashboardLayout>;
};

export default page;
