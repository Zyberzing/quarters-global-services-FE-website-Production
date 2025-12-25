'use client';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { toast } from 'sonner';
import FormWrapper from './FormWrapper';
import handleAsync from '@/lib/handleAsync';
import { saveSession } from '@/lib/session';
import { UserTypeENUM } from '@/lib/Types';
import Link from 'next/link';

// ---------------- Schema ----------------
const formSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

// ---------------- Component ----------------
const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = handleAsync(async (values: z.infer<typeof formSchema>) => {
    try {

      const payload = {
        ...values,
        email: values.email.toLowerCase().trim().replace(/\s+/g, ''),
      };

      const res = await fetch(
        process.env.NEXT_PUBLIC_QUARTUS_API_URL + '/auth/sign-in',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await res.json();
      const userDataId = data?.data?._id;
      const userDataToken = data?.data?.token?.split(' ')?.[1];

      if (!userDataToken || !userDataId) {
        throw new Error('User data not found');
      }

      if (data?.data?.role === 'admin') {
        toast.error('Admin login is not allowed');
        return;
      }

      // Save user token
      await saveSession(
        { id: userDataId, token: userDataToken },
        UserTypeENUM.ADMIN // or .USER or whatever role applies
      );


      toast.success('Login successfully');
      window.location.href = '/dashboard/applications'
    } finally {
      console.log('done');
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col py-6 gap-4 mt-3">
        {/* Email */}
        <FormWrapper
          control={form.control}
          name="email"
          type="text"
          placeholder="Email"
          require={true}
          cssStyles="mb-4"
        />

        {/* Password */}
        <FormWrapper
          control={form.control}
          name="password"
          type="password"
          placeholder="Password"
          require={true}
          cssStyles="mb-4"
        />

        {/* Remember Me */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center flex-wrap gap-3">
            <Checkbox
              id="remember"
              checked={form.watch('remember')}
              onCheckedChange={(val) => form.setValue('remember', Boolean(val))}
            />
            <Label htmlFor="remember" className="text-primary text-xs md:text-sm">
              Remember me
            </Label>
          </div>
          <p className="font-normal text-xs md:text-sm text-primary"><Link href={"/forget-password"}>Forget Password?</Link></p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="text-xl text-white h-16"
          disabled={form.formState.isSubmitting}
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;