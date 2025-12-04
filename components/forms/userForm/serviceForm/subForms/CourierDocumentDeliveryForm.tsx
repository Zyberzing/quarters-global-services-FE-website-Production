'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FileInput } from '@/components/ui/file-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PhoneInput } from '@/components/ui/phone-input';

const formSchema = z.object({
  senderName: z.string().min(1),
  senderPhone: z.string().min(1),
  senderAddress: z.string().min(1),
  senderCity: z.string().min(1),
  senderState: z.string().min(1),
  senderCountry: z.string().min(1),

  recipientName: z.string().min(1),
  recipientPhone: z.string().min(1),
  recipientAddress: z.string().min(1),
  recipientCity: z.string().min(1),
  recipientState: z.string().min(1),
  recipientCountry: z.string().min(1),

  deliveryType: z.string().min(1),
  preferredCourier: z.string().min(1),
  pagesOrEnvelopes: z.string().min(1),
  trackingNumber: z.string().min(1),

  documents: z.any().optional(), // image field
});

const CourierDocumentDeliveryForm = ({ isView }: { isView?: boolean }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          {isView && <p className=" font-semibold col-span-2 border-b pb-2">Vehicle Details</p>}
          <FormField
            control={form.control}
            name="senderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sender Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="senderPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <PhoneInput {...field} placeholder="+1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="senderAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sender Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="senderCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="senderState"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="senderCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Recipient Fields */}
          <FormField
            control={form.control}
            name="recipientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recipientPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <PhoneInput {...field} placeholder="+1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recipientAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recipientCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recipientState"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recipientCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Delivery Fields */}
          <FormField
            control={form.control}
            name="deliveryType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Express">Express</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pagesOrEnvelopes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. of Pages or Envelopes</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredCourier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Courier Company</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DHL">DHL</SelectItem>
                      <SelectItem value="FedEx">FedEx</SelectItem>
                      <SelectItem value="UPS">UPS</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trackingNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tracking Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 📎 Image/File Upload */}
          <FormField
            control={form.control}
            name="documents"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Upload Document</FormLabel>
                <FormControl>
                  <FileInput onFileChange={console.log} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {!isView && (
          <div className="flex items-center gap-2 justify-end">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
            <Button type="button" onClick={() => form.reset()}>
              Start New Application
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default CourierDocumentDeliveryForm;
