"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DynamicForm } from "@/components/DynamicForm/DynamicForm";
import { serviceForms } from "@/lib/serviceForms";
import { ApplicationPayload, useCreateApplication2Mutation } from "@/services/applicationApi2";
import { clearPlatformServices } from "@/lib/platformServiceStorage";
import { toast } from "sonner";
import { useVerifyEmailMutation } from "@/services/verifyEmail";
import EmailVerifyDialog from "@/components/StepForm/EmailVerifyDialog";
import { vehicleList } from "@/lib/vehicleList";
import { LoadScript } from "@react-google-maps/api";
import GlobalLoader from "@/components/GlobalLoader";
const libraries: ("places")[] = ["places"];
const formatSlug = (value: string) =>
  value
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, c => c.toUpperCase());

export default function CreateApplication() {
  const params = useSearchParams();
  const type = params.get("type") as keyof typeof serviceForms | null;
  const [createApplication, { isLoading, isError, isSuccess, error }] =
    useCreateApplication2Mutation();
  const [verifyEmail] = useVerifyEmailMutation();
  const [emailOtpVerify, setEmailVerify] = useState(false)
  const [payload, setPayload] = useState<any>()
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const id = params.get("id"); // ✅ query id
  const router = useRouter()


  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 4000); // hide after 4s
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  if (!type || !serviceForms[type]) {
    return (
      <div className="p-6 text-red-600 text-center">
        ❌ Invalid or missing service type
      </div>
    );
  }

  const { schema, fields } = serviceForms[type];

  const handleSubmit = async (values: any) => {

    const payload: any = {
      applications: [
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          countryCode: "+91",
          company: values.company || "",
          status: "Submitted",
          applicationSource: "Website",
          fromCountryId: values.fromCountryId || "68d839b82ea0a4e770b07daf",
          toCountryId: values.toCountryId || "68d839b82ea0a4e770b07daf",
          address: {
            addressLine1: values.senderAddress || "",
            addressLine2: "",
            city: values.citySender || "",
            state: values.stateSender || "",
            zipCode: values.zipCodeSender || "",
            country: values.countrySender || "",
          },
          currentLegalAddress: {
            addressLine1: values.recipientAddress || "",
            addressLine2: "",
            city: values.cityRecipient || "",
            state: values.stateRecipient || "",
            zipCode: values.zipCodeRecipient || "",
            country: values.countryRecipient || "",
          },
          platformServices: [{
            platformServiceId: "68e96935e7bd0d02965600d4",
            platformServiceCategoryId: id ?? "68e968e2e7bd0d029655fa4c",
            platformServiceCategoryPackageAddonsId: [],
            platformServiceCategoryPackageId: "68e968e2e7bd0d029655fa4f"
          }],
          serviceFields: {
            serviceType: values.serviceType || type,
          },
          isSubmittedFromApplication: false,
          isSubmittedFromService: true,


          isOtherServiceWithShipping: type === "courier-and-document-delivery" ? true : false
        },
      ],
    };
    setPayload(payload)
    try {
      const res = await verifyEmail({
        email: values.email
      }).unwrap();

      if (res.status) {
        if (res?.message === "Email is already verified.") {
          const response = await createApplication(payload).unwrap();
          if (response?.status && response.data?.redirectURL) {
            // clearPlatformServices();
            // localStorage.removeItem("applications");
            if (type === "courier-and-document-delivery") {
              window.location.href = response.data.redirectURL;
            } else {
              router.replace("/thank-you")
            }
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
  };

  const handleVerify = async () => {
    const response = await createApplication(payload as ApplicationPayload).unwrap();
    if (response?.status && response.data?.redirectURL) {
      clearPlatformServices();
      localStorage.removeItem("applications");
      if (type === "courier-and-document-delivery") {
        window.location.href = response.data.redirectURL;
      } else {
        router.replace("/thank-you")
      }
    } else {
      toast.error("Application created but no redirect URL returned");
    }
  };

  if (isLoading) {
    return <GlobalLoader text="Submitting your application… Please wait..." show={true} />
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 capitalize">{formatSlug(type)} Form</h1>


      {showAlert && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-800 border border-green-300">
          ✅ Application submitted successfully!
        </div>
      )}

      {type === "vehicle-booking" && (
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-800 mb-3">
            Select Vehicle
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {vehicleList.map((vehicle) => {
              const isSelected = selectedVehicle === vehicle.id;

              return (
                <button
                  key={vehicle.id}
                  type="button"
                  onClick={() => setSelectedVehicle(vehicle.id)}
                  className={`relative overflow-hidden rounded-xl border transition-all
              ${isSelected
                      ? "border-blue-600 ring-2 ring-blue-400"
                      : "border-gray-200 hover:border-blue-400 hover:shadow-md"
                    }
            `}
                >
                  {/* IMAGE CONTAINER */}
                  <div className="h-36 w-full bg-white flex items-center justify-center">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* FOOTER */}
                  <div
                    className={`py-2 text-center font-semibold
                ${isSelected ? "bg-blue-50 text-blue-700" : "bg-gray-50 text-gray-800"}
              `}
                  >
                    {vehicle.name}
                  </div>

                  {/* SELECTED BADGE */}
                  {isSelected && (
                    <span className="absolute top-2 right-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}



      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        libraries={libraries}
      //@ts-ignore
      >      <DynamicForm schema={schema} fields={fields} onSubmit={handleSubmit} serviceType={type} />
      </LoadScript>

      {isLoading && <p className="text-blue-600 mt-2">Submitting...</p>}
      {isError && (() => {
        if (typeof error === "string") return <p className="text-red-600 mt-2">❌ {error}</p>;

        // RTK Query often returns error as { data: {...}, status: number }
        if (typeof error === "object" && error !== null && "data" in error) {
          const e = error as { data?: any }; // narrow to 'any' safely
          return (
            <div className="text-red-600 mt-2">
              ❌ {e.data?.message || "Unknown error"}
              {e.data?.errors && (
                <ul className="ml-4 list-disc">
                  {Object.entries(e.data.errors).map(([field, msg]) => (
                    <li key={field}>
                      {field}: {String(msg)}  {/* Cast unknown to string */}
                    </li>
                  ))}
                </ul>
              )}

            </div>
          );
        }

        return <p className="text-red-600 mt-2">❌ Unknown error</p>;
      })()}
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
