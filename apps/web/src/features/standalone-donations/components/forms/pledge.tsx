import { TableView, TableViewCell } from '@/components/standalone/table-view';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { amountToWords } from '@/utils/numbers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  amountInINR: z.number().int().positive(),
  amountInWords: z.string(),
  expectedFullfillmentDate: z.coerce.date(),
});

type FormValues = z.infer<typeof schema>;

export const PledgeForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      amountInINR: 0,
      amountInWords: '',
      expectedFullfillmentDate: new Date(),
    },
  });

  const handleSubmit = (data: FormValues) => {
    console.log('Pledging...', data);
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
              name="expectedFullfillmentDate"
              render={({ field }) => (
                <TableViewCell
                  name="Expected Fullfillment Date"
                  description={
                    <p className="pt-1 text-sm text-muted-foreground">
                      This is the date by which you expect to fulfill this
                      pledge. It's not binding, but it helps us plan better.
                    </p>
                  }
                  status={
                    <FormItem>
                      <FormControl className="w-full flex items-center justify-end">
                        <Input
                          type="date"
                          variant="standalone"
                          placeholder="When do you expect to fulfill this pledge?"
                          className="text-end text-muted-foreground"
                          {...field}
                          value={field.value?.toISOString().split('T')[0] || ''}
                          onChange={(e) => {
                            field.onChange(new Date(e.target.value));
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  }
                />
              )}
            />
          </TableView>
          <TableView title="Actions">
            <TableViewCell
              description={
                <Button type="submit" className="w-full">
                  Take Pledge
                </Button>
              }
            />
          </TableView>
        </form>
      </Form>
    </div>
  );
};
