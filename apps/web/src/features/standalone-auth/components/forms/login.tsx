import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useLocationState from '@/hooks/useLocationState';
import { getErrorMessage } from '@/utils/errors';
import { toast } from 'sonner';
import { TableView, TableViewCell } from '@/components/standalone/table-view';
import { Show } from '@/components/show';
import { LoginResponse } from '@/features/auth/types/api/auth';
import { useLoginMutation } from '@/features/auth/api/auth';
import useQueryParam from '@/hooks/useQueryParam';

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  onSuccess?: (data: LoginResponse) => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const message = useLocationState('message');
  const email = useLocationState('email');
  const verified = useQueryParam('verified');
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: email || '',
      password: '',
    },
  });
  const [loginUser, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const payload = await loginUser({ user: data }).unwrap();
      if (onSuccess) {
        onSuccess(payload);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="space-y-4">
      <Show when={message}>
        <div className="p-4 rounded-md bg-primary/5 text-primary text-center">
          {message}
        </div>
      </Show>
      <Show when={verified === '1'}>
        <div className="p-4 rounded-md bg-primary/5 text-primary text-center">
          Your email has been verified. You can now log in.
        </div>
      </Show>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TableView>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <TableViewCell
                  name="Email"
                  description={<FormMessage />}
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="email"
                          placeholder="Your email address"
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
              name="password"
              render={({ field }) => (
                <TableViewCell
                  name="Password"
                  description={<FormMessage />}
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="password"
                          placeholder="Your password"
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
          <TableView>
            <TableViewCell
              description={
                <FormItem>
                  <FormControl>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Loading...' : 'Log in'}
                    </Button>
                  </FormControl>
                </FormItem>
              }
            />
          </TableView>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link to="/auth/register" className="underline">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
