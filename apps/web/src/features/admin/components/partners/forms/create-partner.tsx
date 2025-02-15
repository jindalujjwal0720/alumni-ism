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
import { useCreatePartnerMutation } from '@/features/admin/api/partners';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/errors';

const createPartnerFormSchema = z
  .object({
    name: z.string().min(1, {
      message: 'Name is required',
    }),
    email: z.string().email(),
    password: z.string().min(1, {
      message: 'Password is required',
    }),
    passwordConfirmation: z.string().min(1, {
      message: 'Password confirmation is required',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
  });

type CreatePartnerFormValues = z.infer<typeof createPartnerFormSchema>;

const CreatePartnerForm = () => {
  const form = useForm<CreatePartnerFormValues>({
    resolver: zodResolver(createPartnerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });
  const [createPartner, { isLoading }] = useCreatePartnerMutation();

  const onSubmit = async (data: CreatePartnerFormValues) => {
    try {
      await createPartner(data).unwrap();
      form.reset();
      toast.success('Partner created successfully');
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
                  <Input placeholder="Partner mame" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Partner email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Partner'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePartnerForm;
