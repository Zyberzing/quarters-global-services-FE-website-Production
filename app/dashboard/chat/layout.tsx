import DashboardLayout from "@/layout/DashboardLayout";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ChatLayout = ({ children }: Props) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
};

export default ChatLayout;
