import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PropsWithChildren } from 'react';
import CreatePartnerForm from './forms/create-partner';

export const CreatePartnerDialog = ({ children }: PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-medium">Create Partner</h2>
        </DialogHeader>
        <DialogDescription>
          Enter the partner's name, email and password to create a new partner.
        </DialogDescription>
        <div>
          <CreatePartnerForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
