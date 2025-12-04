'use client';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

export default function AdditionalQuestions({ isView = false }: { isView?: boolean }) {
  const form = useFormContext();
  return (
    <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
      <p className="col-span-2 font-semibold">Additional Questions</p>

      <FormField
        name="refusedEntryDeported"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ever refused entry or deported?</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value ?? ''}
                onValueChange={field.onChange}
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Yes" id="red-y" disabled={isView} />
                  <label htmlFor="red-y">Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="No" id="red-n" disabled={isView} />
                  <label htmlFor="red-n">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="refusedEntryDetails"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>If Yes, details</FormLabel>
            <FormControl>
              <Textarea readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="everArrested"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ever arrested?</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value ?? ''}
                onValueChange={field.onChange}
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Yes" id="ar-y" disabled={isView} />
                  <label htmlFor="ar-y">Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="No" id="ar-n" disabled={isView} />
                  <label htmlFor="ar-n">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="arrestedDetails"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>If Yes, details</FormLabel>
            <FormControl>
              <Textarea readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="everConvicted"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ever convicted?</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value ?? ''}
                onValueChange={field.onChange}
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Yes" id="cv-y" disabled={isView} />
                  <label htmlFor="cv-y">Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="No" id="cv-n" disabled={isView} />
                  <label htmlFor="cv-n">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="convictedDetails"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>If Yes, details</FormLabel>
            <FormControl>
              <Textarea readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
