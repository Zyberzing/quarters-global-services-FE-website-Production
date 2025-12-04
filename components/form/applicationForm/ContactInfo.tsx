'use client';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function ContactInfo({ isView = false }: { isView?: boolean }) {
  const form = useFormContext();
  return (
    <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
      <p className="col-span-2 font-semibold">Contact Information</p>

      <FormField
        name="homeAddress"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Home Address (no PO Box)</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="homeCity"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="homeState"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="homeZip"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Zip/Postal Code</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="isPermanentAddress"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Is this your permanent address?</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value ?? ''}
                onValueChange={field.onChange}
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Yes" id="perm-y" disabled={isView} />
                  <label htmlFor="perm-y">Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="No" id="perm-n" disabled={isView} />
                  <label htmlFor="perm-n">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Permanent address (if different) */}
      <FormField
        name="permAddress"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Permanent Address</FormLabel>
            <FormControl>
              <Input placeholder="if different" readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="permCity"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Permanent City</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="permState"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Permanent State</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="permZip"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Permanent Zip</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="permCountry"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Permanent Country</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="homePhone"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Home Telephone</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="mobilePhone"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mobile Telephone</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="homeEmail"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Home Email</FormLabel>
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
