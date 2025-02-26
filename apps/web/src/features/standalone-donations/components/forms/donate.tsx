import { QRCode } from '@/components/qr-code';
import { Show } from '@/components/show';
import { TableView, TableViewCell } from '@/components/standalone/table-view';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AutoResizeTextarea } from '@/components/ui/textarea';
import { DonationPurpose, PaymentCategory } from '@/types/models/payment';
import { amountToWords } from '@/utils/numbers';
import { generateUniqueReferenceNumber, generateUpiLink } from '@/utils/upi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const UPI_ID = 'example@bank';
const BENEFACTOR_NAME = 'IIT(ISM) Alumni Fund';

const DONATION_PURPOSE_OPTIONS = {
  [DonationPurpose.GENERAL]: 'General',
  [DonationPurpose.SCHOLARSHIP]: 'Scholarship',
  [DonationPurpose.INFRASTRUCTURE]: 'Infrastructure',
  [DonationPurpose.OTHER]: 'Other',
} as const;

const schema = z.object({
  category: z.nativeEnum(PaymentCategory),
  purpose: z.nativeEnum(DonationPurpose),
  amountInINR: z.coerce.number().int().positive(),
  amountInWords: z.string(),
  referenceNumber: z.string(),
  remark: z.string().max(255).optional(),
});

type FormValues = z.infer<typeof schema>;

export const DonateForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: PaymentCategory.DONATION,
      purpose: DonationPurpose.GENERAL,
      amountInINR: 10000,
      amountInWords: amountToWords(10000),
      referenceNumber: '',
      remark: '',
    },
  });
  const currentAmount = form.watch('amountInINR');
  const currentReferenceNumber = form.watch('referenceNumber');
  const upiUrl = useMemo(
    () =>
      generateUpiLink({
        vpa: UPI_ID,
        name: BENEFACTOR_NAME,
        amount: currentAmount,
        referenceId: currentReferenceNumber,
        note: currentReferenceNumber,
      }),
    [currentAmount, currentReferenceNumber],
  );
  const gpayUpiUrl = useMemo(
    () =>
      generateUpiLink({
        vpa: UPI_ID,
        name: BENEFACTOR_NAME,
        amount: currentAmount,
        referenceId: currentReferenceNumber,
        note: currentReferenceNumber,
        provider: 'googlepay',
      }),
    [currentAmount, currentReferenceNumber],
  );
  const phonePeUpiUrl = useMemo(
    () =>
      generateUpiLink({
        vpa: UPI_ID,
        name: BENEFACTOR_NAME,
        amount: currentAmount,
        referenceId: currentReferenceNumber,
        note: currentReferenceNumber,
        provider: 'phonepe',
      }),
    [currentAmount, currentReferenceNumber],
  );
  const paytmUpiUrl = useMemo(
    () =>
      generateUpiLink({
        vpa: UPI_ID,
        name: BENEFACTOR_NAME,
        amount: currentAmount,
        referenceId: currentReferenceNumber,
        note: currentReferenceNumber,
        provider: 'paytm',
      }),
    [currentAmount, currentReferenceNumber],
  );

  const handleSubmit = (data: FormValues) => {
    console.log('Donating...', data);
  };

  const handleGenerateReferenceNumber = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    form.setValue('referenceNumber', generateUniqueReferenceNumber());
  };

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <TableView title="Details">
            <FormField
              control={form.control}
              name="amountInINR"
              render={({ field }) => (
                <TableViewCell
                  name="Amount (INR)"
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="number"
                          min={0}
                          placeholder="10000"
                          className="w-full text-end"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            form.setValue(
                              'amountInWords',
                              amountToWords(Number(e.target.value)),
                            );
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  }
                />
              )}
            />
            <FormField
              control={form.control}
              name="amountInWords"
              render={({ field }) => (
                <TableViewCell
                  name="Amount (in words)"
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="text"
                          min={0}
                          placeholder="Ten thousand"
                          className="w-full text-end"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  }
                />
              )}
            />
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <TableViewCell
                  name="Purpose"
                  description={<FormMessage />}
                  status={DONATION_PURPOSE_OPTIONS[field.value]}
                >
                  <div className="pl-4 text-muted-foreground bg-muted/50">
                    <div className="divide-y">
                      {Object.entries(DonationPurpose).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between p-2"
                          onClick={() =>
                            field.onChange(
                              DonationPurpose[
                                key as keyof typeof DonationPurpose
                              ],
                            )
                          }
                        >
                          <label htmlFor={key}>
                            {DONATION_PURPOSE_OPTIONS[value]}
                          </label>
                          <Show when={field.value === value}>
                            <span className="text-primary pr-2">✓</span>
                          </Show>
                        </div>
                      ))}
                    </div>
                  </div>
                </TableViewCell>
              )}
            />
            <FormField
              control={form.control}
              name="remark"
              render={({ field }) => (
                <TableViewCell
                  name="Remark"
                  status={
                    <FormItem>
                      <FormControl>
                        <AutoResizeTextarea
                          variant="standalone"
                          placeholder="Write a remark (optional)..."
                          className="w-full text-end"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  }
                />
              )}
            />
            <TableViewCell
              name="Reference Number"
              description="Unique reference number for this transaction, generated automatically. In case of failure, you can use this reference number to track the transaction."
              status={
                <FormItem>
                  <FormControl>
                    <Input
                      variant="standalone"
                      type="text"
                      placeholder="Reference Number"
                      className="w-full text-end pt-1"
                      {...form.register('referenceNumber')}
                    />
                  </FormControl>
                </FormItem>
              }
            />
            <TableViewCell
              description={
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={handleGenerateReferenceNumber}
                >
                  {currentReferenceNumber ? 'Regenerate' : 'Generate'} Reference
                  Number
                </Button>
              }
            />
          </TableView>
          <TableView title="Actions">
            <Show when={currentAmount <= 100000}>
              <Show when={currentReferenceNumber}>
                <TableViewCell
                  description={
                    <div className="w-full flex items-center justify-center py-2">
                      <QRCode value={upiUrl} />
                    </div>
                  }
                />
                <TableViewCell
                  description={
                    <div className="w-full flex items-center justify-center gap-4 flex-wrap py-2">
                      <Link to={gpayUpiUrl}>
                        <img
                          src="/providers/gpay.png"
                          alt="GPay"
                          className="h-10 rounded-md"
                        />
                      </Link>
                      <Link to={phonePeUpiUrl}>
                        <img
                          src="/providers/phonepe.png"
                          alt="PhonePe"
                          className="h-8 rounded-md"
                        />
                      </Link>
                      <Link to={paytmUpiUrl}>
                        <img
                          src="/providers/paytm.png"
                          alt="Paytm"
                          className="h-10 rounded-md"
                        />
                      </Link>
                      <Link to={upiUrl}>
                        <img
                          src="/providers/upi.png"
                          alt="UPI"
                          className="h-10 rounded-md"
                        />
                      </Link>
                    </div>
                  }
                />
              </Show>
            </Show>
            <Show when={currentAmount > 100000}>
              <TableViewCell
                description={
                  <div className="my-1 p-4 space-y-2 w-full rounded-md bg-orange-100">
                    <p className="text-foreground">
                      Amount exceeds the UPI limit of ₹1,00,000. Please donate
                      via the following bank details:
                    </p>
                    {Object.entries({
                      'Beneficiary Name': 'IIT(ISM) Alumni Fund',
                      'Bank Name': 'State Bank of India, ISM Campus Branch',
                      'Account Number': '35638760219',
                      'IFSC Code': 'SBIN0001641',
                      'Swift Code': 'SBININBB388',
                      'Cheque/Demand Draft':
                        "In favour of 'IIT(ISM) Alumni Fund payable at Dhanbad'",
                    }).map(([key, value]) => (
                      <p key={key} className="text-foreground">
                        <span className="font-semibold">{key}:</span> {value}
                      </p>
                    ))}
                  </div>
                }
              />
            </Show>
            <TableViewCell
              description={
                <Button type="submit" className="w-full">
                  Complete Donation
                </Button>
              }
            />
          </TableView>
        </form>
      </Form>
    </div>
  );
};
