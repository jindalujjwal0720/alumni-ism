import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getErrorMessage } from '@/utils/errors';
import { useCreatePledgeMutation } from '@/features/alumni/api/alumni';
import { amountToWords } from '@/utils/numbers';
import { Textarea } from '@/components/ui/textarea';

const pledgeFormSchema = z.object({
  amountInINR: z.coerce.number().min(0),
  amountInWords: z.string(),
  remark: z.string().max(200),
});

type pledgeFormValues = z.infer<typeof pledgeFormSchema>;

export const CreatePledgeForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const form = useForm<pledgeFormValues>({
    resolver: zodResolver(pledgeFormSchema),
    defaultValues: {
      amountInINR: 0,
      amountInWords: 'zero',
      remark: '',
    },
  });
  const [createPledge, { isLoading }] = useCreatePledgeMutation();

  const handleSubmit = async (values: pledgeFormValues) => {
    try {
      await createPledge(values).unwrap();
      toast.success('Pledge created successfully');
      onSuccess?.();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <FormField
          control={form.control}
          name="remark"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Remark</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Any remarks about the pledge"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Pledge'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
