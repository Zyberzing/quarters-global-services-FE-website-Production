'use client';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Ellipsis, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
  online?: boolean;
}

interface ChatSidebarProps {
  contacts: Contact[];
  chatUrl: string;
}

export function ChatSidebar({ contacts, chatUrl }: ChatSidebarProps) {
  const [filter, setFilter] = useState<string[]>([]);

  const filteredContacts = contacts.filter((contact) => {
    return contact;
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <div className={cn('flex flex-col h-full transition-transform duration-300 ease-in-out')}>
        {/* Header */}
        <div className="p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm" className="bg-card rounded-sm size-9">
                  <Filter className="w-4 h-4" />
                  <span className="sr-only">filters</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>filters</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setFilter((pre) => [...pre, 'open']);
                  }}
                >
                  Option
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setFilter((pre) => [...pre, 'open2']);
                  }}
                >
                  Option
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {filter.map((e) => (
              <span
                key={e + 'filter-item'}
                className="flex items-center gap-2 capitalize font-semibold bg-blue-50 border border-blue-400 h-8 px-2 rounded-md"
              >
                {e} <X className="size-4" />
              </span>
            ))}
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {[...filteredContacts].map((contact) => (
            <div
              key={contact.id}
              className={cn(
                'w-full p-3 sm:p-4 flex items-center gap-3 hover:bg-chat-hover transition-colors text-left',
                'activeContactId' === contact.id && 'bg-chat-secondary',
              )}
            >
              <div className="relative flex-shrink-0">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs sm:text-sm">
                    {getInitials(contact.name)}
                  </AvatarFallback>
                </Avatar>
                {contact.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <Link
                    href={chatUrl + '/' + contact.id}
                    className="font-medium text-foreground truncate text-sm sm:text-base"
                  >
                    {contact.name}
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="px-1">
                        <span className="sr-only">contact actions</span>
                        <Ellipsis className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Contact</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Option</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    href={chatUrl + '/' + contact.id}
                    className="text-xs sm:text-sm text-muted-foreground truncate pr-2"
                  >
                    {contact.lastMessage}
                  </Link>
                  {contact.unread && contact.unread > 0 && (
                    <span className="bg-[#D34827] text-background text-xs rounded-sm px-1.5 py-0.5 text-center flex-shrink-0">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
