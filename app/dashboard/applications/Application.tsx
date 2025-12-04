'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { ExternalLink, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import CommonTable from '@/components/common/CommonTable';
import Icon from '@/components/common/Icon';
import Paginator from '@/components/shared/paginator';
import { ApiPagination, ApplicationSource } from '@/lib/Types';

// Component
const ApplicationsPage = ({
    applicationsData,
}: {
    applicationsData: ApiPagination & { data: any[] };
    selectedApplicationSources: ApplicationSource;
}) => {
    const [isDeleting, setIsDeleting] = useState(false);
    console.log(isDeleting);

    // Delete handler function
    // const handleDeleteApplication = async (id: string) => {
    //     console.log('Deleting application:', id);
    //     setIsDeleting(true);
    //     try {
    //         await deleteApplication(id);
    //         toast.success('Application deleted successfully!');
    //         // Refresh the page to show updated data
    //         router.refresh();
    //     } catch (error) {
    //         console.error('Error deleting application:', error);
    //         toast.error('Failed to delete application');
    //     } finally {
    //         setIsDeleting(false);
    //     }
    // };

    // Table columns
    const columns = [
        {
            header: 'Application ID',
            accessor: 'id',
        },

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
            header: 'Phone',
            accessor: 'phone',
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
    console.log(applicationsData.data, 'applicationsData.data');
    const applications = (applicationsData.data || []).map((data: any) => ({
        id: data._id,
        name: data.firstName,
        avatar: '/avatars/avatar1.jpg',
        service: data.serviceFields.service,
        serviceType: data.serviceFields.serviceType,
        phone: data.phone,
        email: data.email,
        date: new Date(data.createdAt).toISOString(),
        status: data.status,
    }));
    return (
        <div className="space-y-4">
            {/* Top Bar */}
            <div className="flex items-center justify-between flex-wrap gap-2">
                {/* Tabs */}


                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Button>
                        <ExternalLink />
                        Export
                    </Button>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">Filter</Button>
                        </PopoverTrigger>
                        <PopoverContent className="max-w-sm">Filter options here</PopoverContent>
                    </Popover>

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