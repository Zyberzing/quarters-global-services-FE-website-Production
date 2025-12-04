 
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

type DeleteConfirmProps = {
  children?: ReactNode;
  title?: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  triggerLabel?: string;
};

export function DeleteConfirm({
  children,
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone. This will permanently delete your data.',
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  onConfirm,
  onCancel,
  triggerLabel = 'Show Dialog',
}: DeleteConfirmProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children ?? <Button variant="outline">{triggerLabel}</Button>}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle >{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive hover:bg-destructive/70">
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteConfirm;