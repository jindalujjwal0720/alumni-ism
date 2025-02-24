import { TableView, TableViewCell } from '@/components/standalone/table-view';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAutoSaveForm } from '@/hooks/useAutoSaveForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  degree: z.string().min(2),
  branch: z.string().min(2),
  yearOfGraduation: z.coerce.number().int(),
});

type FormValues = z.infer<typeof schema>;

export const EducationDetailsForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      degree: '',
      branch: '',
      yearOfGraduation: new Date().getFullYear(),
    },
  });
  const formRef = useRef<HTMLFormElement | null>(null);
  useAutoSaveForm(formRef);

  const saveDataToServer = (data: FormValues) => {
    console.log('Saving...', data);
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <Form {...form}>
        <form
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
          </TableView>
          <p className="px-2 text-xs text-muted-foreground">
            You can change the visibility of your education details in the
            preference settings.
          </p>
        </form>
      </Form>
    </div>
  );
};
