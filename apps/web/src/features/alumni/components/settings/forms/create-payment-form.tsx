import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getErrorMessage } from '@/utils/errors';
import { useCreatePaymentMutation } from '@/features/alumni/api/alumni';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { amountToWords } from '@/utils/numbers';
import { Textarea } from '@/components/ui/textarea';

const paymentFormSchema = z.object({
  category: z.enum(['donation', 'yearly', 'lifetime']),
  amountInINR: z.coerce.number().min(0),
  amountInWords: z.string(),
  remark: z.string().max(200),
  paymentVerificationLink: z.string().url(),
});

type paymentFormValues = z.infer<typeof paymentFormSchema>;

export const CreatePaymentForm = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  const form = useForm<paymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      category: 'donation',
      amountInINR: 0,
      amountInWords: 'zero',
      remark: '',
      paymentVerificationLink: '',
    },
  });
  const [createPayment, { isLoading }] = useCreatePaymentMutation();

  const handleSubmit = async (values: paymentFormValues) => {
    try {
      await createPayment(values).unwrap();
      toast.success('Payment created successfully');
      onSuccess?.();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-2 flex flex-col-reverse sm:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="donation">Donation</SelectItem>
                          <SelectItem value="yearly">
                            Yearly subscription
                          </SelectItem>
                          <SelectItem value="lifetime">
                            Lifetime subscription
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amountInINR"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (INR)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const amount = parseInt(e.target.value);
                          form.setValue('amountInWords', amountToWords(amount));
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amountInWords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (In Words)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="/centenary/donation-qr.png"
                alt="alumnifund@sbi QR code"
                className="size-48"
              />
              <figcaption className="text-sm text-muted-foreground">
                alumnifund@sbi
              </figcaption>
            </div>
          </div>
          <FormField
            control={form.control}
            name="paymentVerificationLink"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Payment Verification Link</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Link to your payment verification"
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  This link can be a screenshot of the payment receipt or a link
                  to any other proof of payment.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="remark"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Remark</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Any remarks about the payment"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Payment'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
