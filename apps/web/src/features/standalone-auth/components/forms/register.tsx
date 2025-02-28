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
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/errors';
import { useRegisterMutation } from '@/features/auth/api/auth';
import { RegisterResponse } from '@/features/auth/types/api/auth';
import { TableView, TableViewCell } from '@/components/standalone/table-view';

const schema = z
  .object({
    name: z.string().min(3, {
      message: 'Too short!',
    }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'At least 8 characters' })
      .max(50, { message: 'Too long!' })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character (@$!%*?&)',
        },
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof schema>;

interface RegisterFormProps {
  onSuccess?: (data: RegisterResponse) => void;
}

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [registerUser, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const payload = await registerUser({ user: data }).unwrap();
      if (onSuccess instanceof Function) {
        onSuccess(payload);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <TableViewCell
                  name="Confirm password"
                  description={<FormMessage />}
                  status={
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="standalone"
                          type="password"
                          placeholder="Confirm your password"
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
                      {isLoading ? 'Loading...' : 'Register'}
                    </Button>
                  </FormControl>
                </FormItem>
              }
            />
          </TableView>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link to="/auth/login" className="underline">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
