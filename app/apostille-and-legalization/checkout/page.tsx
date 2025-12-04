"use client";
import EmailVerifyDialog from "@/components/StepForm/EmailVerifyDialog";
import { clearPlatformServices } from "@/lib/platformServiceStorage";
import { useCreateApplicationMutation } from "@/services/applicationApi";
import { useVerifyEmailMutation } from "@/services/verifyEmail";
import { setFormData } from "@/store/slices/applicationSlice";
import { store } from "@/store/store";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function GetStartedSection() {
  const [country, setCountry] = useState("");
  const [scannedCopy, setScannedCopy] = useState("Yes");
  const [translation, setTranslation] = useState("Yes");
  const [verifyEmail] = useVerifyEmailMutation();
  const [createApplication, { isLoading }] = useCreateApplicationMutation();
  const dispatch = useDispatch();
  const [emailOtpVerify, setEmailVerify] = useState(false);
  console.log(emailOtpVerify, "emailOtpVerify")
  const [payload, setPayload] = useState<any>(null);

  // basic form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
  });

  const countries = ["USA", "Canada", "UK", "Australia", "India"];
  const languages = ["Spanish", "French", "German", "Hindi", "Arabic"];
  const pageTypes = ["1-5 pages", "6-10 pages", "11-20 pages"];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    try {

      const payload = {
        applications: [
          {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            countryCode: "+1",
            company: form.company || "",
            status: "Submitted",
            applicationSource: "Website",
            fromCountryId: "68d839b82ea0a4e770b07daf",
            toCountryId: "68d839b82ea0a4e770b07daf",
            platformServices: [{
              platformServiceId: "68e968e1e7bd0d029655fa49",
              platformServiceCategoryId: "68e968e2e7bd0d029655fa4c",
              platformServiceCategoryPackageAddonsId: [],
              platformServiceCategoryPackageId: "68e968e2e7bd0d029655fa4f"
            }],
            serviceFields: {
              serviceType: "CourierDelivery",
              country,
              scannedCopy,
              translation,
            },
          },
        ],
      };

      const activeId = store.getState().application.activeId;
      if (activeId) {
        dispatch(setFormData({ id: activeId, form: payload }));
      }

      setPayload(payload);

      try {
        const res = await verifyEmail({
          email: form.email
        }).unwrap();
        if (res.status) {

          if (res?.message === "Email is already verified.") {
            const response = await createApplication(payload as any).unwrap();
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

  const handleVerify = async () => {
    try {
      const response = await createApplication(payload as any).unwrap();
      if (response?.status && response.data?.redirectURL) {
        clearPlatformServices();
        localStorage.removeItem("applications");
        window.location.href = response.data.redirectURL;
      } else {
        toast.error("Application created but no redirect URL returned");
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to create application after verification");
    }
  };

  return (
    <section className="bg-white py-16 px-6 sm:px-10 lg:px-20">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* LEFT SIDE FORM */}
        <div>
          <h2 className="text-blue-700 font-semibold mb-4">Get Started</h2>

          {/* BASIC INFO */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              name="firstName"
              placeholder="First Name *"
              value={form.firstName}
              onChange={onChange}
              className="border rounded-md p-3 w-full focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name *"
              value={form.lastName}
              onChange={onChange}
              className="border rounded-md p-3 w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={form.email}
              onChange={onChange}
              className="border rounded-md p-3 w-full focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone *"
              value={form.phone}
              onChange={onChange}
              className="border rounded-md p-3 w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <input
              type="text"
              name="company"
              placeholder="Company (optional)"
              value={form.company}
              onChange={onChange}
              className="border rounded-md p-3 w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Country */}
          <div className="mb-6">
            <label className="block text-gray-800 font-medium mb-2">
              1. Which country are the documents intended for?
            </label>
            <select
              title="sass"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Scanned Copy */}
          <div className="mb-6">
            <p className="text-gray-800 font-medium mb-2">
              2. Do you want a scanned copy of your authenticated documents?
            </p>
            <div className="flex gap-6 mt-2">
              {["Yes", "No"].map((val) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="scannedCopy"
                    checked={scannedCopy === val}
                    onChange={() => setScannedCopy(val)}
                    className="accent-blue-600"
                  />
                  <span>{val}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Translation */}
          <div className="mb-6">
            <p className="text-gray-800 font-medium mb-2">
              3. Do you need your documents translated?
            </p>
            <div className="flex gap-6 mt-2">
              {["Yes", "No"].map((val) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="translation"
                    checked={translation === val}
                    onChange={() => setTranslation(val)}
                    className="accent-blue-600"
                  />
                  <span>{val}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Translation fields */}
          {translation === "Yes" && (
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-800 mb-2 text-sm">
                  What Language?
                </label>
                <select title="sss" className="w-full border rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500">
                  <option value="">Select</option>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-800 mb-2 text-sm">
                  How many Pages
                </label>
                <select title="sss" className="w-full border rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500">
                  <option value="">Type</option>
                  {pageTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-all font-medium"
          >
            {isLoading ? "Please wait..." : "Continue"} <FaArrowRight className="text-sm" />
          </button>
        </div>

        {/* RIGHT INFO CARD */}
        <div className="bg-white border rounded-2xl shadow-md p-8">
          <div className="w-16 h-16 mx-auto lg:mx-0 mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2h6v2m-6-4v-4h6v4m3-6H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2z"
              />
            </svg>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            What is <span className="text-gray-700">Document Authentication?</span>
          </h3>

          <p className="text-gray-600 leading-relaxed mb-3">
            Document authentication ensures the validity and acceptance of your legal documents abroad.
          </p>
          <p className="text-gray-600 leading-relaxed">
            It involves obtaining an <span className="font-semibold">apostille</span> or certification from the appropriate authority.
          </p>
        </div>
      </div>

      {emailOtpVerify && (
        <EmailVerifyDialog
          email={payload?.applications[0]?.email ?? ""}
          handleSubmite={handleVerify}
          onClose={() => setEmailVerify(false)} // ✅ correct prop name
          emailOtpVerify={emailOtpVerify}       // ✅ now valid
        />
      )}

    </section>
  );
}
