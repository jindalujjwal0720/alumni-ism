import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/errors';
import { useCreateOfferMutation } from '@/features/partner/api/offers';
import { Textarea } from '@/components/ui/textarea';

const createOfferFormSchema = z.object({
  description: z.string().min(1, {
    message: 'Description is required',
  }),
  tags: z.array(z.string()).nonempty({
    message: 'At least one tag is required',
  }),
});

type CreateOfferFormValues = z.infer<typeof createOfferFormSchema>;

const CreateOfferForm = () => {
  const form = useForm<CreateOfferFormValues>({
    resolver: zodResolver(createOfferFormSchema),
    defaultValues: {
      description: '',
      tags: [],
    },
  });
  const [createOffer, { isLoading }] = useCreateOfferMutation();

  const onSubmit = async (data: CreateOfferFormValues) => {
    try {
      await createOffer(data).unwrap();
      form.reset();
      toast.success('Offer created successfully');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Offer Description</FormLabel>
              <FormControl>
                <Textarea placeholder="describe your offer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add tags separated by commas"
                  {...field}
                  onChange={(e) => {
                    field.onChange(
                      e.target.value.split(',').map((tag) => tag.trim()),
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Offer'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateOfferForm;
