"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// ✅ Zod schema
const formSchema = z.object({
  cardNumber: z.string().min(12, "Enter a valid card number"),
  expiry: z.string().min(4, "Enter expiry date"),
  cvv: z.string().min(3, "Enter valid CVV"),
  lastName: z.string().min(1, "Required"),
  billingAddress: z.enum(["default", "other"]),
  agree: z.boolean().refine((v) => v === true, {
    message: "You must agree before placing order",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const BillingPage = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      expiry: "",
      cvv: "",
      lastName: "",
      billingAddress: "default",
      agree: false,
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("Order placed:", values);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-xl font-bold mb-6">
        Where should your documents be shipped?
      </h2>
      <p className="text-gray-600 mb-6">
        An insured shipping label will be provided as a complimentary part of your Concierge Service
        for Indian Visas. Your completed documents will be shipped back to the address you provide
        below after processing by the Indian Mission.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="md:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Billing Info */}
              <div>
                <h3 className="font-semibold mb-4">Enter Billing Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Credit Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="4111 1111 1111 1111" {...field} />
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
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <h3 className="font-semibold mb-4">Billing Address</h3>
                <FormField
                  control={form.control}
                  name="billingAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="space-y-3"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="default" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              <span className="block">Bill to this Address:</span>
                              Carlos Sebastian <br />
                              47 W, 13th Street, <br />
                              New York, NY 10011
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="other" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Use Different Address
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Terms */}
              <FormField
                control={form.control}
                name="agree"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal text-sm">
                      I am acknowledging that I have reviewed and agree with the{" "}
                      <a href="#" className="underline text-blue-600">
                        Terms of Use
                      </a>{" "}
                      and{" "}
                      <a href="#" className="underline text-blue-600">
                        Privacy Policy
                      </a>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex justify-between">
                <Button type="button" variant="outline">
                  Back to Traveler Info
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  Place Order
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Right Section - Order Summary */}
        <div className="bg-white border rounded-lg shadow p-6">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Shipping service charges</span>
              <span>$784.42</span>
            </li>
            <li className="flex justify-between">
              <span>Govt Fee</span>
              <span>$175.00</span>
            </li>
            <li className="flex justify-between">
              <span>Agency Fee</span>
              <span>$102.50</span>
            </li>
            <li className="flex justify-between">
              <span>India Visa Concierge Service Fee</span>
              <span>$99.00</span>
            </li>
            <li className="flex justify-between">
              <span>VFS Mandatory Service Fee</span>
              <span>$80.00</span>
            </li>
          </ul>
          <hr className="my-4" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>$1184.92</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
