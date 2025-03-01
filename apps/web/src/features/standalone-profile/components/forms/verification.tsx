import { Show } from '@/components/show';
import {
  TableView,
  TableViewCell,
  TableViewLoading,
} from '@/components/standalone/table-view';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAutoSaveForm } from '@/hooks/useAutoSaveForm';
import { AlumniVerificationDocType } from '@/types/models/alumni';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  useReadMyVerificationDetailsQuery,
  useUpsertMyVerificationDetailsMutation,
} from '../../api/details';

const VERIFICATION_DOC_TYPE_OPTIONS = {
  [AlumniVerificationDocType.AADHAR]: 'Aadhar Card',
  [AlumniVerificationDocType.PASSPORT]: 'Passport',
  [AlumniVerificationDocType.DRIVING_LICENSE]: 'Driving License',
  [AlumniVerificationDocType.PAN]: 'PAN Card',
  [AlumniVerificationDocType.VOTER_ID]: 'Voter ID',
  [AlumniVerificationDocType.OTHER]: 'Other',
} as const;

const schema = z.object({
  verificationDocType: z.nativeEnum(AlumniVerificationDocType),
  verificationDocLink: z
    .string()
    .url({ message: 'Invalid URL!' })
    .max(255, { message: 'Too long!' }),
});

type FormValues = z.infer<typeof schema>;

export const VerificationDetailsForm = () => {
  const { data: { details } = {}, isLoading } =
    useReadMyVerificationDetailsQuery(undefined);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      verificationDocType:
        details?.verificationDocType ?? AlumniVerificationDocType.AADHAR,
      verificationDocLink: '',
    },
  });
  const [upsertVerificationDetails] = useUpsertMyVerificationDetailsMutation();
  const formRef = useRef<HTMLFormElement | null>(null);
  useAutoSaveForm(formRef);

  const saveDataToServer = (data: FormValues) => {
    try {
      upsertVerificationDetails(data).unwrap();
    } catch (_err) {
      // silently fail
    }
  };

  useEffect(() => {
    if (details) {
      form.reset({
        verificationDocType: details.verificationDocType,
        verificationDocLink: details.verificationDocLink,
      });
    }
  }, [details, form]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <TableViewLoading />
      </div>
    );
  }

  return (
    <div>
      <Form {...form}>
        <form
          ref={formRef}
          className="space-y-4"
          onSubmit={form.handleSubmit(saveDataToServer)}
        >
          <TableView title="Verification details">
            <FormField
              control={form.control}
              name="verificationDocType"
              render={({ field }) => (
                <TableViewCell
                  name="Document Type"
                  description={<FormMessage />}
                  status={VERIFICATION_DOC_TYPE_OPTIONS[field.value]}
                >
                  <div className="pl-4 text-muted-foreground bg-muted/50">
                    <div className="divide-y">
                      {Object.entries(AlumniVerificationDocType).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between p-2"
                            onClick={() => {
                              field.onChange(value);
                              formRef.current?.dispatchEvent(
                                new Event('input', { bubbles: true }),
                              );
                            }}
                          >
                            <label htmlFor={key}>
                              {VERIFICATION_DOC_TYPE_OPTIONS[value]}
                            </label>
                            <Show when={field.value === value}>
                              <span className="text-primary pr-2">✓</span>
                            </Show>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </TableViewCell>
              )}
            />
            <FormField
              control={form.control}
              name="verificationDocLink"
              render={({ field }) => (
                <TableViewCell
                  name="Document Link"
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="text"
                          placeholder="https://drive.google.com/..."
                          className="w-full text-end"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  }
                />
              )}
            />
          </TableView>
        </form>
      </Form>
    </div>
  );
};
