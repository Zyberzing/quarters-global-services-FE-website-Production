'use client';

import React, { useState } from 'react';
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
import { PhoneInput2 } from '@/components/ui/PhoneInput2';
import handleAsync from '@/lib/handleAsync';
import { createApplication, editApplication } from '@/services/applicatonService';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { otherServices_platformServiceId } from '@/lib/staticIds';
 import { commonFieldSchema, emailSchema, phoneNumberSchema } from '@/lib/formSchemaFunctions';
import { ApplicationSource } from '@/lib/Types';

const genders = ['Male', 'Female', 'Other'];

const purposesOfTravel = ['Business', 'Leisure', 'Education', 'Medical', 'Other']; // example
const insurancePreferences = ['Basic', 'Standard', 'Premium']; // example

const formSchema = z.object({
  // Basic fields
  firstName: commonFieldSchema(),
  lastName: commonFieldSchema(),
  email: emailSchema(),
  phone: phoneNumberSchema(),
  countryCode: commonFieldSchema(),

  // Service-specific fields
  dateOfBirth: commonFieldSchema(),
  gender: commonFieldSchema(),
  startDate: commonFieldSchema(),
  endDate: commonFieldSchema(),
  sourceCountry: commonFieldSchema(),
  destinationCountry: commonFieldSchema(),
  visaType: commonFieldSchema(),
  passportNumber: commonFieldSchema(),
  passportExpiryDate: commonFieldSchema(),
  purposeOfTravel: commonFieldSchema(),
  insurancePreference: commonFieldSchema(),

  // Health Information
  anyPremedicalCondition: commonFieldSchema(),
  currentMedication: commonFieldSchema(),
  covidCoverageRequired: commonFieldSchema(),

  // Coverage Requirement
  coverageType: commonFieldSchema(),
  coverageLimit: commonFieldSchema(),
  deductibleAmount: commonFieldSchema(),

  // Additional Information
  plannedActivities: commonFieldSchema(),
  ageGroupOfTravellers: commonFieldSchema(),
  travellingWithChildren: commonFieldSchema(),
  additionalNotes: commonFieldSchema().optional(),
});

const TravelInsuranceForm = ({
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
      dateOfBirth: defaultData?.dateOfBirth || undefined,
      gender: defaultData?.gender || '',
      startDate: defaultData?.startDate || undefined,
      endDate: defaultData?.endDate || undefined,
      sourceCountry: defaultData?.sourceCountry || '',
      destinationCountry: defaultData?.destinationCountry || '',
      visaType: defaultData?.visaType || '',
      passportNumber: defaultData?.passportNumber || '',
      passportExpiryDate: defaultData?.passportExpiryDate || undefined,
      purposeOfTravel: defaultData?.purposeOfTravel || '',
      insurancePreference: defaultData?.insurancePreference || '',
      anyPremedicalCondition: defaultData?.anyPremedicalCondition || '',
      currentMedication: defaultData?.currentMedication || '',
      covidCoverageRequired: defaultData?.covidCoverageRequired || '',
      coverageType: defaultData?.coverageType || '',
      coverageLimit: defaultData?.coverageLimit || '',
      deductibleAmount: defaultData?.deductibleAmount || '',
      plannedActivities: defaultData?.plannedActivities || '',
      ageGroupOfTravellers: defaultData?.ageGroupOfTravellers || '',
      travellingWithChildren: defaultData?.travellingWithChildren || '',
      additionalNotes: defaultData?.additionalNotes || '',
    },
  });

  const onSubmit = handleAsync(async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // document
      const document = '';

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
        router.push('/admin/services');
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
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isView} />
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
                  <Input {...field} disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of Birth */}
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isView}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genders.map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Input type="email" {...field} disabled={isView} />
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

          {/* Start Date */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* End Date */}
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Source Country */}
          <FormField
            control={form.control}
            name="sourceCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter source country" {...field} disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Destination Country */}
          <FormField
            control={form.control}
            name="destinationCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter destination country" {...field} disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Visa Type */}
          <FormField
            control={form.control}
            name="visaType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visa Type</FormLabel>
                <FormControl>
                  <Input placeholder="Enter visa type" {...field} disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Passport Number */}
          <FormField
            control={form.control}
            name="passportNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passport Number</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Passport Expiry Date */}
          <FormField
            control={form.control}
            name="passportExpiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passport Expiry Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} disabled={isView} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Purpose of Travel */}
          <FormField
            control={form.control}
            name="purposeOfTravel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose of Travel</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isView}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {purposesOfTravel.map((purpose) => (
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

          {/* Insurance Preferences */}
          <FormField
            control={form.control}
            name="insurancePreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Insurance Preferences</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isView}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent>
                      {insurancePreferences.map((pref) => (
                        <SelectItem key={pref} value={pref}>
                          {pref}
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

        {/* Health Information Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Health Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Any Premedical Condition */}
            <FormField
              control={form.control}
              name="anyPremedicalCondition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Any Premedical Condition?</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} disabled={isView}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Current Medication */}
            <FormField
              control={form.control}
              name="currentMedication"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Medication</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter current medication or 'None'"
                      {...field}
                      disabled={isView}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* COVID-19 Coverage Required */}
            <FormField
              control={form.control}
              name="covidCoverageRequired"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>COVID-19 Coverage Required?</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} disabled={isView}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Coverage Requirement Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Coverage Requirement</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Coverage Type */}
            <FormField
              control={form.control}
              name="coverageType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coverage Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter coverage type" {...field} disabled={isView} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Coverage Limit */}
            <FormField
              control={form.control}
              name="coverageLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coverage Limit</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter coverage limit" {...field} disabled={isView} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Deductible Amount */}
            <FormField
              control={form.control}
              name="deductibleAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deductible Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter deductible amount" {...field} disabled={isView} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Planned Activities */}
            <FormField
              control={form.control}
              name="plannedActivities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Planned Activities</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter planned activities" {...field} disabled={isView} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Age Group of Travellers */}
            <FormField
              control={form.control}
              name="ageGroupOfTravellers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age Group of Travellers</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter age group" {...field} disabled={isView} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Travelling with Children */}
            <FormField
              control={form.control}
              name="travellingWithChildren"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Travelling with Children</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} disabled={isView}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Additional Notes */}
            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter any additional notes (optional)"
                      {...field}
                      disabled={isView}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => router.back()}
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

export default TravelInsuranceForm;
