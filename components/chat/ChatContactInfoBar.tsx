'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { ChevronDown, User } from 'lucide-react';

const ChatContactInfoBar = () => {
  return (
    <div className="p-2 sm:p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
            <AvatarImage src={'contact.avatar'} alt={'contact.name'} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs sm:text-sm">
              {/* {getInitials(contact.name)} */} rt
            </AvatarFallback>
          </Avatar>
          {/* {contact.online && (
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 border-2 border-white rounded-full"></div>
            )} */}
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-base">
            {/* {contact.name} */}
            Lorem ipsum dolor sit
          </h3>
          <p className="text-sm text-muted-foreground font-medium">
            {/* {contact.online ? 'Online' : 'Offline'} */}
            Online
          </p>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="shadow">
        <User />
        <ChevronDown />
      </Button>
    </div>
  );
};

export default ChatContactInfoBar;
