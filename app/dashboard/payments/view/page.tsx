'use client';

import DashboardLayout from '@/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSearchParams, useRouter } from 'next/navigation';
import Icon from '@/components/common/Icon';

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paymentId = searchParams.get('id');

  // ------------------------
  // Dummy Payment Detail
  // ------------------------
  const payment = {
    id: paymentId || 'PAY-1001',
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
    remarks: 'Payment received successfully',
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 ">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Payment Details</h2>

          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
        </div>

        {/* Payment Info */}
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Info label="Payment ID" value={payment.id} />
              <Info label="Application ID" value={payment.applicationId} />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Info label="Customer Name" value={payment.name} />
              <Info label="Email" value={payment.email} />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Info label="Phone" value={payment.phone} />
              <Info label="Payment Method" value={payment.method} />
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Info
                label="Amount"
                value={`${payment.amount} ${payment.currency}`}
              />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge
                  variant={
                    payment.status === 'Paid'
                      ? 'default'
                      : payment.status === 'Pending'
                      ? 'secondary'
                      : 'destructive'
                  }
                >
                  {payment.status}
                </Badge>
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Info label="Transaction ID" value={payment.transactionId} />
              <Info label="Payment Date" value={payment.date} />
            </div>

            {/* Remarks */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">Remarks</p>
              <p className="text-sm bg-gray-50 p-3 rounded-md">
                {payment.remarks}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

// ------------------------
// Reusable Info Field
// ------------------------
const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="font-medium">{value || '-'}</p>
  </div>
);

export default Page;
