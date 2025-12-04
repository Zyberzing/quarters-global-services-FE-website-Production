import ServiceForm from '@/components/forms/userForm/serviceForm/ServiceForm';
import DashboardLayout from '@/layout/DashboardLayout';
import React from 'react';

const page = () => {
  return (
    <DashboardLayout>
      <p className="py-4 text-lg font-semibold">Add New Services</p>
      <ServiceForm />
    </DashboardLayout>
  );
};

export default page;