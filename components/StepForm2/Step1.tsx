"use client";

import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { Step1Data2, step1Schema2 } from "@/lib/validationSchemas";
import { useCreateApplicationMutation } from "@/services/applicationApi";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setFormData } from "@/store/slices/applicationSlice";
import { useVerifyEmailMutation } from "@/services/verifyEmail";
import { ApplicationPayload } from "@/lib/Types";
import { clearPlatformServices, getPlatformServices } from "@/lib/platformServiceStorage";
import { toast } from "sonner";
import { store } from "@/store/store";
import EmailVerifyDialog from "../StepForm/EmailVerifyDialog";


// --- Types for API ---
interface Address {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

interface Application {
  // Basic Details
  applicationType?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  maritalStatus?: string;
  nationality?: string;

  // Contact & Company Info
  email?: string;
  phone?: string;
  company?: string;

  // Passport Details
  usPassportNumber?: string;
  placeOfIssue?: string;
  dateOfIssue?: string;
  dateOfExpiry?: string;

  // Travel Details
  departureDate?: string;

  // Address Details
  physicalAddress?: Address;
  currentLegalAddress?: Address;

  // Platform Services (from local storage)
  platformServices?: any[];

  // Optional metadata for backend
  status?: string;
  applicationSource?: string;
  fromCountryId?: string;
  toCountryId?: string;
}


const mapApiToForm = (app: Application): Step1Data2 => ({
  applicationType: app?.applicationType || "",
  firstName: app.firstName || "",
  lastName: app.lastName || "",
  dateOfBirth: app.dateOfBirth || "",
  gender: app.gender || "",
  maritalStatus: app.maritalStatus || "",
  nationality: app.nationality || "",
  phone: app.phone || "",
  email: app.email || "",
  company: app.company || "",
  usPassportNumber: app.usPassportNumber || "",
  placeOfIssue: app.placeOfIssue || "",
  dateOfIssue: app.dateOfIssue || "",
  dateOfExpiry: app.dateOfExpiry || "",
  departureDate: app.departureDate?.split("T")[0] || "",
  physicalAddress: {
    addressLine1: app.physicalAddress?.addressLine1 || "",
    addressLine2: app.physicalAddress?.addressLine2 || "",
    city: app.physicalAddress?.city || "",
    state: app.physicalAddress?.state || "",
    zipCode: app.physicalAddress?.zipCode || "",
    country: app.physicalAddress?.country || "",
  },
  currentLegalAddress: {
    addressLine1: app.currentLegalAddress?.addressLine1 || "",
    addressLine2: app.currentLegalAddress?.addressLine2 || "",
    city: app.currentLegalAddress?.city || "",
    state: app.currentLegalAddress?.state || "",
    zipCode: app.currentLegalAddress?.zipCode || "",
    country: app.currentLegalAddress?.country || "",
  },
});



export default function Step1() {
  const [createApplication] =
    useCreateApplicationMutation();
  const dispatch = useDispatch();
  const [verifyEmail] = useVerifyEmailMutation();
  const [emailOtpVerify, setEmailVerify] = useState(false)
  const [payload, setPayload] = useState<ApplicationPayload>()

  const form = useForm<any>({
    resolver: zodResolver(step1Schema2),
    defaultValues: mapApiToForm({}),
  });


  const onSubmit = async (values: Step1Data2) => {
    try {
      const platformServices = getPlatformServices() || [];
      console.log(platformServices, "platformServices");

      // 🏠 Build common address object
      const fullAddress = {
        addressLine1: values.currentLegalAddress?.addressLine1 || "",
        addressLine2: values.currentLegalAddress?.addressLine2 || "",
        city: values.currentLegalAddress?.city || "",
        state: values.currentLegalAddress?.state || "",
        zipCode: values.currentLegalAddress?.zipCode || "",
        country: values.currentLegalAddress?.country || "",
      };

      // 🧩 Build payload
      const payload = {
        applications: [
          {
            // 🔹 Basic Details
            applicationType: values.applicationType || "",
            firstName: values.firstName,
            lastName: values.lastName,
            dateOfBirth: values.dateOfBirth || "",
            gender: values.gender || "",
            maritalStatus: values.maritalStatus || "",
            nationality: values.nationality || "",

            // 🔹 Contact & Company Info
            email: values.email,
            phone: values.phone,
            countryCode: "+1",
            company: values.company || "",

            // 🔹 Passport Details
            usPassportNumber: values.usPassportNumber || "",
            placeOfIssue: values.placeOfIssue || "",
            dateOfIssue: values.dateOfIssue || "",
            dateOfExpiry: values.dateOfExpiry || "",

            // 🔹 Travel & Address Info
            departureDate: values.departureDate || "",
            address: fullAddress,
            currentLegalAddress: fullAddress,

            // 🔹 Static Metadata
            status: "Submitted",
            applicationSource: "Website",
          
                        fromCountryId: localStorage.getItem("fromCountryId"),
                        toCountryId:localStorage.getItem("toCountryId"),

            // 🔹 Platform Services
            platformServices: (() => {
                            const merged = (platformServices || []).reduce((acc: any, s: any) => {
                                for (const [key, value] of Object.entries(s)) {
                                    if (Array.isArray(value)) {
                                        // merge arrays safely, even if empty
                                        acc[key] = [...(acc[key] || []), ...value];
                                    } else if (value !== "" && value !== null && value !== undefined) {
                                        // keep last non-empty string/number/boolean
                                        acc[key] = value;
                                    }
                                }
                                return acc;
                            }, {
                                platformServiceId: "",
                                platformServiceCategoryId: "",
                                platformServiceCategoryPackageId: "",
                                platformServiceCategoryPackageAddonsId: [],
                                price: 0,
                                currency: "USD",
                                Price_name: "",
                                additionService: false,
                                additionService_price: 0,
                                additionService_name: ""
                            });

                            // return as array (to keep the same structure)
                            return [merged];
                        })(),

            // 🔹 Service Fields
            serviceFields: {
              serviceType: "CourierDelivery",
            },
          },
        ],
      };

      // 🧠 Save to Redux if editing existing app
      const activeId = store.getState().application.activeId;
      if (activeId) {
        dispatch(
          setFormData({
            id: activeId,
            form: payload,
          })
        );
      }

      // 📨 Proceed with email verification
      setPayload(payload);
      const res = await verifyEmail({ email: values.email }).unwrap();

      console.log(res, "resssss");

      try {
        const res = await verifyEmail({
          email: values.email
        }).unwrap();

        if (res?.message === "Email is already verified.") {
          const response = await createApplication(payload).unwrap();
          if (response?.status && response.data?.redirectURL) {
            clearPlatformServices();
            localStorage.removeItem("applications");
            window.location.href = response.data.redirectURL;
          } else {
            toast.error("Application created but no redirect URL returned");
          }
        } else {
          console.error(res?.message || "Email verification failed");
          if (res?.message === "We have sent OTP to your email. Please check your inbox."
          ) {
            setEmailVerify(true);
          }
          setEmailVerify(false);
        }
      } catch (err: any) {
        const message =
          err?.message ||
          err?.data?.message ||
          "Something went wrong while verifying email.";

        // Show toast message
        toast.error(message);

        // ✅ If backend indicates OTP sent, open verification dialog
        if (
          message === "We have sent OTP to your email. Please check your inbox." ||
          message.toLowerCase().includes("otp")
        ) {
          setEmailVerify(true);
        } else {
          setEmailVerify(false);
        }
      }

    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong while creating application");
      if ("We have sent OTP to your email. Please check your inbox." === error?.data?.message) {
        setEmailVerify(true);
      }
    }
  };


  const handleVerify = async () => {
    const response = await createApplication(payload as ApplicationPayload).unwrap();
    if (response?.status && response.data?.redirectURL) {
      clearPlatformServices();
      localStorage.removeItem("applications");
      window.location.href = response.data.redirectURL;
    } else {
      toast.error("Application created but no redirect URL returned");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-full mx-auto w-[80%] my-7">
      <h3 className="text-xl font-semibold mb-4">Applicant Details</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          {/* Application Type */}
          <FormField
            control={form.control}
            name="applicationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Application Type</FormLabel>
                <FormControl>
                  <Input placeholder="OCI Minor Application" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* First & Last Name */}
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
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
          </div>

          {/* DOB & Gender */}
          <div className="grid md:grid-cols-2 gap-4">
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
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input placeholder="Male / Female / Other" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Marital Status & Nationality */}
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marital Status</FormLabel>
                  <FormControl>
                    <Input placeholder="Single / Married" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <Input placeholder="USA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Contact Number & Email */}
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 9876543210" {...field} />
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
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Passport Number & Place of Issue */}
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="usPassportNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>US Passport Number</FormLabel>
                  <FormControl>
                    <Input placeholder="123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="placeOfIssue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place of Issue</FormLabel>
                  <FormControl>
                    <Input placeholder="New York" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Dates of Issue & Expiry */}
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="dateOfIssue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Issue</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfExpiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Expiry</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-6">
            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
              Next
            </Button>
          </div>
        </form>
      </Form>

    {emailOtpVerify && (
        <EmailVerifyDialog
          email={payload?.applications[0]?.email ?? ""}
          handleSubmite={handleVerify}
          onClose={() => setEmailVerify(false)} // ✅ correct prop name
          emailOtpVerify={emailOtpVerify}       // ✅ now valid
        />
      )}

    </div>
  );
}
