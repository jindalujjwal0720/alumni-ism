import { Show } from '@/components/show';
import {
  TableView,
  TableViewCell,
  TableViewLoading,
} from '@/components/standalone/table-view';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAutoSaveForm } from '@/hooks/useAutoSaveForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  useReadMyEducationDetailsQuery,
  useUpsertMyEducationDetailsMutation,
} from '../../api/details';

const schema = z.object({
  degree: z.string().min(2),
  branch: z.string().min(2),
  yearOfGraduation: z.coerce.number().int(),
  admissionNumber: z.string().min(4),
});

type FormValues = z.infer<typeof schema>;

export const EducationDetailsForm = ({
  minimal = false,
}: {
  minimal?: boolean;
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      degree: '',
      branch: '',
      yearOfGraduation: new Date().getFullYear(),
      admissionNumber: '',
    },
  });
  const { data: { details } = {}, isLoading } =
    useReadMyEducationDetailsQuery(undefined);
  const [upsertEducationDetails] = useUpsertMyEducationDetailsMutation();
  const formRef = useRef<HTMLFormElement | null>(null);
  useAutoSaveForm(formRef);

  const saveDataToServer = (data: FormValues) => {
    try {
      upsertEducationDetails(data).unwrap();
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
          <TableView title="Education details">
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <TableViewCell
                  name="Degree"
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="text"
                          placeholder="B.Tech, M.Tech, etc."
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
              name="branch"
              render={({ field }) => (
                <TableViewCell
                  name="Branch"
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="text"
                          placeholder="CSE, ECE, etc."
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
              name="yearOfGraduation"
              render={({ field }) => (
                <TableViewCell
                  name="Year of graduation"
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="number"
                          placeholder="2025..."
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
              name="admissionNumber"
              render={({ field }) => (
                <TableViewCell
                  name="Admission number"
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="text"
                          placeholder="21JE..."
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
            <p className="px-2 text-xs text-muted-foreground">
              You can change the visibility of your education details in the
              preference settings.
            </p>
          </Show>
        </form>
      </Form>
    </div>
  );
};
