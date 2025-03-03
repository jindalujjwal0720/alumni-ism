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
import { useAutoSaveForm } from '@/hooks/useAutoSaveForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  useReadMyPreferencesQuery,
  useUpsertMyPreferencesMutation,
} from '../../api/details';
import { ALUMNI_PUBLIC_PROFILE_PREFERENCES } from '@/constants/alumni';
import { Switch } from '@/components/ui/switch';

const schema = z.object({
  showDob: z.boolean(),
  showGender: z.boolean(),

  showPhone: z.boolean(),
  showEmail: z.boolean(),
  showZip: z.boolean(),

  showAdmissionNumber: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export const PublicProfilePreferencesForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      showDob: ALUMNI_PUBLIC_PROFILE_PREFERENCES.showDob,
      showGender: ALUMNI_PUBLIC_PROFILE_PREFERENCES.showGender,

      showPhone: ALUMNI_PUBLIC_PROFILE_PREFERENCES.showPhone,
      showEmail: ALUMNI_PUBLIC_PROFILE_PREFERENCES.showEmail,
      showZip: ALUMNI_PUBLIC_PROFILE_PREFERENCES.showZip,

      showAdmissionNumber:
        ALUMNI_PUBLIC_PROFILE_PREFERENCES.showAdmissionNumber,
    },
  });
  const { data: { details } = {}, isLoading } =
    useReadMyPreferencesQuery(undefined);
  const [upsertPersonalDetails] = useUpsertMyPreferencesMutation();
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
        showDob: details.showDob,
        showGender: details.showGender,

        showPhone: details.showPhone,
        showEmail: details.showEmail,
        showZip: details.showZip,

        showAdmissionNumber: details.showAdmissionNumber,
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
          <TableView title="Public">
            <FormField
              control={form.control}
              name="showDob"
              render={({ field }) => (
                <TableViewCell
                  name="Date of Birth"
                  description={<FormMessage />}
                  status={
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            formRef.current?.dispatchEvent(
                              new Event('input', {
                                bubbles: true,
                                cancelable: true,
                              }),
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
              name="showGender"
              render={({ field }) => (
                <TableViewCell
                  name="Gender"
                  description={<FormMessage />}
                  status={
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            formRef.current?.dispatchEvent(
                              new Event('input', {
                                bubbles: true,
                                cancelable: true,
                              }),
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
              name="showPhone"
              render={({ field }) => (
                <TableViewCell
                  name="Phone"
                  description={<FormMessage />}
                  status={
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            formRef.current?.dispatchEvent(
                              new Event('input', {
                                bubbles: true,
                                cancelable: true,
                              }),
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
              name="showEmail"
              render={({ field }) => (
                <TableViewCell
                  name="Email"
                  description={<FormMessage />}
                  status={
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            formRef.current?.dispatchEvent(
                              new Event('input', {
                                bubbles: true,
                                cancelable: true,
                              }),
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
              name="showZip"
              render={({ field }) => (
                <TableViewCell
                  name="Zip Code"
                  description={<FormMessage />}
                  status={
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            formRef.current?.dispatchEvent(
                              new Event('input', {
                                bubbles: true,
                                cancelable: true,
                              }),
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
              name="showAdmissionNumber"
              render={({ field }) => (
                <TableViewCell
                  name="Admission Number"
                  description={<FormMessage />}
                  status={
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            formRef.current?.dispatchEvent(
                              new Event('input', {
                                bubbles: true,
                                cancelable: true,
                              }),
                            );
                          }}
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
