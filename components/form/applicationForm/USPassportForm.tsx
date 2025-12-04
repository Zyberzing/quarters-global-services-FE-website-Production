'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateApplicationType } from './schemas/index';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface USPassportFormProps {
  isView?: boolean;
}

const USPassportForm = ({ isView = false }: USPassportFormProps) => {
  const form = useFormContext<CreateApplicationType>();

  return (
    <div className="space-y-6">
      {/* 🧾 Applicant Information */}
      <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
        <p className="col-span-2 font-semibold flex items-center gap-2">🧾 Applicant Information</p>

        {/* Name Fields */}
        <FormField
          name="lastName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Last Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Last Name" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="firstName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                First Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="First Name" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="middleName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input placeholder="Middle Name" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date of Birth */}
        <FormField
          name="dob"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Date of Birth (MM/DD/YYYY) <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="date" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sex */}
        <FormField
          name="sex"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Sex <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange} disabled={isView}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Place of Birth */}
        <FormField
          name="birthCity"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Place of Birth (City) <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Birth City" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="birthState"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Place of Birth (State/Country) <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Birth State/Country" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Social Security Number - 3 parts */}
        <div className="col-span-2">
          <FormLabel>
            Social Security Number <span className="text-red-500">*</span>
          </FormLabel>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <FormField
              name="nationalId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="XXX"
                      maxLength={3}
                      readOnly={isView}
                      {...field}
                      value={field.value?.split('-')[0] || ''}
                      onChange={(e) => {
                        const parts = field.value?.split('-') || ['', '', ''];
                        parts[0] = e.target.value;
                        field.onChange(parts.join('-'));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="nationalId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="XX"
                      maxLength={2}
                      readOnly={isView}
                      {...field}
                      value={field.value?.split('-')[1] || ''}
                      onChange={(e) => {
                        const parts = field.value?.split('-') || ['', '', ''];
                        parts[1] = e.target.value;
                        field.onChange(parts.join('-'));
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="nationalId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="XXXX"
                      maxLength={4}
                      readOnly={isView}
                      {...field}
                      value={field.value?.split('-')[2] || ''}
                      onChange={(e) => {
                        const parts = field.value?.split('-') || ['', '', ''];
                        parts[2] = e.target.value;
                        field.onChange(parts.join('-'));
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Physical Characteristics */}
        <FormField
          name="visibleMarks"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hair Color</FormLabel>
              <FormControl>
                <Input placeholder="Hair Color" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="religion"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Eye Color</FormLabel>
              <FormControl>
                <Input placeholder="Eye Color" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Height */}
        <FormField
          name="educationLevel"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height</FormLabel>
              <FormControl>
                <Input placeholder="Height (e.g., 5'10&quot;)" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Occupation */}
        <FormField
          name="occupation"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occupation</FormLabel>
              <FormControl>
                <Input placeholder="Occupation" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Employer or School */}
        <FormField
          name="employerOrSchool"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employer or School</FormLabel>
              <FormControl>
                <Input placeholder="Employer or School" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* 📬 Address Details */}
      <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
        <p className="col-span-2 font-semibold flex items-center gap-2">📬 Address Details</p>

        {/* Mailing Address */}
        <div className="col-span-2">
          <h4 className="font-medium mb-3">Mailing Address</h4>
        </div>

        <FormField
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Address Line 1 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Address Line 1" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="homeAddress"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2 (In Care Of)</FormLabel>
              <FormControl>
                <Input placeholder="In Care Of" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="city"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                City <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="City" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="state"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                State <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="State" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="pincode"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Zip Code <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Zip Code" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="country"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Country <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Country" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Permanent Address */}
        <div className="col-span-2">
          <h4 className="font-medium mb-3 mt-4">Permanent Address</h4>
        </div>

        <FormField
          name="permAddress"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street</FormLabel>
              <FormControl>
                <Input placeholder="Street" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="homeCity"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apartment/Unit</FormLabel>
              <FormControl>
                <Input placeholder="Apartment/Unit" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="permCity"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="permState"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="State" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="permZip"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input placeholder="Zip Code" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="permCountry"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Country" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* 📞 Contact Information */}
      <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
        <p className="col-span-2 font-semibold flex items-center gap-2">📞 Contact Information</p>

        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Primary Phone Number <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Primary Phone Number" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="mobilePhone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Contact Phone Numbers</FormLabel>
              <FormControl>
                <Input placeholder="Additional Phone Numbers" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                Email Address <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email Address" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* 📇 Passport Details */}
      <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
        <p className="col-span-2 font-semibold flex items-center gap-2">📇 Passport Details</p>

        <FormField
          name="passportNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                Your name as printed on your most recent U.S. passport book/card
              </FormLabel>
              <FormControl>
                <Input placeholder="Name as printed on passport" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="passportNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Most recent U.S. passport book number</FormLabel>
              <FormControl>
                <Input placeholder="Passport book number" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="otherPassportNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Most recent U.S. passport card number</FormLabel>
              <FormControl>
                <Input placeholder="Passport card number" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="passportIssueDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Issue Date (MM/DD/YYYY)</FormLabel>
              <FormControl>
                <Input type="date" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="otherPassportIssueDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Issue Date (MM/DD/YYYY)</FormLabel>
              <FormControl>
                <Input type="date" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="visaType"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passport Type Requested</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange} disabled={isView}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Passport Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="large-book">Large Book</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Checkboxes */}
        <div className="col-span-2 space-y-3">
          <FormField
            name="militaryService"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === 'yes'}
                    onCheckedChange={(checked) => field.onChange(checked ? 'yes' : 'no')}
                    disabled={isView}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>16 Years</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="previousVisitToIndia"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === 'yes'}
                    onCheckedChange={(checked) => field.onChange(checked ? 'yes' : 'no')}
                    disabled={isView}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Less Than 15 Years</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="visaRefused"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === 'yes'}
                    onCheckedChange={(checked) => field.onChange(checked ? 'yes' : 'no')}
                    disabled={isView}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Damaged</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="refusedEntryDeported"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === 'yes'}
                    onCheckedChange={(checked) => field.onChange(checked ? 'yes' : 'no')}
                    disabled={isView}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Not Limited</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="everArrested"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === 'yes'}
                    onCheckedChange={(checked) => field.onChange(checked ? 'yes' : 'no')}
                    disabled={isView}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Name Changed</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="everConvicted"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === 'yes'}
                    onCheckedChange={(checked) => field.onChange(checked ? 'yes' : 'no')}
                    disabled={isView}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Gender Selection</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* 👰 Name Change Details */}
      <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
        <p className="col-span-2 font-semibold flex items-center gap-2">👰 Name Change Details</p>

        <div className="col-span-2 space-y-3">
          <FormField
            name="maritalStatus"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === 'married'}
                    onCheckedChange={(checked) => field.onChange(checked ? 'married' : 'single')}
                    disabled={isView}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Name Change by Marriage</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="citizenshipAcquiredBy"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === 'court-order'}
                    onCheckedChange={(checked) => field.onChange(checked ? 'court-order' : '')}
                    disabled={isView}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Name Change by Court Order</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="expectedArrivalDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name Change Date (MM/DD/YYYY)</FormLabel>
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
              <FormLabel>Name Change Place (City/State/Court)</FormLabel>
              <FormControl>
                <Input placeholder="City/State/Court" readOnly={isView} {...field} />
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
              <FormLabel>Proof of Name Change (Marriage Certificate, Court Order, etc.)</FormLabel>
              <FormControl>
                <Input placeholder="Proof of Name Change" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* 🧑‍🤝‍🧑 Emergency Contact Information */}
      <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
        <p className="col-span-2 font-semibold flex items-center gap-2">
          🧑‍🤝‍🧑 Emergency Contact Information
        </p>

        <FormField
          name="refUSAName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Emergency Contact Name" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="refUSACompany"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relationship to Applicant</FormLabel>
              <FormControl>
                <Input placeholder="Relationship" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="refUSAAddress"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="workAddress"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apartment/Unit</FormLabel>
              <FormControl>
                <Input placeholder="Apartment/Unit" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="refUSACity"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="refUSAState"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="State" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="refUSAZip"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input placeholder="Zip Code" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="countryOfBirth"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Country" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="refUSAPhone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Phone Number" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="refUSAEmail"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* 🌍 Travel Information */}
      <div className="p-4 border rounded-lg grid sm:grid-cols-2 gap-4">
        <p className="col-span-2 font-semibold flex items-center gap-2">🌍 Travel Information</p>

        <FormField
          name="expectedArrivalDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure Date (MM/DD/YYYY)</FormLabel>
              <FormControl>
                <Input type="date" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="passportExpiryDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Return Date (MM/DD/YYYY)</FormLabel>
              <FormControl>
                <Input type="date" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="countriesVisited10Years"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Countries To Be Visited</FormLabel>
              <FormControl>
                <Input placeholder="Countries To Be Visited" readOnly={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* 🔄 Eligibility Section */}
      <div className="p-4 border rounded-lg grid sm:grid-cols-1 gap-4">
        <p className="font-semibold flex items-center gap-2">🔄 Eligibility Section (Checkboxes)</p>

        <div className="space-y-3">
          <FormField
            name="holdsOtherPassport"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === 'yes'}
                    onCheckedChange={(checked) => field.onChange(checked ? 'yes' : 'no')}
                    disabled={isView}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Can submit most recent U.S. passport</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="previousCitizenship"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === 'yes'}
                    onCheckedChange={(checked) => field.onChange(checked ? 'yes' : 'no')}
                    disabled={isView}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Was at least 16 years old when issued</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="grandparentsPakistan"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === 'yes'}
                    onCheckedChange={(checked) => field.onChange(checked ? 'yes' : 'no')}
                    disabled={isView}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Passport issued less than 15 years ago</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="fatherPrevCitizenship"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === 'yes'}
                    onCheckedChange={(checked) => field.onChange(checked ? 'yes' : 'no')}
                    disabled={isView}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Passport not damaged/lost/stolen</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="motherPrevCitizenship"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === 'yes'}
                    onCheckedChange={(checked) => field.onChange(checked ? 'yes' : 'no')}
                    disabled={isView}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Not limited to less than normal validity</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="spousePrevCitizenship"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === 'yes'}
                    onCheckedChange={(checked) => field.onChange(checked ? 'yes' : 'no')}
                    disabled={isView}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Name unchanged or legally changed with proof</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default USPassportForm;
