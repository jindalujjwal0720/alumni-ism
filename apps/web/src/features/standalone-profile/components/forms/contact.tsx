import { TableView, TableViewCell } from '@/components/standalone/table-view';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAutoSaveForm } from '@/hooks/useAutoSaveForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { Globe2, Linkedin, Twitter } from 'lucide-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  phone: z.string().min(10),
  email: z.string().email(),

  city: z.string().min(2),
  state: z.string().min(2),
  country: z.string().min(2),
  zip: z.string().min(2),

  linkedIn: z.string().url().or(z.literal('')).optional(),
  twitter: z.string().url().or(z.literal('')).optional(),
  website: z.string().url().or(z.literal('')).optional(),
});

type FormValues = z.infer<typeof schema>;

export const ContactDetailsForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: '',
      email: '',

      city: '',
      state: '',
      country: '',
      zip: '',

      linkedIn: '',
      twitter: '',
      website: '',
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
          className="space-y-4"
        >
          <TableView title="Contact details">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <TableViewCell
                  name="Phone"
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="tel"
                          placeholder="1234567890"
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
              name="email"
              render={({ field }) => (
                <TableViewCell
                  name="Email"
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="text"
                          placeholder="alice@bob.com"
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
          <TableView title="Current location">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <TableViewCell
                  name="City"
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="text"
                          placeholder="Bangalore"
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
              name="state"
              render={({ field }) => (
                <TableViewCell
                  name="State"
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="text"
                          placeholder="Karnataka"
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
              name="country"
              render={({ field }) => (
                <TableViewCell
                  name="Country"
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="text"
                          placeholder="India"
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
              name="zip"
              render={({ field }) => (
                <TableViewCell
                  name="ZIP"
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="text"
                          placeholder="560001"
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
          <TableView title="Social profiles">
            <FormField
              control={form.control}
              name="linkedIn"
              render={({ field }) => (
                <TableViewCell
                  name={<SocialIconTitle social="LinkedIn" />}
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="url"
                          placeholder="@alice"
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
              name="twitter"
              render={({ field }) => (
                <TableViewCell
                  name={<SocialIconTitle social="Twitter" />}
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="url"
                          placeholder="@bob"
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
              name="website"
              render={({ field }) => (
                <TableViewCell
                  name={<SocialIconTitle social="Website" />}
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="url"
                          placeholder="https://alice.bob.com"
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

const SocialIconTitle = ({
  social,
}: {
  social: 'LinkedIn' | 'Twitter' | 'Website';
}) => {
  const icons = {
    LinkedIn: Linkedin,
    Twitter: Twitter,
    Website: Globe2,
  } as const;
  const Icon = icons[social];

  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon size={14} />
      <span>{social}</span>
    </div>
  );
};
