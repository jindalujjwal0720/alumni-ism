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
import { AutoResizeTextarea } from '@/components/ui/textarea';
import { useAutoSaveForm } from '@/hooks/useAutoSaveForm';
import { AlumniGender } from '@/types/models/alumni';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  useReadMyPersonalDetailsQuery,
  useUpsertMyPersonalDetailsMutation,
} from '../../api/details';

const GENDER_OPTIONS = {
  [AlumniGender.FEMALE]: 'Female',
  [AlumniGender.MALE]: 'Male',
  [AlumniGender.PREFER_NOT_TO_SAY]: 'Prefer not to say',
  [AlumniGender.OTHER]: 'Other',
} as const;

const schema = z.object({
  name: z
    .string()
    .min(3, { message: 'Too short!' })
    .max(255, { message: 'Too long!' }),
  alias: z
    .string()
    .min(3, { message: 'Too short!' })
    .max(255, { message: 'Too long!' }),
  profilePicture: z
    .string()
    .url({ message: 'Invalid URL!' })
    .max(255, { message: 'Too long!' })
    .or(z.literal(''))
    .optional(),
  bannerPicture: z
    .string()
    .url({ message: 'Invalid URL!' })
    .max(255, { message: 'Too long!' })
    .or(z.literal(''))
    .optional(),
  bio: z.string().max(500, { message: 'Too long!' }).optional(),
  dob: z.date().optional(),
  gender: z.nativeEnum(AlumniGender),
});

type FormValues = z.infer<typeof schema>;

export const PersonalDetailsForm = ({
  minimal = false,
}: {
  minimal?: boolean;
}) => {
  const { data: { details } = {}, isLoading } =
    useReadMyPersonalDetailsQuery(undefined);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      alias: '',
      profilePicture: '',
      bio: '',
      dob: undefined,
      gender: details?.gender ?? AlumniGender.PREFER_NOT_TO_SAY,
    },
  });
  const [upsertPersonalDetails] = useUpsertMyPersonalDetailsMutation();
  const formRef = useRef<HTMLFormElement | null>(null);
  useAutoSaveForm(formRef);

  const saveDataToServer = (data: FormValues) => {
    try {
      upsertPersonalDetails(data).unwrap();
    } catch (_err) {
      // silently fail
    }
  };

  useEffect(() => {
    if (details) {
      form.reset({
        name: details.name,
        alias: details.alias,
        profilePicture: details.profilePicture,
        bannerPicture: details.bannerPicture,
        bio: details.bio,
        dob: details.dob ? new Date(details.dob) : undefined,
        gender: details?.gender ?? AlumniGender.PREFER_NOT_TO_SAY,
      });
    }
  }, [details, form]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <TableViewLoading />
        <Show when={!minimal}>
          <TableViewLoading />
        </Show>
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
          <TableView title="Personal details">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <TableViewCell
                  name="Full name"
                  description={<FormMessage />}
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
                  name="Alias"
                  description={<FormMessage />}
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="text"
                          placeholder="Name on your card?"
                          className="w-full text-end"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  }
                />
              )}
            />
            <Show when={!minimal}>
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <TableViewCell
                    name="Date of birth"
                    description={<FormMessage />}
                    status={
                      <FormItem>
                        <FormControl className="w-full flex items-center justify-end">
                          <Input
                            type="date"
                            variant="standalone"
                            placeholder="When were you born?"
                            className="text-end text-muted-foreground"
                            {...field}
                            value={
                              field.value?.toISOString().split('T')[0] || ''
                            }
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
            </Show>
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <TableViewCell
                  name="Gender"
                  description={<FormMessage />}
                  status={GENDER_OPTIONS[field.value]}
                >
                  <div className="pl-4 text-muted-foreground bg-muted/50">
                    <div className="divide-y">
                      {Object.entries(AlumniGender).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between p-2"
                          onClick={() => {
                            field.onChange(value);
                            formRef.current?.dispatchEvent(
                              new Event('input', {
                                bubbles: true,
                              }),
                            );
                          }}
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
          <Show when={!minimal}>
            <TableView title="Personalisation">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <TableViewCell
                    name="Bio"
                    description={<FormMessage />}
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
                name="profilePicture"
                render={({ field }) => (
                  <TableViewCell
                    name="Profile picture"
                    description={<FormMessage />}
                    status={
                      <FormItem>
                        <FormControl>
                          <Input
                            variant="standalone"
                            type="url"
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
                name="bannerPicture"
                render={({ field }) => (
                  <TableViewCell
                    name="Banner picture"
                    description={<FormMessage />}
                    status={
                      <FormItem>
                        <FormControl>
                          <Input
                            variant="standalone"
                            type="url"
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
            </TableView>
            <p className="px-2 text-muted-foreground text-xs">
              You can change the visibility of your personal details in the
              preference settings.
            </p>
          </Show>
        </form>
      </Form>
    </div>
  );
};
