'use client';

// Bro Done

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PhoneInput2 } from '@/components/ui/PhoneInput2';
import { otherServices_platformServiceId } from '@/lib/staticIds';
import { commonFieldSchema, emailSchema, phoneNumberSchema } from '@/lib/formSchemaFunctions';
import { ApplicationSource } from '@/lib/Types';

const charterTypes = ['Private Jet', 'Helicopter', 'Commercial Charter'];
const passengerNumbers = ['1', '2', '3', '4', '5', '6', '7+'];
const specialRequirements = ['None', 'Wheelchair Access', 'Extra Luggage', 'Special Meals'];
const travelInsuranceOptions = ['Yes', 'No'];
const returnTripOptions = ['Yes', 'No'];

const formSchema = z.object({
  charterType: commonFieldSchema(),
  firstName: commonFieldSchema(),
  lastName: commonFieldSchema(),
  email: emailSchema(),
  phone: phoneNumberSchema(),
  countryCode: commonFieldSchema(),
  numberOfPassengers: commonFieldSchema(),
  date: commonFieldSchema(),
  time: commonFieldSchema(),
  passengerName: commonFieldSchema(),
  totalPassenger: commonFieldSchema(),
  specialRequirements: commonFieldSchema(),
  travelInsurance: commonFieldSchema(),
  returnTrip: commonFieldSchema(),
});

const FlightCharterServicesForm = ({
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfPassengers: defaultData?.serviceFields?.numberOfPassengers || '',
      date: defaultData?.serviceFields?.date || undefined,
      time: defaultData?.serviceFields?.time || '',
      passengerName: defaultData?.serviceFields?.passengerName || '',
      email: defaultData?.email || '',
      phone: defaultData?.phone || '',
      countryCode: defaultData?.serviceFields?.countryCode || '',
      totalPassenger: defaultData?.serviceFields?.totalPassenger || '',
      specialRequirements: defaultData?.serviceFields?.specialRequirements || '',
      travelInsurance: defaultData?.serviceFields?.travelInsurance || '',
      returnTrip: defaultData?.serviceFields?.returnTrip || '',

      charterType: defaultData?.serviceFields?.charterType || '',
      firstName: defaultData?.firstName || '',
      lastName: defaultData?.lastName || '',
    },
  });
  console.log(form.getValues(), 'defaultData');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleAsync(async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // document
      const document = '';
      // if (document instanceof File) {
      //   const uploadedUrl = await uploadFile(document, `application-${document.name}`);
      //   if (!uploadedUrl) {
      //     throw new Error(`Failed to upload document`);
      //   }
      //   document = {
      //     fileName: document.name,
      //     mimeType: document.type,
      //     file: uploadedUrl,
      //   };
      // }

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
        serviceFields: { ...values, documents: document },
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
          {isView && (
            <p className="font-semibold col-span-2 border-b pb-2">
              Flight Charter Services Details
            </p>
          )}

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

          {/* Charter Type */}
          <FormField
            control={form.control}
            name="charterType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Charter Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select charter type" />
                    </SelectTrigger>
                    <SelectContent>
                      {charterTypes.map((type) => (
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

          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Time */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Passenger Name */}
          <FormField
            control={form.control}
            name="passengerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passenger Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Total Passenger */}
          <FormField
            control={form.control}
            name="totalPassenger"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Passenger</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Special Requirements */}
          <FormField
            control={form.control}
            name="specialRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Requirements</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select special requirements" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialRequirements.map((req) => (
                        <SelectItem key={req} value={req}>
                          {req}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Travel Insurance */}
          <FormField
            control={form.control}
            name="travelInsurance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Travel Insurance</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select travel insurance" />
                    </SelectTrigger>
                    <SelectContent>
                      {travelInsuranceOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Return Trip */}
          <FormField
            control={form.control}
            name="returnTrip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Return Trip</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select return trip" />
                    </SelectTrigger>
                    <SelectContent>
                      {returnTripOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
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

export default FlightCharterServicesForm;
