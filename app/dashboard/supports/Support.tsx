'use client';

import CommonTable from '@/components/common/CommonTable';
import Paginator from '@/components/shared/paginator';
import { Button } from '@/components/ui/button';
import { Eye, Plus } from 'lucide-react';
import { SupportDataType } from '@/services/supportsService';
import Link from 'next/link';
import CommonFilters from '@/components/common/CommonFilters';
import { format } from 'date-fns';
import { ApiPagination } from '@/lib/Types';

interface SupportProps {
  supportsData: ApiPagination & { data: SupportDataType[] };
}

// Columns
const columns = [
  {
    header: 'Name',
    accessor: 'name',
    render: (row: any) => <span className="capitalize">{row.name}</span>,
  },
  {
    header: 'Phone',
    accessor: 'phone',
  },
  {
    header: 'Email',
    accessor: 'email',
  },
  {
    header: 'Support Type',
    accessor: 'supportType',
  },
  {
    header: 'Date',
    accessor: 'date',
    render: (row: SupportDataType) =>
      format(new Date(row.createdAt), 'dd-MM-yyyy'),
  },
  {
    header: 'Action',
    accessor: 'action',
    className: 'text-center',
    render: (row: SupportDataType) => (
      <div className="flex justify-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/dashboard/supports/view/${row._id}`}>
            <Eye className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    ),
  },
];

// Page Component
const SupportPage = ({ supportsData }: SupportProps) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Support</h2>

        <div className="flex items-center gap-2">
          <CommonFilters />

          {/* ✅ Create Support Button */}
          <Button asChild>
            <Link href="/dashboard/supports/create" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Support
            </Link>
          </Button>
        </div>
      </div>

      {/* Support Data */}
      <div className="space-y-4 min-h-[60svh] flex flex-col justify-between">
        <CommonTable columns={columns} data={supportsData.data} />
        <Paginator totalItems={supportsData.totalPages} />
      </div>
    </div>
  );
};

export default SupportPage;
