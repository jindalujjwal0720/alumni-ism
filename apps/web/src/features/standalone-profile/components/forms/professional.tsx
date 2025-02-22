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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

export const ProfessionalDetailsForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentCompany: '',
      designation: '',
      currentCompanyWebsite: '',
      totalExperienceYears: 10,
    },
  });

  const handleSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <TableView title="Current employment">
            <FormField
              control={form.control}
              name="currentCompany"
              render={({ field }) => (
                <TableViewCell
                  title="Company"
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
                  title="Designation"
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
                  title="Company website"
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
                  title="Total experience"
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
          <p className="text-destructive text-sm">
            {form.formState.errors.root?.message}
          </p>
          <TableView title="Actions">
            <TableViewCell
              description={
                <Button type="submit" className="w-full">
                  Save
                </Button>
              }
            />
          </TableView>
        </form>
      </Form>
    </div>
  );
};
