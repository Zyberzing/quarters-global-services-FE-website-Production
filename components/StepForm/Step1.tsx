"use client";

import { useEffect, useState } from "react";
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
import { FileEdit } from "lucide-react";
import { step1Schema, Step1Data } from "@/lib/validationSchemas";
import { useCreateApplicationMutation } from "@/services/applicationApi";
import { getPlatformServices, removeFromPlatformServices } from "@/lib/platformServiceStorage";
import { useDispatch } from "react-redux";
import { setFormData } from "@/store/slices/applicationSlice";
import { store } from "@/store/store";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import EmailVerifyDialog from "./EmailVerifyDialog";
import { useVerifyEmailMutation } from "@/services/verifyEmail";
import { Trash } from "lucide-react";

import { ApplicationPayload } from "@/services/applicationApi2";

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
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    departureDate?: string;
    physicalAddress?: Address;
    currentLegalAddress?: Address;
    platformServices?: any[];
}

// --- Map API response to form values ---
const mapApiToForm = (app: Application): Step1Data => ({
    firstName: app.firstName || "",
    lastName: app.lastName || "",
    email: app.email || "",
    phone: app.phone || "",
    company: app.company || "",
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
    const [createApplication, { data, isLoading }] =
        useCreateApplicationMutation();
    const dispatch = useDispatch();
    const router = useRouter()
    const [applications, setApplications] = useState<Application[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [verifyEmail] = useVerifyEmailMutation();
    const [emailOtpVerify, setEmailVerify] = useState(false)
    const [payload, setPayload] = useState<ApplicationPayload>()
    console.log(payload, "payload")
    const platformServices = getPlatformServices() || [];


    const form = useForm<Step1Data>({
        resolver: zodResolver(step1Schema),
        defaultValues: mapApiToForm({}),
    });


    // --- Prefill from API ---
    useEffect(() => {
        if (data?.applications?.length) {
            setApplications(data.applications);
            form.reset(mapApiToForm(data.applications[0]));
            setActiveIndex(0);
        }
    }, [data, form]);

    // --- Prefill from localStorage ---
    useEffect(() => {
        const saved = localStorage.getItem("applications");

        if (!saved) return;

        try {
            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed.applications)) {
                // ✅ Keep only apps where platformServiceCategoryId is a non-empty string
                const validApps = parsed.applications.filter(
                    (app: any) =>
                        typeof app?.platformServiceCategoryId === "string" &&
                        app.platformServiceCategoryId.trim() !== ""
                );

                if (validApps.length > 0) {
                    setApplications(validApps);

                    const firstFormData = validApps[0]?.form?.applications?.[0] || {};
                    form.reset(mapApiToForm(firstFormData));
                } else {
                    setApplications([]);
                    form.reset(mapApiToForm({}));
                }
            }
        } catch (e) {
            console.error("Failed to parse applications from localStorage", e);
            setApplications([]);
            form.reset(mapApiToForm({}));
        }
    }, [form]);

    const onSubmit = async (values: Step1Data) => {
        try {

            console.log(platformServices, "platformServices")
            const applicationData = localStorage.getItem("applications")
            console.log(applicationData, "applicationData")
            //  Build one common address object from currentLegalAddress
            const fullAddress = {
                addressLine1: values.currentLegalAddress?.addressLine1 || "",
                addressLine2: values.currentLegalAddress?.addressLine2 || "",
                city: values.currentLegalAddress?.city || "",
                state: values.currentLegalAddress?.state || "",
                zipCode: values.currentLegalAddress?.zipCode || "",
                country: values.currentLegalAddress?.country || "",
            };
            //  Build payload
            const payload = {
                applications: [
                    {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        phone: values.phone,
                        countryCode: "+1",
                        company: values.company || "",
                        status: "Submitted",
                        applicationSource: "Website", // Website | AgentPortal | AdminPortal

                        //  Use same object for both
                        address: fullAddress,
                        currentLegalAddress: fullAddress,
                        isSubmittedFromApplication: true,
                        isSubmittedFromService: false,
                        fromCountryId: localStorage.getItem("fromCountryId"),
                        toCountryId: localStorage.getItem("toCountryId"),
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

                        serviceFields: {
                            serviceType: "CourierDelivery",
                        },
                    },

                ],
            };
            //  Save to Redux if editing existing app
            const activeId = store.getState().application.activeId;
            if (activeId) {
                dispatch(
                    setFormData({
                        id: activeId,
                        form: payload,
                    })
                );
            }
            setPayload(payload)


            try {
                const res = await verifyEmail({
                    email: values.email
                }).unwrap();

                console.log(res, "ressss")

                if (res.status) {
                    if (res?.message === "Email is already verified.") {
                        const response = await createApplication(payload).unwrap();
                        if (response?.status && response.data?.redirectURL) {
                            // clearPlatformServices();
                            // localStorage.removeItem("applications");
                            window.location.href = response.data.redirectURL;
                        }

                    } else {
                        setEmailVerify(true);
                    }
                }
            } catch (err: any) {
                const message =
                    err?.message ||
                    err?.data?.message ||
                    "Something went wrong while verifying email.";

                // Show toast message
                toast.error(message);
            }

        } catch (error: any) {
            toast.error(error?.data?.message || "Something went wrong while creating application");

        }
    };

    // const onSubmit = async (values: Step1Data) => {
    //     try {
    //         // 🌍 Read existing applications from localStorage
    //         const stored = JSON.parse(localStorage.getItem("applications") || "{}");
    //         const existingApps = stored.applications || [];

    //         // 🧱 Common address object
    //         const fullAddress = {
    //             addressLine1: values.currentLegalAddress?.addressLine1 || "",
    //             addressLine2: values.currentLegalAddress?.addressLine2 || "",
    //             city: values.currentLegalAddress?.city || "",
    //             state: values.currentLegalAddress?.state || "",
    //             zipCode: values.currentLegalAddress?.zipCode || "",
    //             country: values.currentLegalAddress?.country || "",
    //         };

    //         // 🏗 Build full payload
    //         const payload = {
    //             applications: existingApps.map((app: any) => {
    //                 const mergedServices = (platformServices || []).reduce((acc: any, s: any) => {
    //                     for (const [key, value] of Object.entries(s)) {
    //                         if (Array.isArray(value)) {
    //                             acc[key] = [...(acc[key] || []), ...value];
    //                         } else if (value !== "" && value !== null && value !== undefined) {
    //                             acc[key] = value;
    //                         }
    //                     }
    //                     return acc;
    //                 }, {
    //                     platformServiceId: "",
    //                     platformServiceCategoryId: "",
    //                     platformServiceCategoryPackageId: "",
    //                     platformServiceCategoryPackageAddonsId: [],
    //                     price: 0,
    //                     currency: "USD",
    //                     Price_name: "",
    //                     additionService: false,
    //                     additionService_price: 0,
    //                     additionService_name: ""
    //                 });

    //                 return {
    //                     ...app, // keep id, type, etc.
    //                     form: {
    //                         applications: [
    //                             {
    //                                 firstName: values.firstName,
    //                                 lastName: values.lastName,
    //                                 email: values.email,
    //                                 phone: values.phone,
    //                                 countryCode: "+1",
    //                                 company: values.company || "",
    //                                 status: "Submitted",
    //                                 applicationSource: "Website",
    //                                 address: fullAddress,
    //                                 currentLegalAddress: fullAddress,
    //                                 fromCountryId: localStorage.getItem("fromCountryId"),
    //                                 toCountryId: localStorage.getItem("toCountryId"),
    //                                 platformServices: [mergedServices],
    //                                 serviceFields: {
    //                                     serviceType: "CourierDelivery",
    //                                 },
    //                             },
    //                         ],
    //                     },
    //                 };
    //             }),
    //         };

    //         // 🧾 Save back to localStorage
    //         const finalState = {
    //             ...stored,
    //             applications: payload.applications,
    //         };
    //         localStorage.setItem("applications", JSON.stringify(finalState));

    //         // 🧠 Save to redux (optional)
    //         const activeId = stored.activeId;
    //         if (activeId) {
    //             dispatch(setFormData({ id: activeId, form: payload }));
    //         }

    //         // ✉️ Continue email verification flow
    //         const res = await verifyEmail({ email: values.email }).unwrap();
    //         if (res.status) {
    //             if (res?.message === "Email is already verified.") {
    //                 const response = await createApplication(payload).unwrap();
    //                 if (response?.status && response.data?.redirectURL) {
    //                     window.location.href = response.data.redirectURL;
    //                 }
    //             } else {
    //                 setEmailVerify(true);
    //             }
    //         }
    //     } catch (error: any) {
    //         toast.error(
    //             error?.data?.message || "Something went wrong while creating application"
    //         );
    //     }
    // };

    const handleVerify = async () => {
        const response = await createApplication(payload as ApplicationPayload).unwrap();
        if (response?.status && response.data?.redirectURL) {
            localStorage.removeItem("platformServices");
            window.location.href = response.data.redirectURL;
        } else {
            toast.error("Application created but no redirect URL returned");
        }
    };

    const handleDelete = (id: string) => {
        removeFromPlatformServices(id);
        window.location.reload()
        localStorage.removeItem("platformServices");

    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
            {/* Header */}
            <div className="w-full overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 px-2 sm:px-4 md:px-2">
                    {applications.map((app: any, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setActiveIndex(index);
                                // Each card has its own form.applications[0]

                                const formData = app.form?.applications?.[activeIndex];
                                console.log(formData, "formData")

                                if (formData) {
                                    form.reset(mapApiToForm(formData));
                                }
                            }}
                            className={`min-w-[220px] sm:min-w-[250px] md:min-w-[280px] rounded-2xl shadow-lg p-4 sm:p-5 flex-shrink-0 cursor-pointer transition-transform duration-300 
              ${activeIndex === index
                                    ? "bg-blue-800 scale-105"
                                    : "bg-[#00408D] hover:scale-105"
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                                    {app.name} <br />
                                    <span className="text-xs sm:text-sm font-medium text-white/80">
                                        {app.type || "No "}
                                    </span>
                                </h2>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-1 sm:gap-2 text-black border-black hover:bg-white hover:text-[#00408D] transition"
                                    >
                                        <FileEdit className="w-4 h-4" />
                                    </Button>


                                    <Button
                                        variant="outline"
                                        onClick={() => handleDelete(app.id)}
                                        size="sm"
                                        className="flex items-center gap-1 sm:gap-2 text-black border-black hover:bg-white hover:text-[#00408D] transition"
                                    >
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </div>


                            </div>
                        </div>
                    ))}
                </div>
            </div>



            <h3 className="text-xl font-semibold mb-4 mt-4">Your Information</h3>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-6 px-4 sm:px-6 md:px-8 w-full max-w-full"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John"
                                            {...field}
                                            className="w-full text-sm sm:text-base"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Doe"
                                            {...field}
                                            className="w-full text-sm sm:text-base"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="+91 9876543210"
                                        {...field}
                                        className="w-full text-sm sm:text-base"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="you@example.com"
                                        {...field}
                                        className="w-full text-sm sm:text-base"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="ABC Corp."
                                        {...field}
                                        className="w-full text-sm sm:text-base"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="departureDate"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Departure Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} className="w-full text-sm sm:text-base" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* --- Physical Address --- */}
                    <h4 className="font-semibold mt-4 text-base sm:text-lg border-b pb-2">
                        Physical Address
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Address Fields */}
                        <FormField
                            control={form.control}
                            name="physicalAddress.addressLine1"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Address Line 1</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="123 Main St" className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="physicalAddress.addressLine2"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Address Line 2</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Apt 4B" className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="physicalAddress.city"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="New York" className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="physicalAddress.state"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="NY" className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="physicalAddress.zipCode"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Zip Code</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="10001" className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="physicalAddress.country"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="USA" className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* --- Legal Address --- */}
                    <h4 className="font-semibold mt-4 text-base sm:text-lg border-b pb-2">
                        Current Legal Address
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Legal Address Fields */}
                        <FormField
                            control={form.control}
                            name="currentLegalAddress.addressLine1"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Address Line 1</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="456 Elm St" className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="currentLegalAddress.addressLine2"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Address Line 2</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="" className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="currentLegalAddress.city"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Brooklyn" className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="currentLegalAddress.state"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="NY" className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="currentLegalAddress.zipCode"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Zip Code</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="11201" className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="currentLegalAddress.country"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="USA" className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* --- Buttons --- */}
                    <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
                        <Button
                            type="submit"
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Place Order"}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/")}
                            className="w-full sm:w-auto"
                        >
                            Add Another Traveller
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
            )}        </div>
    );
}
