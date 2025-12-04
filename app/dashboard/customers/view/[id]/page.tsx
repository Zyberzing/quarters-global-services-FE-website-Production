import React from 'react';
import Applications from './Applications';
import Actions from './Actions';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import CustomerForm from '@/components/form/customerForm/CustomerForm';
import { getCustomerById } from '@/services/customerService';
import DashboardLayout from '@/layout/DashboardLayout';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const customerData = await getCustomerById(id);

  return (
    <DashboardLayout>

      <div className="space-y-6">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/customers">
              <ChevronLeft className="h-6 w-6 text-black" />
            </Link>
            <p className="text-base font-semibold">
              Customer: {customerData.firstName} {customerData.lastName}
            </p>
          </div>
          <Actions />
        </div>
        <CustomerForm customerData={customerData} isView={true} />
        <Applications />
      </div>
    </DashboardLayout>

  );
};

export default page;