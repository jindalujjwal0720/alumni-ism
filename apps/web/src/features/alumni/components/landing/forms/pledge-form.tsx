import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { selectIsAuthenticated } from '@/features/auth/stores/auth';
import { amountToWords } from '@/utils/numbers';
import { cn } from '@/utils/tw';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize } from 'lodash';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { z } from 'zod';
import { PledgeDialog } from '../../pledges-and-donations/pledge-dialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CONTACT_EMAIL = 'iraa@iitism.ac.in';

const alumniPledgeFormSchema = z.object({
  amount: z
    .number()
    .min(1000)
    .refine((val) => val % 1000 === 0, {
      message: 'Amount must be in multiples of 1000',
    }),
  fullName: z.string().min(3),
  contactNumber: z.string().min(10),
});

type AlumniPledgeFormValues = z.infer<typeof alumniPledgeFormSchema>;

const numberToINRString = (num: number) =>
  num.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

export const AlumniPledgeForm = () => {
  const form = useForm<AlumniPledgeFormValues>({
    resolver: zodResolver(alumniPledgeFormSchema),
    defaultValues: {
      amount: 0,
      fullName: '',
      contactNumber: '',
    },
  });
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isPledgeDialogOpen, setIsPledgeDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values: AlumniPledgeFormValues) => {
    if (isAuthenticated) {
      return setIsPledgeDialogOpen(true);
    }

    const emailBody = `Hi Alumni Office,

I would like to pledge a donation to support the facilities and services provided to students and alumni at IIT Dhanbad. Please find my details below:

Contribution Amount: ${numberToINRString(values.amount)}
Contribution Amount (in words): ${capitalize(amountToWords(values.amount))} INR only
Contributor Name: ${values.fullName}
Contact Number: ${values.contactNumber}

Warm Regards,
${values.fullName}
`.replace(/\n/g, '%0D%0A');

    window.open(
      `mailto:${CONTACT_EMAIL}?subject=Donation Pledge&body=${emailBody}`,
    );

    form.reset();
  };

  return (
    <Form {...form}>
      <PledgeDialog
        open={isPledgeDialogOpen}
        onOpenChange={setIsPledgeDialogOpen}
        onSuccess={() => {
          setIsPledgeDialogOpen(false);
          form.reset();

          // navigate to the pledges page
          navigate('/settings/donations');
        }}
      />
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-md mx-auto"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-1">
                  <FormLabel className="text-slate-200">
                    Contribution Amount (₹)
                  </FormLabel>
                  <FormControl>
                    <div>
                      <div className="grid grid-cols-3 gap-3">
                        {[100000, 500000, 1000000].map((amt) => (
                          <div
                            key={amt}
                            onClick={() => form.setValue('amount', amt)}
                            className={cn(
                              'p-2 flex items-center justify-center rounded-md bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 hover:text-primary-foreground transition-colors',
                              field.value === amt &&
                                'bg-indigo-600 text-primary-foreground hover:bg-indigo-600/70',
                            )}
                          >
                            {amt.toLocaleString('en-IN')}
                          </div>
                        ))}
                      </div>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Custom Amount"
                        min={1000}
                        step={1000}
                        className="!mt-2 w-full bg-slate-800/50 border border-slate-700 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Ujjwal Jindal"
                    className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Contact Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="9876543210"
                    className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button type="submit" className="primary-button w-full">
              Take a Pledge
            </Button>
            <Button
              type="button"
              variant="link"
              className="w-full mt-2 bg-transparent text-muted-foreground hover:text-primary-foreground hover:bg-transparent"
              onClick={() => {
                navigate('/settings/donations');
              }}
            >
              Donate Now
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
