'use client';
import { useRef, useEffect } from 'react';
import ChatContactInfoBar from '@/components/chat/ChatContactInfoBar';
import { Separator } from '@/components/ui/separator';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatForm from '@/components/chat/ChatForm';
import React from 'react';

const mockMessages: Message[] = [
  {
    id: '1',
    content:
      'Thank you. Please enter the amount and date of the transaction (eg 100, December 21th).',
    timestamp: '2023-11-30T13:34:00Z',
    isMine: false,
    type: 'text',
  },
  {
    id: '2',
    content:
      'Thank you. It seems there might be a delay in processing the transaction. What would you like to do next?',
    timestamp: '2023-11-30T13:34:00Z',
    isMine: true,
    type: 'text',
  },
  {
    id: '3',
    content:
      "Hi, this is Alex from Customer Support. I see you're having an issue with your top-up.",
    timestamp: '2023-11-30T13:34:00Z',
    isMine: false,
    type: 'text',
  },
];

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  isMine: boolean;
  type: 'text' | 'file' | 'image';
  fileName?: string;
  fileUrl?: string;
}

// interface Contact {
//   id: string;
//   name: string;
//   avatar?: string;
//   online?: boolean;
// }

const ChatArea = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // const handleSendMessage = (content: string, files?: File[]) => {
  //   if (!activeContactId) return;

  //   const newMessage: Message = {
  //     id: Date.now().toString(),
  //     content,
  //     timestamp: new Date().toISOString(),
  //     isMine: true,
  //     type:
  //       files && files.length > 0
  //         ? files[0].type.startsWith('image/')
  //           ? 'image'
  //           : 'file'
  //         : 'text',
  //     fileName: files?.[0]?.name,
  //     fileUrl: files?.[0] ? URL.createObjectURL(files[0]) : undefined,
  //   };

  //   setMessages((prev) => ({
  //     ...prev,
  //     [activeContactId]: [...(prev[activeContactId] || []), newMessage],
  //   }));

  //   // Simulate a response
  //   setTimeout(() => {
  //     const responseMessage: Message = {
  //       id: (Date.now() + 1).toString(),
  //       content: "Thanks for your message! I'll get back to you shortly.",
  //       timestamp: new Date().toISOString(),
  //       isMine: false,
  //       type: 'text',
  //     };

  //     setMessages((prev) => ({
  //       ...prev,
  //       [activeContactId]: [...(prev[activeContactId] || []), responseMessage],
  //     }));
  //   }, 1000);
  // };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // if (!contact) {
  //   return (
  //     <div className="flex-1 flex items-center justify-center bg-background px-4">
  //       <div className="text-center max-w-sm">
  //         <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-4" />
  //         <h3 className="text-lg font-medium text-foreground mb-2">No conversation selected</h3>
  //         <p className="text-muted-foreground text-sm sm:text-base">
  //           Choose a conversation from the sidebar to start chatting
  //         </p>
  //         {onToggleSidebar && (
  //           <Button onClick={onToggleSidebar} className="mt-4 lg:hidden" variant="outline">
  //             <Menu className="w-4 h-4 mr-2" />
  //             Open Chats
  //           </Button>
  //         )}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="h-full flex-1 flex flex-col bg-background">
      {/* Header */}
      <ChatContactInfoBar />
      <Separator />
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        {[
          ...mockMessages,
          ...mockMessages,
          ...mockMessages,
          ...mockMessages,
          ...mockMessages,
          ...mockMessages,
          ...mockMessages,
          ...mockMessages,
        ].map((message) => (
          <ChatMessage message={message} key={message.id} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <Separator />
      {/* Input Area */}
      <ChatForm />
    </div>
  );
};

export default ChatArea;
