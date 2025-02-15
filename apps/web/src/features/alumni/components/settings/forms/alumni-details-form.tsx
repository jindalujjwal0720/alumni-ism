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
import {
  useCreateOrUpdateMyAlumniDataMutation,
  useGetMyAlumniDataQuery,
} from '@/features/alumni/api/alumni';
import { useEffect } from 'react';
import { TriangleAlert } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const accountFormSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters long',
  }),
  alias: z
    .string()
    .min(3, {
      message: 'Alias must be at least 3 characters long',
    })
    .default(''),
  yearOfGraduation: z.coerce
    .number()
    .int()
    .positive()
    .min(1926)
    .max(new Date().getFullYear() + 5),
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 characters long',
  }),
  verificationDocLink: z.string().url({
    message: 'Invalid URL',
  }),
});

type AlumniDetailsFormValues = z.infer<typeof accountFormSchema>;

export const AlumniDetailsForm = () => {
  const { data: { alumni } = {} } = useGetMyAlumniDataQuery(undefined);
  const defaultValues: AlumniDetailsFormValues = {
    name: alumni?.name || '',
    alias: alumni?.alias || alumni?.name || '',
    yearOfGraduation: alumni?.yearOfGraduation || new Date().getFullYear(),
    phone: alumni?.phone || '',
    verificationDocLink: alumni?.verificationDocLink || '',
  };
  const form = useForm<AlumniDetailsFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });
  const [updateAlumniDetails, { isLoading }] =
    useCreateOrUpdateMyAlumniDataMutation();

  const onSubmit = async (data: AlumniDetailsFormValues) => {
    if (isLoading) return;
    try {
      await updateAlumniDetails(data).unwrap();
      toast.success('Changes saved successfully and forwared for verification');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  useEffect(() => {
    if (alumni) {
      form.reset({
        name: alumni.name,
        alias: alumni.alias || alumni.name,
        yearOfGraduation: alumni.yearOfGraduation,
        phone: alumni.phone,
        verificationDocLink: alumni.verificationDocLink,
      });
    }
  }, [alumni, form]);

  return (
    <Form {...form}>
      {!alumni?.isVerified ? (
        <div className="text-sm text-yellow-600 text-center py-3">
          <TriangleAlert className="inline-block w-4 h-4 mr-2" />
          Please complete your profile and request verification, if not already
          done.
        </div>
      ) : (
        <div className="text-sm text-green-600 text-center py-3">
          <TriangleAlert className="inline-block w-4 h-4 mr-2" />
          Your account is verified. Thank you for your cooperation.
        </div>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="space-y-6">
            <h3 className="text-lg font-medium">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your offical name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alias"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alias</FormLabel>
                    <FormControl>
                      <Input placeholder="Your alias" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the alias that will be displayed on your Alumni
                      Card.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Your phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-6">
            <h3 className="text-lg font-medium">Graduation Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="yearOfGraduation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year of graduation</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1926}
                        step={1}
                        max={new Date().getFullYear() + 5}
                        placeholder="2025"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the year you graduated from IIT Dhanbad
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-6">
            <h3 className="text-lg font-medium">Verification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="verificationDocLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Document Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Link to your verification document"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please provide a link to your verification document.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        <Button type="submit" disabled={isLoading} className="w-full sm:w-max">
          Save and Request Verification
        </Button>
      </form>
    </Form>
  );
};
