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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PhoneInput2 } from '@/components/ui/PhoneInput2';
import { FileInput } from '@/components/ui/file-input';
import { uploadFile } from '@/lib/uploadFile';

const applicationTypes = ['New', 'Correction', 'Reprint'];
const applicantTypes = ['Individual', 'Business', 'NRI'];
const yesNoOptions = ['Yes', 'No'];

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone Number is required'),
  countryCode: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  applicationType: z.string().min(1, 'Application Type is required'),
  applicantType: z.string().min(1, 'Applicant Type is required'),
  citizenship: z.string().min(1, 'Citizenship is required'),
  hasIndianAddress: z.string().min(1, 'This field is required'),
  passportOCICopy: z.any().optional(),
});

const IndianPANCardForm = ({
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
      applicationType: '',
      applicantType: '',
      citizenship: '',
      hasIndianAddress: '',
      passportOCICopy: undefined,
    },
  });

  const onSubmit = handleAsync(async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Handle file upload if passportOCICopy exists
      let passportOCICopyUrl = '';
      if (values.passportOCICopy instanceof File) {
        const uploadedUrl = await uploadFile(values.passportOCICopy, 'pan-passport-oci-copy');
        if (!uploadedUrl) {
          throw new Error('Failed to upload passport/OCI copy');
        }
        passportOCICopyUrl = uploadedUrl;
      } else if (typeof values.passportOCICopy === 'string') {
        passportOCICopyUrl = values.passportOCICopy;
      }

      const applicationPayload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        countryCode: values.countryCode,
        country: values.country,
        city: values.city,
        state: values.state,
        applicationType: values.applicationType,
        applicantType: values.applicantType,
        citizenship: values.citizenship,
        hasIndianAddress: values.hasIndianAddress,
        passportOCICopy: passportOCICopyUrl,
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
      toast.success('Indian PAN Card application submitted successfully!');
      form.reset();
      // router.push('/admin/applications');
    } catch (error) {
      toast.error('Failed to submit Indian PAN Card application. Please try again.');
      console.error('Indian PAN Card application creation error:', error);
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
            <p className="font-semibold col-span-2 border-b pb-2 mt-4">PAN Card Information</p>
          )}

          {/* Application Type */}
          <FormField
            control={form.control}
            name="applicationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Application Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isView}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select application type" />
                    </SelectTrigger>
                    <SelectContent>
                      {applicationTypes.map((type) => (
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

          {/* Applicant Type */}
          <FormField
            control={form.control}
            name="applicantType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Applicant Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isView}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select applicant type" />
                    </SelectTrigger>
                    <SelectContent>
                      {applicantTypes.map((type) => (
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

          {/* Do You Have an Indian Address */}
          <FormField
            control={form.control}
            name="hasIndianAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do You Have an Indian Address?</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isView}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      {yesNoOptions.map((option) => (
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

          {/* Upload Passport / OCI Copy */}
          <FormField
            control={form.control}
            name="passportOCICopy"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Upload Passport / OCI Copy (Optional)</FormLabel>
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

export default IndianPANCardForm;
