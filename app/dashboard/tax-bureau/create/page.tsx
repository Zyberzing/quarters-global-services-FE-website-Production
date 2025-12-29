import React from 'react';
import { redirect } from 'next/navigation';
import hasAccess from '@/hooks/useAccessControl/hasAccess';
import { PERMISSIONS_LIST_ENUM } from '@/hooks/useAccessControl/permissions';
import TaxBureauForm from '@/components/forms/taxBureauForm/TaxBureauForm';
import DashboardLayout from '@/layout/DashboardLayout';

const page = async () => {
 

  return<DashboardLayout><TaxBureauForm /></DashboardLayout> ;
};

export default page;
