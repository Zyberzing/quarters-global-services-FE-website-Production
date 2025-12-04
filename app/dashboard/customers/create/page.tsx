 import CustomerForm from '@/components/form/customerForm/CustomerForm';
import React from 'react';

const page = async () => {
  
  return (
    <div>
      <p className="py-4 text-lg font-semibold">Add New User</p>
      <CustomerForm />
    </div>
  );
};

export default page;