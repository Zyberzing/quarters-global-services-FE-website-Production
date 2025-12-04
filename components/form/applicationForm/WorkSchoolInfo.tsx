'use client';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function WorkSchoolInfo({ isView = false }: { isView?: boolean }) {
  const form = useFormContext();
  return (
    <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
      <p className="col-span-2 font-semibold">Work / School Information</p>

      <FormField
        name="occupation"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Occupation</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="jobTitle"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Position / Job Title</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="employerOrSchool"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Employer / School Name</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="workAddress"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Work/School Address</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="workCity"
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
        name="workState"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>State/Province</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="workZip"
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
        name="workPhone"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Work Telephone</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="workEmail"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Work Email</FormLabel>
            <FormControl>
              <Input type="email" readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="previousOccupation"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Previous Occupation (if any)</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Military */}
      <FormField
        name="militaryService"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Ever been a member of the military?</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value ?? ''}
                onValueChange={field.onChange}
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Yes" id="mil-y" disabled={isView} />
                  <label htmlFor="mil-y">Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="No" id="mil-n" disabled={isView} />
                  <label htmlFor="mil-n">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="militaryCountryBranch"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country / Branch</FormLabel>
            <FormControl>
              <Input placeholder="e.g., US Navy" readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="militarySpecialization"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Specialization</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="militaryHighestRank"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Highest Rank</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="militaryCity"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Service City</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="militaryState"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Service State/Province</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="militaryCountry"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Service Country</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
