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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  useReadPartnerQuery,
  useUpdatePartnerMutation,
} from '@/features/admin/api/partners';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/errors';
import { useEffect } from 'react';

const editPartnerFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  logo: z.string().url({
    message: 'Logo must be a valid URL',
  }),
  supportUrl: z.string().url({
    message: 'Support URL must be a valid URL',
  }),
  about: z.string().min(1, {
    message: 'About is required',
  }),
});

type EditPartnerFormValues = z.infer<typeof editPartnerFormSchema>;

const EditPartnerForm = ({ partner: partnerId }: { partner: string }) => {
  const form = useForm<EditPartnerFormValues>({
    resolver: zodResolver(editPartnerFormSchema),
    defaultValues: {
      name: '',
      logo: '',
      supportUrl: '',
      about: '',
    },
  });
  const { data: { partnerData } = {} } = useReadPartnerQuery(partnerId, {
    skip: !partnerId,
  });
  const [updatePartner, { isLoading }] = useUpdatePartnerMutation();

  useEffect(() => {
    if (partnerData) {
      form.reset(partnerData);
    }
  }, [partnerData, form]);

  const onSubmit = async (data: EditPartnerFormValues) => {
    try {
      await updatePartner({
        id: partnerId,
        body: { partnerData: data },
      }).unwrap();
      form.reset();
      toast.success('Partner edited successfully');
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
        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Partner name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <Input placeholder="Logo URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="supportUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Support URL</FormLabel>
                <FormControl>
                  <Input placeholder="Support URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Input placeholder="About" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditPartnerForm;
