import React from 'react';
import { cn } from '@/lib/utils';
import { File } from 'lucide-react';
import Image from 'next/image';
import { Message } from '@/app/dashboard/chat/[user]/page';

const ChatMessage = ({ message }: { message: Message }) => {
  return (
    <div key={message.id} className={cn('flex', message.isMine ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] sm:max-w-[70%] rounded-2xl px-3 py-2 sm:px-4 sm:py-2 transition-all',
          message.isMine
            ? 'bg-primary text-primary-foreground ml-auto rounded-br-none'
            : 'bg-secondary text-secondary-foreground  rounded-bl-none',
        )}
      >
        {message.type === 'file' && (
          <div className="flex items-center gap-2 mb-2">
            <File className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm truncate">{message.fileName}</span>
          </div>
        )}
        {message.type === 'image' && message.fileUrl && (
          <div className="mb-2">
            <Image
              src={message.fileUrl}
              alt="Shared image"
              width={300}
              height={300}
              className="rounded-lg max-w-full h-auto max-h-64 object-cover"
            />
          </div>
        )}
        <p className="text-sm leading-relaxed break-words">{message.content}</p>
        <p className={cn('text-xs mt-1 text-right')}>
          {/* {formatTime(message.timestamp)} */}
          10:30
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
