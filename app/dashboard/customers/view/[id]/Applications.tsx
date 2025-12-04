'use client';

import CommonTable from '@/components/common/CommonTable';
import DeleteConfirm from '@/components/common/DeleteConfirm';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Eye, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';

// Dummy data
const data = [
  {
    appNumber: 'A0023287',
    service: 'Visa',
    date: '12/08/25',
    status: 'In Process',
  },
  {
    appNumber: 'A0023288',
    service: 'Passport',
    date: '12/05/25',
    status: 'Completed',
  },
];

// Status color mapping
// const statusColorMap: Record<string, 'default' | 'secondary' | 'success' | 'warning'> = {
//   'In Process': 'warning',
//   Completed: 'success',
// };

// Table columns
const columns = [
  {
    header: 'Application Number',
    accessor: 'appNumber',
  },
  {
    header: 'Services',
    accessor: 'service',
  },
  {
    header: 'Application Date',
    accessor: 'date',
  },
  {
    header: 'Status',
    accessor: 'status',
    render: (row: any) => <Badge variant={'default'}>{row.status}</Badge>,
  },
  {
    header: 'Action',
    accessor: 'action',
    className: 'text-center',
    render: () => (
      <div className="flex items-center justify-center gap-2">
        <Button size="icon" asChild>
          <Link href="#">
            <Eye />
          </Link>
        </Button>
        <Button size="icon" variant="outline">
          <Pencil />
        </Button>
        <DeleteConfirm>
          <Button size="icon" variant="destructive">
            <Trash />
          </Button>
        </DeleteConfirm>
      </div>
    ),
  },
];

// Component
const Applications = () => {
  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex items-center justify-between gap-2 pb-4">
        <Tabs defaultValue="online">
          <TabsList className="bg-primary-300 text-primary-100 p-0">
            <TabsTrigger
              value="online"
              className="data-[state=active]:bg-primary-100 cursor-pointer data-[state=active]:text-white"
            >
              Online
            </TabsTrigger>

            <TabsTrigger
              value="uploaded-documents"
              className="data-[state=active]:bg-primary-100 cursor-pointer data-[state=active]:text-white"
            >
              Uploaded Documents
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Table */}
      <CommonTable columns={columns} data={data} />
    </div>
  );
};

export default Applications;