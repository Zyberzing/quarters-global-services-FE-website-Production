import React, { ReactNode } from 'react';
import ChatLayout from './ChatLayout';
import DashboardLayout from '@/layout/DashboardLayout';

const layout = ({ children }: { children: ReactNode }) => {
  return <DashboardLayout><ChatLayout>{children}</ChatLayout></DashboardLayout>
};

export default layout;
