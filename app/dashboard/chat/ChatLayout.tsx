import React, { ReactNode } from 'react';
import { ChatSidebar } from './components/ChatSidebar';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { NewChatDialog } from './components/NewChatDialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { UserTypeENUM } from '@/lib/Types';
import { getChatsList } from '@/services/chatService';

// Next.js Server Component
const ChatLayout = async ({
  children,
  searchParams,
}: {
  children: ReactNode;
  searchParams: Promise<{ tab?: UserTypeENUM }>;
}) => {
  const session = await getSession();
  4;
  if (!session) {
    return redirect('/login');
  }

  const activeTab = (await searchParams).tab || UserTypeENUM.AGENT;

  // Fetch data on the server
  const { data: chats } = await getChatsList(activeTab);

  return (
    <div className="h-[calc(100vh-2rem)] grid grid-cols-1 lg:grid-cols-[360px_1fr] grid-rows-[auto_1fr] gap-4">
      <div className="col-span-2 h-fit flex items-center justify-between gap-2">
        <NewChatDialog currentUserId={session.id} role={activeTab} title="Chat with" />
      </div>
      <div className="hidden lg:flex flex-col bg-background border rounded-lg overflow-hidden h-full">
        <ChatSidebar chats={chats} currentUserId={session.id} />
      </div>
      <div className="flex flex-col bg-background border rounded-lg overflow-hidden h-full min-w-0">
        {children}
      </div>
    </div>
  );
};

export default ChatLayout;
