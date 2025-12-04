'use client';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function FamilyInfo({ isView = false }: { isView?: boolean }) {
  const form = useFormContext();
  return (
    <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
      <p className="col-span-2 font-semibold">Family Information</p>

      {/* Father */}
      <FormField
        name="fatherName"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Father’s Full Name</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="fatherBirthCity"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Father’s Birth City</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="fatherBirthState"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Father’s Birth State/Province</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="fatherBirthCountry"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Father’s Birth Country</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="fatherCitizenship"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Father’s Citizenship</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="fatherPrevCitizenship"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Father’s Previous Citizenship (if any)</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Mother */}
      <FormField
        name="motherName"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mother’s Full Name</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="motherBirthCity"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mother’s Birth City</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="motherBirthState"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mother’s Birth State/Province</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="motherBirthCountry"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mother’s Birth Country</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="motherCitizenship"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mother’s Citizenship</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="motherPrevCitizenship"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mother’s Previous Citizenship (if any)</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Marital + Spouse */}
      <FormField
        name="maritalStatus"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Marital Status</FormLabel>
            <FormControl>
              <Select value={field.value ?? ''} onValueChange={field.onChange} disabled={isView}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Unmarried">Unmarried (single/divorced/widowed)</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="spouseName"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Spouse’s Full Name (if married)</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="spouseCitizenship"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Spouse’s Citizenship</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="spousePrevCitizenship"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Spouse’s Previous Citizenship (if any)</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="spouseBirthCity"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Spouse’s Birth City</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="spouseBirthState"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Spouse’s Birth State/Province</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="spouseBirthCountry"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Spouse’s Birth Country</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Pakistan Grandparents */}
      <FormField
        name="grandparentsPakistan"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Any grandparents citizens/residents of Pakistan?</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value ?? ''}
                onValueChange={field.onChange}
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Yes" id="gp-y" disabled={isView} />
                  <label htmlFor="gp-y">Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="No" id="gp-n" disabled={isView} />
                  <label htmlFor="gp-n">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="grandparentsPakistanDetails"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>If Yes, provide details</FormLabel>
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
