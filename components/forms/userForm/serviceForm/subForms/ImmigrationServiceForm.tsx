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
import { PhoneInput2 } from '@/components/ui/PhoneInput2';
import { FileInput } from '@/components/ui/file-input';
import { uploadFile } from '@/lib/uploadFile';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone Number is required'),
  countryCode: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  serviceType: z.string().min(1, 'Service Type is required'),
  countryOfDestination: z.string().min(1, 'Country of Destination is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  currentVisaStatus: z.string().min(1, 'Current Visa Status is required'),
  travelIntentPurpose: z.string().min(1, 'Travel Intent / Purpose is required'),
  resume: z.union([z.instanceof(File), z.string()]).optional(),
});

const ImmigrationServiceForm = ({
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
      serviceType: '',
      countryOfDestination: '',
      nationality: '',
      currentVisaStatus: '',
      travelIntentPurpose: '',
      resume: undefined,
    },
  });

  const onSubmit = handleAsync(async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      let resumeUrl = '';

      // Upload resume if provided
      if (values.resume instanceof File) {
        const uploadedUrl = await uploadFile(values.resume, 'immigration-resume');
        if (!uploadedUrl) {
          throw new Error('Failed to upload resume');
        }
        resumeUrl = uploadedUrl;
      } else if (typeof values.resume === 'string') {
        resumeUrl = values.resume;
      }

      const applicationPayload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        countryCode: values.countryCode,
        country: values.country,
        city: values.city,
        state: values.state,
        serviceType: values.serviceType,
        countryOfDestination: values.countryOfDestination,
        nationality: values.nationality,
        currentVisaStatus: values.currentVisaStatus,
        travelIntentPurpose: values.travelIntentPurpose,
        resume: resumeUrl,
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
      toast.success('Immigration Service application submitted successfully!');
      form.reset();
      // router.push('/admin/applications');
    } catch (error) {
      toast.error('Failed to submit Immigration Service application. Please try again.');
      console.error('Immigration Service application creation error:', error);
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
            <p className="font-semibold col-span-2 border-b pb-2 mt-4">Immigration Information</p>
          )}

          {/* Service Type */}
          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Type</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter service type" disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country of Destination */}
          <FormField
            control={form.control}
            name="countryOfDestination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country of Destination</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter country of destination" disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nationality */}
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nationality</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter nationality" disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Current Visa Status */}
          <FormField
            control={form.control}
            name="currentVisaStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Visa Status</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter current visa status" disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Travel Intent / Purpose */}
          <FormField
            control={form.control}
            name="travelIntentPurpose"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Travel Intent / Purpose</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter travel intent or purpose"
                    disabled={isView}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Upload Resume */}
          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Upload Resume (Optional)</FormLabel>
                <FormControl>
                  <FileInput onFileChange={field.onChange} disabled={isView} />
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

export default ImmigrationServiceForm;
