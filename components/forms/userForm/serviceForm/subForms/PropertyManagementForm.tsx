'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PhoneInput2 } from '@/components/ui/PhoneInput2';

const propertyTypes = ['Residential', 'Commercial'];
const investmentTypes = ['Buy', 'Rent', 'Sell'];

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone Number is required'),
  countryCode: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  propertyType: z.string().min(1, 'Property Type is required'),
  estimatedBudget: z.string().min(1, 'Estimated Budget is required'),
  investmentType: z.string().min(1, 'Investment Type is required'),
  message: z.string().optional(),
});

const PropertyManagementForm = ({
  isView,
  platformServiceId,
  platformServiceCategoryPackageId,
}: {
  isView?: boolean;
  platformServiceId?: string;
  platformServiceCategoryPackageId?: string;
}) => {
  const router = useRouter();
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
      propertyType: '',
      estimatedBudget: '',
      investmentType: '',
      message: '',
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
        propertyType: values.propertyType,
        estimatedBudget: values.estimatedBudget,
        investmentType: values.investmentType,
        message: values.message,
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
      toast.success('Property Management application submitted successfully!');
      form.reset();
      // router.push('/admin/applications');
    } catch (error) {
      toast.error('Failed to submit Property Management application. Please try again.');
      console.error('Property Management application creation error:', error);
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
            <p className="font-semibold col-span-2 border-b pb-2 mt-4">Property Information</p>
          )}

          {/* Property Type */}
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isView}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
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

          {/* Estimated Budget */}
          <FormField
            control={form.control}
            name="estimatedBudget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Budget</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter estimated budget" disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Investment Type */}
          <FormField
            control={form.control}
            name="investmentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Investment Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isView}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select investment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {investmentTypes.map((type) => (
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

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Message (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter your message or additional details"
                    disabled={isView}
                    rows={4}
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

export default PropertyManagementForm;
