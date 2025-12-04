import CommonTable from '@/components/common/CommonTable';
import DeleteConfirm from '@/components/common/DeleteConfirm';
import Icon from '@/components/common/Icon';
import Paginator from '@/components/shared/paginator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ApiPagination } from '@/lib/Types';
import { TicketDataType } from '@/services/ticketsService';


import { Plus } from 'lucide-react';
import Link from 'next/link';

interface TicketsProps {
  ticketsData: ApiPagination & { data: TicketDataType[] };
}
const columns = [
  {
    header: 'Ticket ID',
    accessor: '_id',
    render: (row: any) => <span className="font-mono text-sm">#{row._id.slice(-8)}</span>,
  },
  {
    header: 'Customer',
    accessor: 'customer',
    render: (row: any) => (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>CU</AvatarFallback>
        </Avatar>
        <span className="font-medium">{row.customer.slice(-8)}</span>
      </div>
    ),
  },
  {
    header: 'Subject',
    accessor: 'subject',
  },
  {
    header: 'Category',
    accessor: 'category',
  },
  {
    header: 'Application ID',
    accessor: 'applicationId',
    render: (row: any) => <span className="font-mono text-sm">#{row.applicationId.slice(-8)}</span>,
  },
  {
    header: 'Created Date',
    accessor: 'createdAt',
    render: (row: any) => <span>{new Date(row.createdAt).toLocaleDateString()}</span>,
  },
  {
    header: 'Priority',
    accessor: 'priority',
    render: (row: any) => {
      const base = 'px-2 py-1 rounded-full text-xs';
      const value = row.priority?.toLowerCase();

      switch (value) {
        case 'low':
          return <Badge className={`${base} bg-blue-100 text-blue-600`}>Low</Badge>;
        case 'normal':
          return <Badge className={`${base} bg-green-100 text-green-600`}>Normal</Badge>;
        case 'high':
          return <Badge className={`${base} bg-orange-100 text-orange-600`}>High</Badge>;
        case 'urgent':
          return <Badge className={`${base} bg-red-100 text-red-600`}>Urgent</Badge>;
        default:
          return <Badge variant="outline">{row.priority || '-'}</Badge>;
      }
    },
  },
  {
    header: 'Status',
    accessor: 'status',
    render: (row: any) => {
      const base = 'px-2 py-1 rounded-full text-xs';
      const value = row.status?.toLowerCase();

      switch (value) {
        case 'open':
          return <Badge className={`${base} bg-blue-100 text-blue-600`}>Open</Badge>;
        case 'closed':
          return <Badge className={`${base} bg-gray-100 text-gray-600`}>Closed</Badge>;
        case 'resolved':
          return <Badge className={`${base} bg-green-100 text-green-600`}>Resolved</Badge>;
        case 'waiting on customer':
          return <Badge className={`${base} bg-yellow-100 text-yellow-600`}>Waiting</Badge>;
        default:
          return <Badge variant="outline">{row.status || '-'}</Badge>;
      }
    },
  },
  {
    header: 'Attachments',
    accessor: 'attachments',
    render: (row: any) => {
      const attachments = row.attachments || {};
      const attachmentCount = Object.values(attachments).filter(Boolean).length;

      if (attachmentCount > 0) {
        return (
          <Badge variant="outline" className="text-xs">
            {attachmentCount} file{attachmentCount > 1 ? 's' : ''}
          </Badge>
        );
      }
      return <span className="text-gray-400">-</span>;
    },
  },
  {
    header: 'Action',
    accessor: 'action',
    className: 'text-center',
    render: (row: any) => (
      <div className="flex items-center justify-center gap-2">
        <Link href={`/dashboard/tickets/edit/${row._id}`}>
          <Icon name="edit" />
        </Link>
        <Icon name="view" />
        <DeleteConfirm>
          <Icon name="delete" />
        </DeleteConfirm>
      </div>
    ),
  },
];

const Tickets = ({ ticketsData }: TicketsProps) => {
  return (
    <div className="space-y-2">
      {/* Filters */}
      <div className="flex justify-between  ">
        <div></div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger>
              <Button variant="outline" className="border-primary-100 text-primary-100">
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-w-fit" align="end">
              <div className="flex items-center gap-2">Filters...</div>
            </PopoverContent>
          </Popover>

          <Button asChild className="bg-black text-white">
            <Link href="/dashboard/tickets/create-ticket">
              <Plus />
              <span>Create Tickets</span>
            </Link>
          </Button>
        </div>
      </div>
      {/* Tickets Data */}
      <div className="space-y-4 min-h-[60svh] flex flex-col justify-between">
        <CommonTable columns={columns} data={ticketsData.data} />
        <Paginator totalItems={ticketsData.count} />
      </div>
    </div>
  );
};

export default Tickets;
