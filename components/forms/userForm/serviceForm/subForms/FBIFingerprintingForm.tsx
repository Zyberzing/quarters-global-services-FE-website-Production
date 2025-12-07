'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import handleAsync from '@/lib/handleAsync';
import { createApplication } from '@/services/applicatonService';

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
import { PhoneInput2 } from '@/components/ui/PhoneInput2';

const serviceTypes = ['FBI', 'Police Clearance', 'State Background'];
const purposes = ['Immigration', 'Job', 'Visa', 'Legal'];
const appointmentTypes = ['Walk-in', 'Mail-in'];

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone Number is required'),
  countryCode: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  serviceType: z.string().min(1, 'Service Type is required'),
  citizenship: z.string().min(1, 'Citizenship is required'),
  purpose: z.string().min(1, 'Purpose is required'),
  appointmentType: z.string().min(1, 'Appointment Type is required'),
  preferredOfficeLocation: z.string().min(1, 'Preferred Office Location is required'),
});

const FBIFingerprintingForm = ({
  isView,
  platformServiceId,
  platformServiceCategoryPackageId,
}: {
  isView?: boolean;
  platformServiceId?: string;
  platformServiceCategoryPackageId?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const applicationSources = ['AdminPortal', 'AgentPortal', 'Website'];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      countryCode: '',
      country: '',
      city: '',
      state: '',
      serviceType: '',
      citizenship: '',
      purpose: '',
      appointmentType: '',
      preferredOfficeLocation: '',
    },
  });

  const onSubmit = handleAsync(async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const applicationPayload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        countryCode: values.countryCode,
        country: values.country,
        city: values.city,
        state: values.state,
        serviceType: values.serviceType,
        citizenship: values.citizenship,
        purpose: values.purpose,
        appointmentType: values.appointmentType,
        preferredOfficeLocation: values.preferredOfficeLocation,
        isSubmittedFromService: true,
        applicationSource: applicationSources[0],
        platformServices: [
          {
            platformServiceId: '68e96935e7bd0d02965600d4',
            platformServiceCategoryId: platformServiceId,
            platformServiceCategoryPackageId,
          },
        ],
      };

      await createApplication({
        applications: [applicationPayload],
      });
      toast.success('FBI Fingerprinting application submitted successfully!');
      form.reset();
      // router.push('/admin/applications');
    } catch (error) {
      toast.error('Failed to submit FBI Fingerprinting application. Please try again.');
      console.error('FBI Fingerprinting application creation error:', error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          {isView && <p className="font-semibold col-span-2 border-b pb-2">Personal Information</p>}

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter name" disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} placeholder="Enter email" disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput2
                    value={field.value}
                    onChange={(val, df) => {
                      field.onChange(val ? `+${val}` : '');
                      form.setValue('countryCode', `+${df.dialCode || ''}`);
                    }}
                    disabled={isView}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter country" disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter city" disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* State */}
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter state" disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isView && (
            <p className="font-semibold col-span-2 border-b pb-2 mt-4">Service Information</p>
          )}

          {/* Service Type */}
          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isView}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((type) => (
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

          {/* Citizenship */}
          <FormField
            control={form.control}
            name="citizenship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Citizenship</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter citizenship" disabled={isView} />
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
                  <Select onValueChange={field.onChange} value={field.value} disabled={isView}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {purposes.map((purpose) => (
                        <SelectItem key={purpose} value={purpose}>
                          {purpose}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Appointment Type */}
          <FormField
            control={form.control}
            name="appointmentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appointment Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isView}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select appointment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {appointmentTypes.map((type) => (
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

          {/* Preferred Office Location */}
          <FormField
            control={form.control}
            name="preferredOfficeLocation"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Preferred Office Location</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter preferred office location"
                    disabled={isView}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="outline" disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FBIFingerprintingForm;
