'use client';
import React, { ReactNode } from 'react';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PanelLeftOpen } from 'lucide-react';

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
  online?: boolean;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Mr. Rosemary Koss',
    lastMessage: 'Hi, I want to ask something...',
    timestamp: '13:34',
    unread: 1,
    online: true,
  },
  {
    id: '1',
    name: 'Mr. Rosemary Koss',
    lastMessage: 'Hi, I want to ask something...',
    timestamp: '13:34',
    unread: 1,
    online: true,
  },
  {
    id: '1',
    name: 'Mr. Rosemary Koss',
    lastMessage: 'Hi, I want to ask something...',
    timestamp: '13:34',
    unread: 1,
    online: true,
  },
  {
    id: '2',
    name: "Ms. Dorin O'Keefe",
    lastMessage: 'Hi, I want to ask something...',
    timestamp: '13:34',
    unread: 1,
    online: false,
  },
  {
    id: '3',
    name: 'Irene Dicki',
    lastMessage: 'Hi, I want to ask something...',
    timestamp: '13:34',
    unread: 1,
    online: true,
  },
  {
    id: '4',
    name: 'Cora Goyette',
    lastMessage: 'Speaking to a Representative',
    timestamp: '13:34',
    online: true,
  },
];

const ChatLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-[88svh] flex flex-col lg:flex-row gap-4">
      {/* After 1024px */}
      <div className="bg-secondary border rounded-lg w-[360px] hidden lg:block">
        <ChatSidebar contacts={mockContacts} chatUrl=" /dashboard/chat" />
      </div>
      {/* Below 1020px */}
      <div className="block lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <PanelLeftOpen />
              <span>Chats</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="sr-only"></SheetTitle>
              <SheetDescription className="sr-only"></SheetDescription>
              <ChatSidebar contacts={mockContacts} chatUrl="/dashboard/chat" />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex-1 flex flex-col min-w-0 border rounded-lg overflow-auto">{children}</div>
    </div>
  );
};

export default ChatLayout;
