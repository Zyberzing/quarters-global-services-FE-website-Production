import TicketForm from '@/components/forms/ticketForm/TicketForm';
import DashboardLayout from '@/layout/DashboardLayout';
const page = async () => {
 

  return (
    <DashboardLayout>
      <TicketForm />
    </DashboardLayout>
  );
};

export default page;
