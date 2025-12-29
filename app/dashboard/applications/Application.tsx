'use client';

import CommonTable from '@/components/common/CommonTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import DeleteConfirm from '@/components/common/DeleteConfirm';

import Paginator from '@/components/shared/paginator';
import { deleteApplication } from '@/services/applicatonService';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExcelExportButton } from '@/components/shared/ExcelExportButton';
import CommonFilters from '@/components/common/CommonFilters';
import { ApiPagination, ApplicationSource, applicationSources, applicationStatuses } from '@/lib/Types';

// Component
const ApplicationsPage = ({
  applicationsData,
  selectedApplicationSources,
}: {
  applicationsData: ApiPagination & { data: any[] };
  selectedApplicationSources: ApplicationSource;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  // Delete handler function
  const handleDeleteApplication = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteApplication(id);
      toast.success('Application deleted successfully!');
      // Refresh the page to show updated data
      router.refresh();
    } catch (error) {
      console.error('Error deleting application:', error);
      toast.error('Failed to delete application');
    } finally {
      setIsDeleting(false);
    }
  };

  // Table columns
  const columns = [
    {
      header: 'Application ID',
      accessor: 'id',
    },
    // {
    //   header: 'Applicant Name',
    //   accessor: 'name',
    //   render: (row: any) => (
    //     <div className="flex items-center gap-2 font-medium">
    //       <Avatar>
    //         <AvatarImage src={row.avatar || 'https://github.com/shadcn.png'} />
    //         <AvatarFallback>CN</AvatarFallback>
    //       </Avatar>
    //       <span>{row.name}</span>
    //     </div>
    //   ),
    // },
    {
      header: 'Applicant Name',
      accessor: 'name',
    },
    {
      header: 'Service',
      accessor: 'service',
    },
    {
      header: 'Service Type',
      accessor: 'serviceType',
    },
    {
      header: 'From',
      accessor: 'from',
    },
    {
      header: 'To',
      accessor: 'to',
    },
    {
      header: 'Phone',
      accessor: 'phone',
    },
    {
      header: 'Payments',
      accessor: 'totalAmount',
      render: (row: any) => {
        return <span>{row.totalAmount ? `${row.totalAmount}$` : '0$'}</span>;
      },
    },
    {
      header: 'Email',
      accessor: 'email',
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
      render: (row: any) => (
        <div className="flex items-center justify-center gap-2">
          <Link href={`/dashboard/applications/edit?application=${row.id}`}>
            <Icon name="edit" />
          </Link>
          <Link href={`/dashboard/applications/edit?application=${row.id}&isView=1`}>
            <Icon name="view" />
          </Link>
         
        </div>
      ),
    },
  ];

  // Dummy data
  const applications = (applicationsData.data || []).map((data) => ({
    id: data._id,
    name: data.firstName,
    avatar: '/avatars/avatar1.jpg',
    service: data.serviceFields?.service,
    serviceType: data.serviceFields.serviceType,
    from: data?.fromCountryId?.name || '-',
    to: data?.toCountryId?.name || '-',
    phone: data.phone,
    email: data.email,
    totalAmount: data?.totalAmount,
    date: new Date(data.createdAt).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
    status: data.status,
  }));
  return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
  

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ExcelExportButton rows={applications} filename="applications.xlsx" />

          <CommonFilters
            selects={[
              {
                name: 'status',
                label: 'Status',
                options: applicationStatuses.map((status) => ({ label: status, value: status })),
              },
            ]}
          />

          <Button asChild>
            <Link href="/dashboard/applications/create">
              <Plus className="mr-2 h-4 w-4" />
              New  Application
            </Link>
          </Button>
        </div>
      </div>

      {/* Table */}
      <CommonTable columns={columns} data={applications} />
      <Paginator totalItems={applicationsData.totalPages} />
    </div>
  );
};

export default ApplicationsPage;
