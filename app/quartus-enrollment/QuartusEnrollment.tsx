"use client";

import EmailVerifyDialog from "@/components/StepForm/EmailVerifyDialog";
import { useVerifyEmailMutation } from "@/services/verifyEmail";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
type FormErrors = Partial<Record<keyof FormState, string>>;

type FormState = {
  fullName: string;
  dob: string;
  phone: string;
  email: string;
  homeAddress: string;
  businessName: string;
  businessPhone: string;
  businessEmail: string;
  officeAddress: string;
  businessType: string[];
  ptin: string;
  efin: string;
  efinStatus: string;
  services: string[];
  experience: string;
  expectedVolume: string;
  preferredSoftware: string;
  additionalInfo: string;
  signature: string;
};

const initialState: FormState = {
  fullName: "",
  dob: "",
  phone: "",
  email: "",
  homeAddress: "",
  businessName: "",
  businessPhone: "",
  businessEmail: "",
  officeAddress: "",
  businessType: [],
  ptin: "",
  efin: "",
  efinStatus: "",
  services: [],
  experience: "",
  expectedVolume: "",
  preferredSoftware: "",
  additionalInfo: "",
  signature: "",
};

export default function QuartusEnrollmentPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [payload, setPayload] = useState<any>()
  const [errors, setErrors] = useState<FormErrors>({});

  const [verifyEmail] = useVerifyEmailMutation();
  const [emailOtpVerify, setEmailVerify] = useState(false)

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }


  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    // Personal
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.dob) newErrors.dob = "Date of birth is required";

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.homeAddress.trim()) newErrors.homeAddress = "Home address is required";

    // Business
    if (!form.businessName.trim()) newErrors.businessName = "Business name is required";
    if (!form.businessPhone.trim()) newErrors.businessPhone = "Business phone is required";
    if (!form.businessEmail.trim())
      newErrors.businessEmail = "Business Email is required"; if (!form.officeAddress.trim()) newErrors.officeAddress = "Office address is required";

    if (form.businessType.length === 0) {
      newErrors.businessType = "Select at least one business type";
    }

    // Credentials
    if (!form.efinStatus) newErrors.efinStatus = "EFIN status is required";

    // Services
    if (form.services.length === 0) {
      newErrors.services = "Select at least one service";
    }

    // Experience & preferences
    if (!form.experience) newErrors.experience = "Select experience level";
    if (!form.expectedVolume) newErrors.expectedVolume = "Select expected volume";
    if (!form.preferredSoftware) newErrors.preferredSoftware = "Select software preference";

    // Agreement
    if (!form.signature.trim()) newErrors.signature = "Signature is required";

    if (!form.additionalInfo.trim()) {
      newErrors.additionalInfo = "Additional information is required";
    }

    if (!form.ptin.trim()) {
      newErrors.ptin = "PTIN number is required";
    }

    if (!form.efinStatus) {
      newErrors.efinStatus = "EFIN status is required";
    }


    if (!form.efin.trim()) {
      newErrors.efin = "EFIN number is required";
    } else if (!/^\d{6}$/.test(form.efin)) {
      newErrors.efin = "EFIN must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function toggleArrayField(field: keyof FormState, value: string) {
    const arr = (form[field] as unknown as string[]) || [];
    if (arr.includes(value)) {
      handleChange(field as any, arr.filter((x) => x !== value) as any);
    } else {
      handleChange(field as any, [...arr, value] as any);
    }
  }
  const searchParams = useSearchParams();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const selectedPackage = searchParams.get("package");

    const payload = {
      firstName: form.fullName.split(" ")[0] || "",
      lastName: form.fullName.split(" ")[0] || "",
      dateOfBirth: form.dob,
      countryCode: "+1",
      phone: form.phone,
      email: form.email,
      homeAddress: form.homeAddress,

      businessName: form.businessName,
      businessPhone: form.businessPhone,
      businessEmail: form.businessEmail,
      officeAddress: form.officeAddress,
      businessType: form.businessType.join(", "),

      ptinNumber: form.ptin,
      efinNumber: form.efin,
      efinStatus: form.efinStatus,

      enrolledServices: form.services,
      experienceLevel: form.experience,
      expectedVolume: form.expectedVolume,
      softwarePreference: form.preferredSoftware,

      description: form.additionalInfo,

      agreementName: form.fullName,
      agreementSignature: form.signature,
      agreementDate: new Date().toISOString().slice(0, 10),

      selectedPackage: selectedPackage ?? "",
    };
    setPayload(payload)

    const res = await verifyEmail({ email: form.email }).unwrap();

    if (res.status) {

      if (res.message === "Email is already verified.") {
        const base = process.env.NEXT_PUBLIC_QUARTUS_API_URL;
        const response = await fetch(`${base}/tax-bureau`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to submit");
        }

        const result = await response.json();

        if (result?.data?.redirectURL) {
          setForm(initialState);
          window.location.href = result.data.redirectURL;
          return;
        }
      } else {
        setEmailVerify(true);
      }

    }

  }

  const handleVerify = async () => {
    try {
      const base = process.env.NEXT_PUBLIC_QUARTUS_API_URL;
      const response = await fetch(`${base}/tax-bureau`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      const result = await response.json();

      if (result?.data?.redirectURL) {
        setForm(initialState);
        window.location.href = result.data.redirectURL;
        return;
      }
    } catch (err) {
      toast.error("Submit failed — please try again.");
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="rounded-lg overflow-hidden shadow">
          <div className="p-6 bg-[#E7000B] text-white">
            <h1 className="text-2xl font-semibold">Quartus Tax Service Bureau</h1>
            <p className="mt-1 text-sm opacity-90">Partner Enrollment & Interest Form</p>
          </div>
          <div className="p-6 bg-white">
            <p className="text-sm text-gray-700">
              Thank you for your interest in joining Quartus Tax Service Bureau. Please complete the
              form below so we can set up your software, bank products, and onboarding package.
            </p>
          </div>
        </header>

        <form onSubmit={onSubmit} className="mt-6 bg-white p-6 rounded-lg shadow-sm">
          {/* 1. Personal Information */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">1. Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <label className="block">
                <span className="text-sm text-gray-700">Full Name</span>
                <input
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                  required
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                )}
              </label>

              <label className="block">
                <span className="text-sm text-gray-700">Date of Birth</span>

                <input
                  type="date"
                  max={new Date().toISOString().split("T")[0]} // ❌ future dates disabled
                  value={form.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 bg-white
      hover:border-[#E7000B]/50 transition-all duration-200
      focus:ring-2 focus:ring-[#E7000B]"
                />
                {errors.dob && (
                  <p className="mt-1 text-xs text-red-600">{errors.dob}</p>
                )}
              </label>


              <label className="block">
                <span className="text-sm text-gray-700">Phone Number</span>

                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  minLength={10}
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    handleChange("phone", value);
                  }}
                  placeholder="Enter 10 digit number"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 bg-white
      hover:border-[#E7000B]/50 transition-all duration-200
      focus:ring-2 focus:ring-[#E7000B]"
                />

                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                )}
              </label>


              <label className="block">
                <span className="text-sm text-gray-700">Email Address</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />

                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm text-gray-700">Home Address</span>
                <input
                  value={form.homeAddress}
                  onChange={(e) => handleChange("homeAddress", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />

                {errors.homeAddress && (
                  <p className="mt-1 text-xs text-red-600">{errors.homeAddress}</p>
                )}
              </label>
            </div>
          </section>

          {/* 2. Business Information */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">2. Business Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <label className="block md:col-span-2">
                <span className="text-sm text-gray-700">Business / Office Name</span>
                <input
                  value={form.businessName}
                  onChange={(e) => handleChange("businessName", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />

                {errors.businessName && (
                  <p className="mt-1 text-xs text-red-600">{errors.businessName}</p>
                )}
              </label>

              <label className="block">
                <span className="text-sm text-gray-700">Business Phone Number</span>

                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  minLength={10}
                  maxLength={10}
                  placeholder="Enter 10 digit business number"
                  value={form.businessPhone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    handleChange("businessPhone", value);
                  }}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 bg-white
      hover:border-[#E7000B]/50 transition-all duration-200
      focus:ring-2 focus:ring-[#E7000B]"
                />

                {errors.businessPhone && (
                  <p className="mt-1 text-xs text-red-600">{errors.businessPhone}</p>
                )}
              </label>


              <label className="block">
                <span className="text-sm text-gray-700">Business Email (if different)</span>
                <input
                  type="email"
                  value={form.businessEmail}
                  onChange={(e) => handleChange("businessEmail", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />

                {errors.businessEmail && (
                  <p className="mt-1 text-xs text-red-600">{errors.businessEmail}</p>
                )}
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm text-gray-700">Office Address</span>
                <input
                  value={form.officeAddress}
                  onChange={(e) => handleChange("officeAddress", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />

                {errors.officeAddress && (
                  <p className="mt-1 text-xs text-red-600">{errors.officeAddress}</p>
                )}
              </label>

              <div className="md:col-span-2">
                <span className="text-sm text-gray-700">Business Type (check one)</span>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "New Tax Office",
                    "Existing Office Switching Bureaus",
                    "Insurance / Real Estate / Other Business Adding Tax Services",
                    "Independent Preparer (Home-Based)",
                  ].map((bt) => (
                    <label key={bt} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={form.businessType.includes(bt)}
                        onChange={() => toggleArrayField("businessType", bt)}
                        className="rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{bt}</span>
                    </label>
                  ))}

                  {errors.businessType && (
                    <p className="mt-1 text-xs text-red-600">{errors.businessType}</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* 3. Tax Credentials */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">3. Tax Credentials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <label className="block md:col-span-1">
                <span className="text-sm text-gray-700">PTIN Number (if available)</span>
                <input
                  value={form.ptin}
                  onChange={(e) => handleChange("ptin", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />

                {errors.ptin && (
                  <p className="mt-1 text-xs text-red-600">{errors.ptin}</p>
                )}
              </label>

              <label className="block md:col-span-1">
                <span className="text-sm text-gray-700">EFIN Number (if available)</span>
                <input
                  value={form.efin}
                  type="number"
                  onChange={(e) => handleChange("efin", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />

                {errors.efin && (
                  <p className="mt-1 text-xs text-red-600">{errors.efin}</p>
                )}
              </label>

              <div className="md:col-span-1">
                <span className="text-sm text-gray-700">EFIN Status</span>
                <div className="mt-2 space-y-2">
                  {["Approved", "Pending", "Need Assistance with Application"].map((s) => (
                    <label key={s} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="efinStatus"
                        checked={form.efinStatus === s}
                        onChange={() => handleChange("efinStatus", s)}
                        className="rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{s}</span>
                    </label>
                  ))}
                  {errors.efinStatus && (
                    <p className="mt-1 text-xs text-red-600">{errors.efinStatus}</p>
                  )}

                </div>
              </div>
            </div>
          </section>

          {/* 4. Services */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">4. Services You Want to Enroll In</h2>
            <p className="text-sm text-gray-500">(Check all that apply)</p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Tax Software (Cloud/Desktop)",
                "Bank Products (Refund Transfer, Advances)",
                "Training & Certification",
                "Office Setup Assistance",
                "Pricing & Business Strategy",
                "Marketing Materials (Flyers, Cards, Social Media)",
                "Complete 'Start Your Own Tax Office' Program",
              ].map((s) => (
                <label key={s} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={form.services.includes(s)}
                    onChange={() => toggleArrayField("services", s)}
                    className="rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{s}</span>
                </label>
              ))}
              {errors.services && (
                <p className="mt-2 text-xs text-red-600">{errors.services}</p>
              )}

            </div>
            <p className="mt-2 text-xs text-gray-500">*Bank products subject to approval.</p>
          </section>

          {/* 5. Experience Level */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">5. Experience Level</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {["No Experience - Need Full Training", "Beginner (1–2 years)", "Intermediate (3–5 years)", "Advanced (5+ years)", "CPA/Professional Accountant"].map((exp) => (
                <label key={exp} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="experience"
                    checked={form.experience === exp}
                    onChange={() => handleChange("experience", exp)}
                    className="rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{exp}</span>
                </label>
              ))}
              {errors.experience && (
                <p className="mt-2 text-xs text-red-600">{errors.experience}</p>
              )}

            </div>
          </section>

          {/* 6. Expected Volume */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">6. Expected Volume</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {["0–50", "50–150", "150–300", "300+"].map((vol) => (
                <label key={vol} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="expectedVolume"
                    checked={form.expectedVolume === vol}
                    onChange={() => handleChange("expectedVolume", vol)}
                    className="rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{vol}</span>
                </label>
              ))}
              {errors.expectedVolume && (
                <p className="mt-2 text-xs text-red-600">{errors.expectedVolume}</p>
              )}

            </div>
          </section>

          {/* 7. Preferred Software Type */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">7. Preferred Software Type</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {["Cloud-Based (Online)", "Desktop Software", "Not Sure - Need Recommendation"].map((s) => (
                <label key={s} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="preferredSoftware"
                    checked={form.preferredSoftware === s}
                    onChange={() => handleChange("preferredSoftware", s)}
                    className="rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{s}</span>
                </label>
              ))}
              {errors.preferredSoftware && (
                <p className="mt-2 text-xs text-red-600">{errors.preferredSoftware}</p>
              )}

            </div>
          </section>

          {/* 8. Additional Information */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">8. Additional Information</h2>
            <p className="text-sm text-gray-500">Please describe your goals or questions:</p>
            <textarea
              value={form.additionalInfo}
              onChange={(e) => handleChange("additionalInfo", e.target.value)}
              rows={4}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
            />

            {errors.additionalInfo && (
              <p className="mt-1 text-xs text-red-600">{errors.additionalInfo}</p>
            )}
          </section>

          {/* 9. Agreement & Signature */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">9. Agreement & Signature</h2>
            <p className="text-sm text-gray-700 mt-2">
              I certify that the information provided is accurate and I am requesting enrollment with
              Quartus Tax Service Bureau.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <label className="block md:col-span-1">
                <span className="text-sm text-gray-700">Name</span>
                <input
                  value={form.fullName || form.signature}
                  onChange={(e) => handleChange("signature", e.target.value)}
                  placeholder="Type your full name as signature"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />

                {errors.signature && (
                  <p className="mt-1 text-xs text-red-600">{errors.signature}</p>
                )}
              </label>

              <label className="block md:col-span-1">
                <span className="text-sm text-gray-700">Signature</span>
                <input
                  value={form.signature}
                  onChange={(e) => handleChange("signature", e.target.value)}
                  placeholder="Signature"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />
              </label>

              <label className="block md:col-span-1">
                <span className="text-sm text-gray-700">Date</span>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />


              </label>
            </div>
          </section>

          {/* 10. Submit */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600">You may submit the completed form to:</p>
              <p className="text-sm mt-1">📧 info@quartusbusiness.com</p>
              <p className="text-sm">📞 +1 (832) 621-9671</p>
              <p className="text-sm">📍 2427 FM 1092 Rd, Unit A, Missouri City, TX 77459</p>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#E7000B] text-white px-5 py-2 rounded-md shadow hover:opacity-95 focus:ring-2 focus:ring-offset-2 focus:ring-[#E7000B]"
            >
              Submit Form
            </button>
          </div>

          {submitted && (
            <div className="mt-4 p-3 rounded bg-green-50 text-green-800 text-sm">
              Form prepared. Your default mail client should open to send the details. If it did not,
              copy the details and email to <strong>info@quartusbusiness.com</strong>.
            </div>
          )}
        </form>

        <footer className="mt-6 text-center text-xs text-gray-500">
          <p>Quartus Tax Service Bureau — Enrollment & Interest Form</p>
        </footer>
      </div>
      {emailOtpVerify && (
        <EmailVerifyDialog
          email={payload.email}
          handleSubmite={handleVerify}
          onClose={() => setEmailVerify(false)}
          emailOtpVerify={emailOtpVerify}
        />
      )}
    </div>
  );
}