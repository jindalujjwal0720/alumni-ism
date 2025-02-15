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
import {
  useReadOfferQuery,
  useUpdateOfferMutation,
} from '@/features/partner/api/offers';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';

const editOfferFormSchema = z.object({
  description: z.string().min(1, {
    message: 'Description is required',
  }),
  tags: z.array(z.string()).nonempty({
    message: 'At least one tag is required',
  }),
});

type EditOfferFormValues = z.infer<typeof editOfferFormSchema>;

const EditOfferForm = ({ offer: offerId }: { offer: string }) => {
  const form = useForm<EditOfferFormValues>({
    resolver: zodResolver(editOfferFormSchema),
    defaultValues: {
      description: '',
      tags: [],
    },
  });
  const { data: { offer } = {} } = useReadOfferQuery(offerId, {
    skip: !offerId,
  });
  const [updateOffer, { isLoading }] = useUpdateOfferMutation();

  useEffect(() => {
    if (offer) {
      form.reset(offer);
    }
  }, [offer, form]);

  const onSubmit = async (data: EditOfferFormValues) => {
    try {
      await updateOffer({
        id: offerId,
        body: { offer: data },
      }).unwrap();
      toast.success('Offer edited successfully');
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
                  value={field.value.join(', ')}
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
            {isLoading ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditOfferForm;
