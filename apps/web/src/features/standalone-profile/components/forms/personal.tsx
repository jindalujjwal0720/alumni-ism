import { Show } from '@/components/show';
import { TableView, TableViewCell } from '@/components/standalone/table-view';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AutoResizeTextarea } from '@/components/ui/textarea';
import { AlumniGender } from '@/types/models/alumni';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const GENDER_OPTIONS = {
  [AlumniGender.FEMALE]: 'Female',
  [AlumniGender.MALE]: 'Male',
  [AlumniGender.PREFER_NOT_TO_SAY]: 'Prefer not to say',
  [AlumniGender.OTHER]: 'Other',
} as const;

const schema = z.object({
  name: z.string().min(3).max(255),
  alias: z.string().min(3).max(255),
  profilePicture: z.string().optional(),
  bio: z.string().max(500).optional(),
  dob: z.date().optional(),
  gender: z.nativeEnum(AlumniGender),
});

type FormValues = z.infer<typeof schema>;

export const PersonalDetailsForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      alias: '',
      profilePicture: '',
      bio: '',
      dob: undefined,
      gender: AlumniGender.PREFER_NOT_TO_SAY,
    },
  });

  const handleSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <TableView title="Personal details">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <TableViewCell
                  title="Full name"
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="text"
                          placeholder="Your full name?"
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
              name="alias"
              render={({ field }) => (
                <TableViewCell
                  title="Alias"
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="text"
                          placeholder="What's your nickname?"
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
              name="profilePicture"
              render={({ field }) => (
                <TableViewCell
                  title="Profile picture"
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="text"
                          placeholder="URL"
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
              name="bio"
              render={({ field }) => (
                <TableViewCell
                  title="Bio"
                  status={
                    <FormItem>
                      <FormControl>
                        <AutoResizeTextarea
                          variant="standalone"
                          placeholder="Tell us about yourself..."
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
              name="dob"
              render={({ field }) => (
                <TableViewCell
                  title="Date of birth"
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          type="date"
                          variant="standalone"
                          placeholder="When were you born?"
                          className="w-full text-end"
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
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <TableViewCell
                  title="Gender"
                  status={GENDER_OPTIONS[field.value]}
                >
                  <div className="pl-4 text-muted-foreground bg-muted/50">
                    <div className="divide-y">
                      {Object.entries(AlumniGender).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between p-2"
                          onClick={() =>
                            field.onChange(
                              AlumniGender[key as keyof typeof AlumniGender],
                            )
                          }
                        >
                          <label htmlFor={key}>{GENDER_OPTIONS[value]}</label>
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
          </TableView>
        </form>
      </Form>
    </div>
  );
};
