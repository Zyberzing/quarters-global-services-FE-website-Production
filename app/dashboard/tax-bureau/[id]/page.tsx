import React from 'react';
import { redirect } from 'next/navigation';
import hasAccess from '@/hooks/useAccessControl/hasAccess';
import { PERMISSIONS_LIST_ENUM } from '@/hooks/useAccessControl/permissions';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import TaxBureauForm from '@/components/forms/taxBureauForm/TaxBureauForm';
import { getTaxBureauById } from '@/services/taxBureauService';
import DashboardLayout from '@/layout/DashboardLayout';

const ViewTaxBureauPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // Fetch data
  const [taxBureauData] = await Promise.all([getTaxBureauById(id)]);

  if (!taxBureauData) {
    return redirect('/dashboard/tax-bureau');
  }

  return (
    <DashboardLayout>
      <div className="mb-4">
        <div className="flex items-center gap-2 ">
          <Link href="/dashboard/tax-bureau">
            <ChevronLeft className="h-6 w-6 text-black" />
          </Link>
          <h1 className="text-2xl font-semibold">View</h1>
        </div>
      </div>
      <TaxBureauForm defaultData={taxBureauData} isView={true} />
    </DashboardLayout>
  );
};

export default ViewTaxBureauPage;
