'use client';

import React, { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { Loader, Pencil, Eye, Trash2 } from 'lucide-react';

type IconName = 'loading' | 'edit' | 'view' | 'delete';

interface IconProps {
  name: IconName;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, onClick, disabled, className }) => {
  const iconSize = 18;

  const icons: Record<IconName, JSX.Element> = {
    loading: <Loader className="animate-spin" size={iconSize} />,
    edit: <Pencil size={iconSize} />,
    view: <Eye size={iconSize} />,
    delete: <Trash2 size={iconSize} className="text-red-500" />,
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={`p-2 hover:bg-accent ${className || ''}`}
      onClick={onClick}
      disabled={disabled || name === 'loading'}
    >
      {icons[name]}
    </Button>
  );
};

export default Icon;