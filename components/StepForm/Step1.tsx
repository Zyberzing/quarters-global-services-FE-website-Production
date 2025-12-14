"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
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
import { useDispatch, useSelector } from "react-redux";
import { setActiveApplication, setFormData } from "@/store/slices/applicationSlice";
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

const getAllStoredApplications = () => {
    const raw = localStorage.getItem("applications");
    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw);
        return parsed?.applications || [];
    } catch {
        return [];
    }
};


// --- Map API response to form values ---
const mapStoredAppToApi = (app: any) => {
    const form = app?.form?.applications?.[0] || {};

    const fullAddress = {
        addressLine1: form.currentLegalAddress?.addressLine1 || "",
        addressLine2: form.currentLegalAddress?.addressLine2 || "",
        city: form.currentLegalAddress?.city || "",
        state: form.currentLegalAddress?.state || "",
        zipCode: form.currentLegalAddress?.zipCode || "",
        country: form.currentLegalAddress?.country || "",
    };

    return {
        firstName: form.firstName || "",
        lastName: form.lastName || "",
        email: form.email || "",
        phone: form.phone || "",
        countryCode: "+1",
        company: form.company || "",
        departureDate: form.departureDate || "",

        status: "Submitted",
        applicationSource: "Website",

        address: fullAddress,
        currentLegalAddress: fullAddress,

        isSubmittedFromApplication: true,
        isSubmittedFromService: false,

        fromCountryId: "68e966dde7bd0d029655d358",
        toCountryId: "68e966dde7bd0d029655d359",

        platformServices: [
            {
                platformServiceId: app.platformServiceId,
                platformServiceCategoryId: app.platformServiceCategoryId,
                platformServiceCategoryPackageId:
                    app.platformServiceCategoryPackageId,
                platformServiceCategoryPackageAddonsId: app.addons || [],
                price: app.price || 0,
                currency: "USD",
                Price_name: app.package,
                additionService: false,
                additionService_price: 0,
                additionService_name: "",
            },
        ],

        serviceFields: {
            serviceType: "CourierDelivery",
        },
    };
};

const mapDraftToForm = (form: any): Step1Data => ({
    firstName: form.firstName || "",
    lastName: form.lastName || "",
    email: form.email || "",
    phone: form.phone || "",
    company: form.company || "",
    departureDate: form.departureDate || "",

    physicalAddress: {
        addressLine1: form.physicalAddress?.addressLine1 || "",
        addressLine2: form.physicalAddress?.addressLine2 || "",
        city: form.physicalAddress?.city || "",
        state: form.physicalAddress?.state || "",
        zipCode: form.physicalAddress?.zipCode || "",
        country: form.physicalAddress?.country || "",
    },

    currentLegalAddress: {
        addressLine1: form.currentLegalAddress?.addressLine1 || "",
        addressLine2: form.currentLegalAddress?.addressLine2 || "",
        city: form.currentLegalAddress?.city || "",
        state: form.currentLegalAddress?.state || "",
        zipCode: form.currentLegalAddress?.zipCode || "",
        country: form.currentLegalAddress?.country || "",
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
    const platformServices = getPlatformServices() || [];
    const [isSwitchingCard, setIsSwitchingCard] = useState(false);

    const activeFormIdRef = useRef<string | null>(null);


    const { draftApplications, activeId } = useSelector(
        (state: any) => state.application
    );


    const form = useForm<Step1Data>({
        resolver: zodResolver(step1Schema),
    });

    const watchedValues = useWatch({
        control: form.control,
    });

    const hasUserTyped =
        watchedValues?.firstName ||
        watchedValues?.lastName ||
        watchedValues?.email ||
        watchedValues?.phone;


    // --- Prefill from API ---
    useEffect(() => {
        if (data?.applications?.length) {
            setApplications(data.applications);
            form.reset(mapStoredAppToApi(data.applications[0]));
            setActiveIndex(0);
        }
    }, [data, form]);

    // --- Prefill from localStorage ---


    const onSubmit = async () => {
        try {
            const storedApps = getAllStoredApplications();

            if (!storedApps.length) {
                toast.error("No applications found");
                return;
            }

            const payload: ApplicationPayload = {
                applications: storedApps.map(mapStoredAppToApi),
            };

            setPayload(payload);

            // verify email using first application
            const email = storedApps[0]?.form?.applications?.[0]?.email;

            const res = await verifyEmail({ email }).unwrap();

            if (res.status) {
                if (res.message === "Email is already verified.") {
                    const response = await createApplication(payload).unwrap();

                    if (response?.status && response.data?.redirectURL) {
                        localStorage.removeItem("platformServices");
                        window.location.href = response.data.redirectURL;
                    }
                } else {
                    setEmailVerify(true);
                }
            }
        } catch (err: any) {
            toast.error(err?.message || "Submission failed");
        }
    };


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

    useEffect(() => {
        if (!activeId || !draftApplications?.length) return;

        const activeApp = draftApplications.find(
            (app: any) => app.id === activeId
        );

        const formData = activeApp?.form?.applications?.[0];

        if (formData) {
            form.reset(mapDraftToForm(formData));
        }
    }, [activeId, draftApplications, form]);


    useEffect(() => {
        if (!activeId || !draftApplications.length) return;

        const index = draftApplications.findIndex(
            (a: any) => a.id === activeId
        );

        if (index !== -1) {
            setActiveIndex(index);
        }
    }, [activeId, draftApplications]);


    useEffect(() => {
        if (!activeId) return;
        if (isSwitchingCard) return;
        if (!hasUserTyped) return;

        const timeout = setTimeout(() => {
            dispatch(
                setFormData({
                    id: activeId,
                    form: {
                        applications: [{ ...watchedValues }],
                    },
                })
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [watchedValues, activeId]);


    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
            {/* Header */}
            <div className="w-full overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 px-2 sm:px-4 md:px-2">
                    {draftApplications.map((app: any, index: number) => (
                        <div
                            key={index}
                            onClick={() => {
                                setIsSwitchingCard(true);

                                // 1️⃣ update refs FIRST
                                activeFormIdRef.current = app.id;

                                // 2️⃣ update redux active id
                                dispatch(setActiveApplication(app.id));
                                setActiveIndex(index);

                                // 3️⃣ reset form ONLY with this card data
                                const formData = app.form?.applications?.[0];
                                form.reset(mapDraftToForm(formData || {}), {
                                    keepDirty: false,
                                    keepTouched: false,
                                });

                                // 4️⃣ allow autosave AFTER reset completes
                                setTimeout(() => {
                                    setIsSwitchingCard(false);
                                }, 50);
                            }}


                            className={`min-w-[220px] sm:min-w-[250px] md:min-w-[280px]
  rounded-2xl shadow-lg p-4 sm:p-5 flex-shrink-0 cursor-pointer
  transition-all duration-300
  ${activeIndex === index
                                    ? "bg-red-800 scale-105 shadow-xl ring-2 ring-red-500"
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
                    className="grid gap-6 w-full max-w-full"
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
