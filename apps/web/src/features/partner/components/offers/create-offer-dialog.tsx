import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PropsWithChildren } from 'react';
import CreateOfferForm from './forms/create-offer-form';

export const CreateOfferDialog = ({ children }: PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-medium">Create Offer</h2>
        </DialogHeader>
        <DialogDescription>
          Enter the offer's description and tags to create a new offer.
        </DialogDescription>
        <div>
          <CreateOfferForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
