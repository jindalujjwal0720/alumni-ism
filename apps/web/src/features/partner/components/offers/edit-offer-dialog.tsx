import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PropsWithChildren } from 'react';
import EditOfferForm from './forms/edit-offer-form';

export const EditOfferDialog = ({
  offer,
  open,
  onOpenChange,
  children,
}: PropsWithChildren<{
  offer: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-medium">Edit Offer</h2>
        </DialogHeader>
        <DialogDescription>
          Enter the offer's description and tags to edit the offer.
        </DialogDescription>
        <div>
          <EditOfferForm offer={offer} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
