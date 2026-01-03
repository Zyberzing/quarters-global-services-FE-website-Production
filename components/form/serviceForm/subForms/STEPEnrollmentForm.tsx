'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import handleAsync from '@/lib/handleAsync';
import { createApplication, editApplication } from '@/services/applicatonService';

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

import { PhoneInput2 } from '@/components/ui/PhoneInput2';
import { otherServices_platformServiceId } from '@/lib/staticIds';
 import { commonFieldSchema, emailSchema, phoneNumberSchema } from '@/lib/formSchemaFunctions';
import { ApplicationSource } from '@/lib/Types';

const formSchema = z.object({
  // Basic fields
  firstName: commonFieldSchema(),
  lastName: commonFieldSchema(),
  email: emailSchema(),
  phone: phoneNumberSchema(),
  countryCode: commonFieldSchema(),

  // Service-specific fields
  country: commonFieldSchema(),
  city: commonFieldSchema(),
  state: commonFieldSchema(),
  travelerFullName: commonFieldSchema(),
  countryOfCitizenship: commonFieldSchema(),
  tripDestinations: commonFieldSchema(),
  travelDates: commonFieldSchema(),
  emergencyContactName: commonFieldSchema(),
  emergencyContactNumber: commonFieldSchema(),
  emergencyContactCountryCode: z.string().optional(),
});

const STEPEnrollmentForm = ({
  isView,
  platformServiceId,
  platformServiceCategoryPackageId,
  defaultData,
  applicationSource = 'AdminPortal',
}: {
  applicationSource?: ApplicationSource;
  isView?: boolean;
  platformServiceId?: string;
  platformServiceCategoryPackageId?: string;
  defaultData?: any;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: defaultData?.firstName || '',
      lastName: defaultData?.lastName || '',
      email: defaultData?.email || '',
      phone: defaultData?.phone || '',
      countryCode: defaultData?.serviceFields?.countryCode || '',
      country: defaultData?.serviceFields?.country || '',
      city: defaultData?.serviceFields?.city || '',
      state: defaultData?.serviceFields?.state || '',
      travelerFullName: defaultData?.serviceFields?.travelerFullName || '',
      countryOfCitizenship: defaultData?.serviceFields?.countryOfCitizenship || '',
      tripDestinations: defaultData?.serviceFields?.tripDestinations || '',
      travelDates: defaultData?.serviceFields?.travelDates || '',
      emergencyContactName: defaultData?.serviceFields?.emergencyContactName || '',
      emergencyContactNumber: defaultData?.serviceFields?.emergencyContactNumber || '',
      emergencyContactCountryCode: defaultData?.serviceFields?.emergencyContactCountryCode || '',
    },
  });

  const onSubmit = handleAsync(async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Application data
      const applicationPayload = {
        // Compulsory fields for application and also for create user
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        countryCode: values.countryCode,
        phone: values.phone,
        isSubmittedFromService: true,
        applicationSource: defaultData?.applicationSource ?? applicationSource,
        status: 'Submitted',
        description: '',
        address: {
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
        },
        currentLegalAddress: {
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
        },
        toCountryId: null,

        platformServices: [
          {
            platformServiceId: otherServices_platformServiceId,
            platformServiceCategoryId: platformServiceId,
            platformServiceCategoryPackageId,
          },
        ],
        // Also all dynamic service fields will come in serviceFields key. so in edit we can use them as it is also have all fields access
        serviceFields: { ...values },
      };

      if (defaultData) {
        await editApplication({ id: defaultData._id, ...applicationPayload });
        toast.success('Application updated successfully!');
      } else {
        await createApplication({
          applications: [applicationPayload],
        });
        toast.success('Application submitted successfully!');
      }
      form.reset();
      if (applicationSource === 'AgentPortal') {
        router.push('/agent/services');
      } else {
        router.push('/dashboard/services');
      }
    } catch (error) {
      toast.error('Failed to submit Application. Please try again.');
      console.error('Application creation error:', error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          {isView && <p className="font-semibold col-span-2 border-b pb-2">Personal Information</p>}

          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter first name" disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter last name" disabled={isView} />
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
              <FormItem>
                <FormLabel>Phone</FormLabel>
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
            <p className="font-semibold col-span-2 border-b pb-2 mt-4">Travel Information</p>
          )}

          {/* Traveler Full Name */}
          <FormField
            control={form.control}
            name="travelerFullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Traveler Full Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter traveler full name" disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country of Citizenship */}
          <FormField
            control={form.control}
            name="countryOfCitizenship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country of Citizenship</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter country of citizenship" disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Travel Dates */}
          <FormField
            control={form.control}
            name="travelDates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Travel Dates</FormLabel>
                <FormControl>
                  <Input type="date" {...field} disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Trip Destination(s) */}
          <FormField
            control={form.control}
            name="tripDestinations"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Trip Destination(s)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter trip destination(s)" disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isView && (
            <p className="font-semibold col-span-2 border-b pb-2 mt-4">Emergency Contact</p>
          )}

          {/* Emergency Contact Name */}
          <FormField
            control={form.control}
            name="emergencyContactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter emergency contact name" disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Emergency Contact Number */}
          <FormField
            control={form.control}
            name="emergencyContactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Number</FormLabel>
                <FormControl>
                  <PhoneInput2
                    value={field.value}
                    onChange={(val, df) => {
                      field.onChange(val ? `+${val}` : '');
                      form.setValue('emergencyContactCountryCode', `+${df.dialCode || ''}`);
                    }}
                    disabled={isView}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            onClick={() => router.back()}
            type="button"
            variant="outline"
            disabled={isLoading}
          >
            Cancel
          </Button>
          {!isView && (
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Save'}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default STEPEnrollmentForm;
