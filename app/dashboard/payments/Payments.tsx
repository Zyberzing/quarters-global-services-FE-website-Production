import CommonTable from '@/components/common/CommonTable';
import Paginator from '@/components/shared/paginator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/formatCurrency';
import { ApiPagination } from '@/lib/Types';
import { TransactionDataType } from '@/services/transactionService';
import { Eye } from 'lucide-react';
import PaymentDetailsModal from './PaymentDetailsModal';
import QueryInputSearch from '@/components/shared/QueryInputSearch';


// Columns
const columns = [

  {
    header: 'Transaction ID',
    accessor: 'transactionId',
  },
    {
        header: 'Amount',
        accessor: 'amount',
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
        header: 'Payment Method',
        accessor: 'mode',
        render: (row: any) => <span className="capitalize">{row.mode}</span>,
    },
    {
        header: 'Date',
        accessor: 'date',
    },
    {
        header: 'Time',
        accessor: 'time',
    },
    {
        header: 'Payment Status',
        accessor: 'status',
        render: (row: any) => (
            <Badge variant="default" className="capitalize">
                {row.status}
            </Badge>
        ),
    },
    {
        header: 'Action',
        accessor: 'action',
        className: 'text-center',
        render: (row: any) => (
            <div className="flex justify-center">
                <PaymentDetailsModal transaction={row.transaction}>
                    <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                    </Button>
                </PaymentDetailsModal>
            </div>
        ),
    },
];

// Component
const Payments = ({transactionsData}: {transactionsData: ApiPagination & { data: TransactionDataType[] };}) => {
   
    const payments = transactionsData.data.map((e) => ({
        transactionId: e.transactionId  || '—',
        amount: `$ ${e.amount || '0'}`,
        service: e.paymentMode,
        serviceType: e.paymentMode,
        mode: e.paymentMode,
        date: e.updatedAt ? new Date(e.updatedAt).toLocaleDateString() : '-',
        time: e.updatedAt
            ? new Date(e.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : '-',
        status: e.paymentStatus,
        avatar: '',
        transaction: e,
    }));

    return (
        <div className="space-y-2">
            {/* Filters */}
            <div className="flex items-center justify-end gap-2">
                <QueryInputSearch />
            </div>

            {/* Table */}
            <div className="space-y-4 min-h-[60svh] flex flex-col justify-between">
                <CommonTable columns={columns} data={payments} />
                <Paginator totalItems={transactionsData.totalPages} />
            </div>
        </div>
    );
};

export default Payments;