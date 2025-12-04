'use client';

import CommonTable from '@/components/common/CommonTable';
import Paginator from '@/components/shared/paginator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ApiPagination } from '@/lib/Types';
import { SupportDataType } from '@/services/supportsService';
import { Eye } from 'lucide-react';

import Link from 'next/link';

interface SupportProps {
  supportsData: ApiPagination & { data: SupportDataType[] };
}

// Columns
const columns = [
  {
    header: 'Name',
    accessor: 'name',
    render: (row: any) => (
      <div className="flex items-center gap-2 font-medium">
        <Avatar>
          <AvatarImage src={row.avatar || 'https://github.com/shadcn.png'} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span>{row.name}</span>
      </div>
    ),
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
    render: (row: SupportDataType) => {
      const date = new Date(row.createdAt);
      return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
      });
    },
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
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Support</h2>
        <Button variant="outline">Filter</Button>
      </div>

      {/* Support Data */}
      <div className="space-y-4 min-h-[60svh] flex flex-col justify-between">
        <CommonTable columns={columns} data={supportsData.data} />
        <Paginator totalItems={supportsData.count} />
      </div>
    </div>
  );
};

export default SupportPage;
