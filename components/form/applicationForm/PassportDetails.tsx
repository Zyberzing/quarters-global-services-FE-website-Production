'use client';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function PassportDetails({ isView = false }: { isView?: boolean }) {
  const form = useFormContext();
  return (
    <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
      <p className="col-span-2 font-semibold">Passport Details</p>

      <FormField
        name="passportNumber"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Passport Number</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="passportIssuingAuthority"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Issuing Authority / Place of Issue</FormLabel>
            <FormControl>
              <Input placeholder="US Dept of State / Other" readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="passportIssueDate"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Issue</FormLabel>
            <FormControl>
              <Input type="date" readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="passportExpiryDate"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Expiry</FormLabel>
            <FormControl>
              <Input type="date" readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="holdsOtherPassport"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Holds Other Valid Passport?</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value ?? ''}
                onValueChange={field.onChange}
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Yes" id="hop-y" disabled={isView} />
                  <label htmlFor="hop-y">Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="No" id="hop-n" disabled={isView} />
                  <label htmlFor="hop-n">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Other passport fields (enter if Yes) */}
      <FormField
        name="otherPassportNumber"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Other Passport Number</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="otherPassportIssuingAuthority"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Other Issuing Authority / Place</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="otherPassportIssueDate"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Other Date of Issue</FormLabel>
            <FormControl>
              <Input type="date" readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="otherPassportExpiryDate"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Other Date of Expiry</FormLabel>
            <FormControl>
              <Input type="date" readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
