'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { ReactNode } from 'react';
import { TransactionDataType } from '@/services/transactionService';
import { formatCurrency } from '@/lib/formatCurrency';

interface Props {
  children: ReactNode;
  transaction: TransactionDataType | null;
}

function PaymentDetailsModal({ children, transaction }: Props) {
  

  return (
    <Dialog>
      <DialogTrigger >{children}</DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Transaction Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-2 text-sm">
          {/* <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Payment ID</span>
            <span>{transaction._id}</span>
          </div> */}

          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Name</span>
            <div>
              <span>{transaction.user.firstName}</span> <span>{transaction.user.lastName}</span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Email</span>
            <span>{transaction.user.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Amount</span>
            <span>{formatCurrency({ amount: transaction.amount || '0' })}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Service</span>
            {/* <span>{transaction.service}</span> */}
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Service Type</span>
            {/* <span>{transaction.serviceType}</span> */}
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Payment Method</span>
            <span>{transaction.paymentMode}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Date </span>
            <span>{new Date(transaction.updatedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Time</span>
            <span>
              {new Date(transaction.updatedAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Payment Status</span>
            <Badge
              variant={transaction.paymentStatus === 'Pending' ? 'secondary' : 'default'}
              className="capitalize"
            >
              {transaction.paymentStatus}
            </Badge>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PaymentDetailsModal;