'use client';
import DeleteConfirm from '@/components/common/DeleteConfirm';
import Icon from '@/components/common/Icon';
import { deleteCustomer } from '@/services/customerService';
import React, { useState } from 'react';

const DeleteCustomer = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteCustomer(id);
    } catch (error) {
      console.error('Error deleting customer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DeleteConfirm onConfirm={handleDelete}>
      <Icon name={isLoading ? 'loading' : 'delete'} />
    </DeleteConfirm>
  );
};

export default DeleteCustomer;