import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CreatePledgeForm } from './forms/create-pledge-form';

export const PledgeDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Take a pledge</DialogTitle>
          <DialogDescription>
            Please fill the form below to take a pledge for the alumni
            association
          </DialogDescription>
        </DialogHeader>
        <CreatePledgeForm onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
};
