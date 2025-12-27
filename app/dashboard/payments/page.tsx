'use client';

import DashboardLayout from '@/layout/DashboardLayout';
import CommonTable from '@/components/common/CommonTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import DeleteConfirm from '@/components/common/DeleteConfirm';
import Paginator from '@/components/shared/paginator';
import CommonFilters from '@/components/common/CommonFilters';
import { toast } from 'sonner';
import { useState } from 'react';

const PaymentPage = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  // ------------------------
  // Dummy Payments Data
  // ------------------------
  const payments = [
    {
      id: 'PAY-1001',
      applicationId: 'APP-901',
      name: 'Rahul Sharma',
      email: 'rahul@gmail.com',
      phone: '9876543210',
      amount: 250,
      currency: 'USD',
      method: 'Card',
      transactionId: 'TXN-778899',
      date: '12-09-2025',
      status: 'Paid',
    },
    {
      id: 'PAY-1002',
      applicationId: 'APP-902',
      name: 'Amit Verma',
      email: 'amit@gmail.com',
      phone: '9123456789',
      amount: 120,
      currency: 'USD',
      method: 'UPI',
      transactionId: 'TXN-112233',
      date: '13-09-2025',
      status: 'Pending',
    },
    {
      id: 'PAY-1003',
      applicationId: 'APP-903',
      name: 'Neha Singh',
      email: 'neha@gmail.com',
      phone: '9000012345',
      amount: 0,
      currency: 'USD',
      method: 'Cash',
      transactionId: '-',
      date: '14-09-2025',
      status: 'Failed',
    },
  ];

  // ------------------------
  // Delete Handler
  // ------------------------
  const handleDeletePayment = async (id: string) => {
    setIsDeleting(true);
    try {
      // Dummy delete
      toast.success(`Payment ${id} deleted successfully`);
    } catch {
      toast.error('Failed to delete payment');
    } finally {
      setIsDeleting(false);
    }
  };

  // ------------------------
  // Table Columns
  // ------------------------
  const columns = [
    { header: 'Payment ID', accessor: 'id' },
    { header: 'Application ID', accessor: 'applicationId' },
    { header: 'Customer Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    {
      header: 'Amount',
      accessor: 'amount',
      render: (row: any) => (
        <span className="font-medium">
          {row.amount} {row.currency}
        </span>
      ),
    },
    { header: 'Method', accessor: 'method' },
    { header: 'Transaction ID', accessor: 'transactionId' },
    { header: 'Date', accessor: 'date' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row: any) => (
        <Badge
          variant={
            row.status === 'Paid'
              ? 'default'
              : row.status === 'Pending'
              ? 'secondary'
              : 'destructive'
          }
        >
          {row.status}
        </Badge>
      ),
    },
    {
      header: 'Action',
      accessor: 'action',
      className: 'text-center',
      render: (row: any) => (
        <div className="flex items-center justify-center gap-2">
          <Link href={`/dashboard/payments/view?id=${row.id}`}>
            <Icon name="view" />
          </Link>

          <DeleteConfirm
            title="Delete Payment"
            description="Are you sure you want to delete this payment?"
            confirmLabel="Delete"
            onConfirm={() => handleDeletePayment(row.id)}
          >
            <span className="cursor-pointer">
              <Icon name="delete" />
            </span>
          </DeleteConfirm>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-xl font-semibold">Payments</h2>

          <div className="flex items-center gap-2">
            <CommonFilters
              selects={[
                {
                  name: 'status',
                  label: 'Status',
                  options: [
                    { label: 'Paid', value: 'Paid' },
                    { label: 'Pending', value: 'Pending' },
                    { label: 'Failed', value: 'Failed' },
                  ],
                },
              ]}
            />
          </div>
        </div>

        {/* Table */}
        <CommonTable columns={columns} data={payments} />

        {/* Pagination */}
        <Paginator totalItems={1} />
      </div>
    </DashboardLayout>
  );
};

export default PaymentPage;
