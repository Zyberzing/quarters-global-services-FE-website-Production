import DashboardLayout from '@/layout/DashboardLayout';
import Payments from './Payments';
import { getTransactions } from '@/services/transactionService';

const page = async ({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) => {
  const page = (await searchParams).page || '1';
  const search = (await searchParams).q || '';

  // Fetch customers data
  const data = await getTransactions({ page, search });
  console.log('Transactions Data:', data);
  return <DashboardLayout>
    <Payments transactionsData={data} />
  </DashboardLayout>;
};

export default page;