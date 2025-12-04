import { Button } from '../ui/button';
import { BadgeAlert } from 'lucide-react';
import { ReactNode } from 'react';

const ErrorBox = ({
  message,
  description,
  onRetry,
  icon,
  subComponent,
}: {
  message?: string;
  description?: string;
  onRetry?: VoidFunction;
  subComponent?: ReactNode;
  icon?: ReactNode; // Accepts a custom icon as ReactNode
}) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4 py-20 text-center">
      <div className="text-muted-foreground size-14">
        {icon ? icon : <BadgeAlert className="text-muted-foreground size-14" />}
      </div>
      <h1 className="text-muted-foreground text-xl font-bold">{message || 'Data not available'}</h1>
      {description && <p className="text-muted-foreground">{description}</p>}
      {subComponent}
      {onRetry && <Button onClick={onRetry}>Try Again</Button>}
    </div>
  );
};

export default ErrorBox;