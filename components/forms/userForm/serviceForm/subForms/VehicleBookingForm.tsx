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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const vehicleTypes = ['Sedan', 'SUV', 'Van', 'Bus'];
const passengerNumbers = ['1', '2', '3', '4', '5', '6', '7+'];
const purposes = ['Business', 'Tourism', 'Airport Transfer', 'Other'];
const preferredDrivers = ['Any', 'John Doe', 'Jane Smith', 'Mike Johnson'];

const formSchema = z.object({
  vehicleType: z.string().min(1, 'Vehicle Type is required'),
  numberOfPassengers: z.string().min(1, 'Number of Passengers is required'),
  pickUpDate: z.string({
    error: 'Pick-up Date is required',
  }),
  dropDate: z.string({
    error: 'Drop Date is required',
  }),
  pickupLocation: z.string().min(1, 'Pickup Location is required'),
  dropOffLocation: z.string().min(1, 'Drop off Location is required'),
  purpose: z.string().min(1, 'Purpose is required'),
  preferredDriver: z.string().min(1, 'Preferred Driver is required'),
});

const VehicleBookingForm = ({ isView }: { isView?: boolean }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickUpDate: undefined,
      dropDate: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          {isView && (
            <p className="font-semibold col-span-2 border-b pb-2">Vehicle Booking Details</p>
          )}

          {/* Vehicle Type */}
          <FormField
            control={form.control}
            name="vehicleType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Number of Passengers */}
          <FormField
            control={form.control}
            name="numberOfPassengers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Passengers</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select number" />
                    </SelectTrigger>
                    <SelectContent>
                      {passengerNumbers.map((num) => (
                        <SelectItem key={num} value={num}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pick-up Date */}
          <FormField
            control={form.control}
            name="pickUpDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pick-up Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Drop Date */}
          <FormField
            control={form.control}
            name="dropDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drop Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pickup Location */}
          <FormField
            control={form.control}
            name="pickupLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Drop off Location */}
          <FormField
            control={form.control}
            name="dropOffLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drop off Location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Purpose */}
          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {purposes.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Preferred Driver */}
          <FormField
            control={form.control}
            name="preferredDriver"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Driver</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select preferred driver" />
                    </SelectTrigger>
                    <SelectContent>
                      {preferredDrivers.map((driver) => (
                        <SelectItem key={driver} value={driver}>
                          {driver}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Save</Button>
          <Button type="button" onClick={() => form.reset()}>
            Start New Application
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VehicleBookingForm;
