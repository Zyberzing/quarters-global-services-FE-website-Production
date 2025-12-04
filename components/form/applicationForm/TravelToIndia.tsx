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
import { Textarea } from '@/components/ui/textarea';

export default function TravelToIndia({ isView = false }: { isView?: boolean }) {
  const form = useFormContext();
  return (
    <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
      <p className="col-span-2 font-semibold">Travel to India</p>

      <FormField
        name="visaType"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type of Visa Required</FormLabel>
            <FormControl>
              <Select value={field.value ?? ''} onValueChange={field.onChange} disabled={isView}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eTourist-1y">India eTourist Visa – 1 Year</SelectItem>
                  <SelectItem value="eTourist-5y">India eTourist Visa – 5 Years</SelectItem>
                  <SelectItem value="eBusiness">India eBusiness Visa</SelectItem>
                  <SelectItem value="eMedical">India eMedical Visa</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="expectedArrivalDate"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expected Date of Arrival</FormLabel>
            <FormControl>
              <Input type="date" readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="arrivalCity"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Arrival City (India)</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="exitCity"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Exit City (India)</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="otherIndianCities"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Other Indian Cities to be Visited</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="purposeOfVisit"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Detailed Purpose of Visit</FormLabel>
            <FormControl>
              <Select value={field.value ?? ''} onValueChange={field.onChange} disabled={isView}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sightseeing">Sightseeing</SelectItem>
                  <SelectItem value="Business Meetings">Business Meetings</SelectItem>
                  <SelectItem value="Trade Show">Attend Trade Show</SelectItem>
                  <SelectItem value="Visit Friends/Relatives">Visit Friends/Relatives</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Previous visit */}
      <FormField
        name="previousVisitToIndia"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Previously visited India?</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value ?? ''}
                onValueChange={field.onChange}
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Yes" id="pv-y" disabled={isView} />
                  <label htmlFor="pv-y">Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="No" id="pv-n" disabled={isView} />
                  <label htmlFor="pv-n">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="prevHotelAddress"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Hotel/Residence (most recent visit)</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="prevCitiesVisited"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Cities Visited in India</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Previous visa */}
      <FormField
        name="prevVisaNumber"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Indian Visa Number (most recent)</FormLabel>
            <FormControl>
              <Input readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="prevVisaIssuedBy"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Issued By (Consulate Location)</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Washington, DC" readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="prevVisaType"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type of Visa</FormLabel>
            <FormControl>
              <Input
                placeholder="Tourist/Conference/Business/Employment..."
                readOnly={isView}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="prevVisaIssuedDate"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date Visa Issued</FormLabel>
            <FormControl>
              <Input type="date" readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Visa refusal */}
      <FormField
        name="visaRefused"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Ever been refused an Indian visa?</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value ?? ''}
                onValueChange={field.onChange}
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Yes" id="vr-y" disabled={isView} />
                  <label htmlFor="vr-y">Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="No" id="vr-n" disabled={isView} />
                  <label htmlFor="vr-n">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="visaRefusalDetails"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>If Yes, provide details</FormLabel>
            <FormControl>
              <Textarea readOnly={isView} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Travel history */}
      <FormField
        name="countriesVisited10Years"
        control={form.control}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Countries visited in last 10 years</FormLabel>
            <FormControl>
              <Textarea
                placeholder="List countries separated by commas"
                readOnly={isView}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
