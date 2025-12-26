import ChatLayout from './ChatLayout';
import { MessageSquareDashed } from 'lucide-react';

const page = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <ChatLayout searchParams={searchParams}>
      <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in-50 duration-500">
        {/* Icon Circle */}
        <div className="bg-muted/30 p-6 rounded-full mb-6 ring-1 ring-border">
          <MessageSquareDashed className="h-12 w-12 text-muted-foreground/50" />
        </div>

        {/* Headings */}
        <h2 className="text-2xl font-semibold tracking-tight mb-2">Select a conversation</h2>

        <p className="text-muted-foreground max-w-sm mb-8 text-sm">
          Choose an existing chat from the sidebar or start a new conversation to begin messaging.
        </p>
      </div>
    </ChatLayout>
  );
};

export default page;
