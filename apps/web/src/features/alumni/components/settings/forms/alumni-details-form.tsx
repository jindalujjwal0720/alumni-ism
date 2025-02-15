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
import { Label } from '@/components/ui/label';
import { useGetMeQuery } from '@/features/auth/api/auth';
import { Textarea } from '@/components/ui/textarea';

const accountFormSchema = z.object({
  // personal details
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters long',
  }),
  alias: z
    .string()
    .min(3, {
      message: 'Alias must be at least 3 characters long',
    })
    .default(''),
  // graduation details
  degree: z.string().default('B.Tech'),
  branch: z.string().default('Mining Engineering'),
  yearOfGraduation: z.coerce
    .number()
    .int()
    .positive()
    .min(1926)
    .max(new Date().getFullYear() + 5),
  // contact details
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 characters long',
  }),
  permanentAddress: z.string().default(''),
  // professional details
  pan: z.string().default(''),
  company: z.string().default(''),
  designation: z.string().default(''),
  location: z.string().default(''),
  // verification
  verificationDocLink: z.string().url({
    message: 'Invalid URL',
  }),
});

type AlumniDetailsFormValues = z.infer<typeof accountFormSchema>;

export const AlumniDetailsForm = () => {
  const { data: { user } = {} } = useGetMeQuery();
  const { data: { alumni } = {} } = useGetMyAlumniDataQuery(undefined);
  const defaultValues: AlumniDetailsFormValues = {
    name: '',
    alias: '',
    degree: 'B.Tech',
    branch: 'Mining Engineering',
    yearOfGraduation: new Date().getFullYear(),
    phone: '',
    permanentAddress: '',
    pan: '',
    company: '',
    designation: '',
    location: '',
    verificationDocLink: '',
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
        name: alumni.updates?.name ?? alumni.name,
        alias: alumni.updates?.alias ?? alumni.alias,
        degree: alumni.updates?.degree ?? alumni.degree,
        branch: alumni.updates?.branch ?? alumni.branch,
        yearOfGraduation:
          alumni.updates?.yearOfGraduation ?? alumni.yearOfGraduation,
        phone: alumni.updates?.phone ?? alumni.phone,
        permanentAddress:
          alumni.updates?.permanentAddress ?? alumni.permanentAddress,
        pan: alumni.updates?.pan ?? alumni.pan,
        company: alumni.updates?.company ?? alumni.company,
        designation: alumni.updates?.designation ?? alumni.designation,
        location: alumni.updates?.location ?? alumni.location,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-6">
            <h3 className="text-lg font-medium">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label>Email</Label>
                <Input value={user?.email} disabled />
              </div>
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
              <FormField
                control={form.control}
                name="permanentAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permanent Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your permanent address"
                        {...field}
                      />
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
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <Input placeholder="B.Tech" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch</FormLabel>
                    <FormControl>
                      <Input placeholder="Mining Engineering" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            <h3 className="text-lg font-medium">Professional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="pan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN</FormLabel>
                    <FormControl>
                      <Input placeholder="Your PAN number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Your company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
                    <FormControl>
                      <Input placeholder="Your designation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Your location" {...field} />
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
