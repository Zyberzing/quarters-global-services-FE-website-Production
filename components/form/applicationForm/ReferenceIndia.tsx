'use client';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function ReferenceIndia({ isView = false }: { isView?: boolean }) {
  const form = useFormContext();
  return (
    <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
      <p className="col-span-2 font-semibold">Reference in India</p>

      <FormField
        name="refIndiaName"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name of Person / Contact</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="refIndiaCompany"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="refIndiaAddress1"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Address Line 1</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="refIndiaAddress2"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Address Line 2</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="refIndiaPhone"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telephone</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="refIndiaEmail"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
