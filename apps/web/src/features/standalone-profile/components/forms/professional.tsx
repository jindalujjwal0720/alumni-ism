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
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  useReadMyProfessionalDetailsQuery,
  useUpsertMyProfessionalDetailsMutation,
} from '../../api/details';

const schema = z.object({
  currentCompany: z.string().optional(),
  designation: z.string().optional(),
  currentCompanyWebsite: z
    .string()
    .url({ message: 'Please enter a valid url' })
    .optional(),
  totalExperienceYears: z.coerce.number().int().min(0).optional(),
});

type FormValues = z.infer<typeof schema>;

export const ProfessionalDetailsForm = ({
  minimal = false,
}: {
  minimal?: boolean;
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentCompany: '',
      designation: '',
      currentCompanyWebsite: '',
      totalExperienceYears: 10,
    },
  });
  const { data: { details } = {}, isLoading } =
    useReadMyProfessionalDetailsQuery(undefined);
  const [upsertProfessionalDetails] = useUpsertMyProfessionalDetailsMutation();
  const formRef = useRef<HTMLFormElement | null>(null);
  useAutoSaveForm(formRef);

  const saveDataToServer = (data: FormValues) => {
    try {
      upsertProfessionalDetails(data).unwrap();
    } catch (_err) {
      // silently fail
    }
  };

  useEffect(() => {
    if (details) {
      form.reset(details);
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
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(saveDataToServer)}
          className="space-y-2"
        >
          <TableView title="Current employment">
            <FormField
              control={form.control}
              name="currentCompany"
              render={({ field }) => (
                <TableViewCell
                  name="Company"
                  description={<FormMessage />}
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="text"
                          placeholder="Google, Microsoft, etc."
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
              name="designation"
              render={({ field }) => (
                <TableViewCell
                  name="Designation"
                  description={<FormMessage />}
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="text"
                          placeholder="Software Engineer, etc."
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
              name="currentCompanyWebsite"
              render={({ field }) => (
                <TableViewCell
                  name="Company website"
                  description={<FormMessage />}
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="url"
                          placeholder="google.com"
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
              name="totalExperienceYears"
              render={({ field }) => (
                <TableViewCell
                  name="Total experience"
                  description={<FormMessage />}
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="number"
                          placeholder="5, 10, etc."
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
          <Show when={!minimal}>
            <p className="px-2 text-muted-foreground text-xs">
              You can change the visibility of your professional details in the
              preference settings.
            </p>
          </Show>
        </form>
      </Form>
    </div>
  );
};
