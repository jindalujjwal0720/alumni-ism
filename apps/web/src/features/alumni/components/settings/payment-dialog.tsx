import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CreatePaymentForm } from './forms/create-payment-form';

export const PaymentDialog = ({
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
          <DialogTitle>Create Payment</DialogTitle>
          <DialogDescription>
            Please transfer the amount to the following QR code and fill the
            form below
          </DialogDescription>
        </DialogHeader>
        <CreatePaymentForm onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
};
