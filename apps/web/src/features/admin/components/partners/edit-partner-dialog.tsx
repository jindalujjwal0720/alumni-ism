import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PropsWithChildren } from 'react';
import EditPartnerForm from './forms/edit-partner';

export const EditPartnerDialog = ({
  partner,
  open,
  onOpenChange,
  children,
}: PropsWithChildren<{
  partner: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-medium">Edit Partner Data</h2>
        </DialogHeader>
        <DialogDescription>
          Enter the partner's name, logo URL, support URL, and about to edit the
          partner's data.
        </DialogDescription>
        <div>
          <EditPartnerForm partner={partner} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
