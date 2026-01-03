"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { clearPlatformServices } from "@/lib/platformServiceStorage";
import { useSearchParams } from "next/navigation";

export default function OrderSummaryPage() {
  const [useDifferentAddress, setUseDifferentAddress] = useState(false);
  const [agree, setAgree] = useState(false);

  const [shippingData, setShippingData] = useState<Record<string, any[]>>({});
  const [selectedCarrier, setSelectedCarrier] = useState<string>("");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedPackage, setSelectedPackage] = useState<string>("");

  const [quote, setQuote] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();

  const applicationIdsParam = searchParams.get("applicationIds");
  const tokenParam = searchParams.get("token");

  // Convert applicationIds to array
  const applicationIds = applicationIdsParam
    ? applicationIdsParam.split(",")
    : [];

  // Decode token (Bearer ...)
  const token = tokenParam ? decodeURIComponent(tokenParam) : "";


  // User input for address
  const [sender,] = useState({
    name: "John Doe",
    company: "JD Services",
    address1: "2427 FM 1092 RD",
    address2: "Suite A",
    city: "Missouri City",
    state: "TX",
    zip: "77477",
    country: "US",
    phone: "+1-713-534-1245",
    email: "john.doe@example.com",
  });

  const API_BASE = process.env.NEXT_PUBLIC_QUARTUS_API_URL;

  // ✅ Fetch shipping services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/application-shipping/get-shipping-services`
        );
        const data = res.data?.data || res.data || {};
        setShippingData(data);
        localStorage.setItem("shippingServices", JSON.stringify(data));
      } catch (error) {
        console.error("❌ Error fetching services:", error);
      }
    };
    fetchServices();
  }, [API_BASE]);

  // ✅ Select carrier/service
  // ✅ Select carrier/service (Fixed)
  const handleSelectService = (carrier: string, service: any) => {
    // Normalize carrier (map dhlecommerce → dhl)
    const normalizedCarrier =
      carrier === "dhlecommerce" ? "dhl" : carrier;

    setSelectedCarrier(normalizedCarrier);
    setSelectedService(service);
    setSelectedPackage("");

    console.log("✅ Selected Carrier:", normalizedCarrier);
    console.log("✅ Selected Service:", service);
  };


  // ✅ Select package type
  const handleSelectPackage = (pkgCode: string) => {
    setSelectedPackage(pkgCode);
  };

  // ✅ Get Quote (optional)
  const getQuote = async () => {
    try {
      const payload = {
        carrierCode: selectedCarrier,
        serviceCode: selectedService.serviceCode,
        packageTypeCode: selectedPackage,
        sender: { country: "US", zip: "77002" },
      };

      const res = await axios.post(
        `${API_BASE}/application-shipping/get-shipping-quote`,
        payload
      );

      console.log(res.data?.data, "resssss")
      setQuote(res.data?.data || res.data);
      localStorage.setItem("shippingQuote", JSON.stringify(res.data));
    } catch (err) {
      console.error("❌ Quote Error:", err);
    }
  };

  // ✅ Submit Final Shipping (Place Order)
  const handlePlaceOrder = async () => {
    if (!agree) {
      alert("Please agree to the Terms of Use before placing order.");
      return;
    }
    if (!selectedCarrier || !selectedPackage) {
      alert("Please select a carrier and package before placing order.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        applicationIds, // ✅ dynamic from URL
        carrierCode: selectedCarrier,
        packageTypeCode: selectedPackage,
        totalAmount: Number(quote?.totalAmount || 0),
        sender,
      };


      const res = await axios.post(
        `${API_BASE}/application-shipping/create-application-shipping`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Application shipping created:", res.data);
      localStorage.setItem("applicationShipping", JSON.stringify(res.data));

      // ✅ Extract redirect URL (Stripe Checkout)
      const redirectURL =
        res.data?.data?.checkoutSession?.redirectURL ||
        res.data?.data?.checkoutSession?.session?.url;

      if (redirectURL) {
        clearPlatformServices();
        localStorage.removeItem("applicationStatus")
        localStorage.removeItem("applications")
        window.location.href = redirectURL; // 🔁 Redirect to Stripe Checkout
      } else {
        alert("✅ Shipping created, but no redirect URL found.");
      }
    } catch (err) {
      console.error("❌ Error creating application shipping:", err);
      alert("❌ Failed to create application shipping.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-blue-900">
            Shipping Selection
          </h2>

          {/* 🚚 Shipping List */}
          {Object.entries(shippingData).map(([carrier, services]) => {
            const upsGround = services.find(
              (srv: any) => srv.serviceLabel === "UPS® Ground"
            );

            if (!upsGround) return null;

            const isSelected =
              selectedService?.serviceCode === upsGround.serviceCode;

            return (
              <div key={carrier} className="mb-4">
                <h4 className="font-semibold capitalize text-gray-800 mb-2">
                  {carrier}
                </h4>

                <button
                  onClick={() => handleSelectService(carrier, upsGround)}
                  className={`
          w-full px-4 py-3 rounded-md text-sm font-medium border
          transition-all duration-200
          ${isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50"
                    }
        `}
                >
                  UPS® Ground
                </button>
              </div>
            );
          })}

          {/* 📦 Package Selector */}
          {selectedService && (
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">
                Select Package Type:
              </label>
              <select
                value={selectedPackage}
                onChange={(e) => handleSelectPackage(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="">-- Select Package --</option>
                {selectedService.packageTypes?.map((pkg: any) => (
                  <option key={pkg.packageTypeCode} value={pkg.packageTypeCode}>
                    {pkg.packageTypeLabel}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 💰 Get Quote Button */}
          {selectedPackage && (
            <Button onClick={getQuote} className="bg-blue-600 text-white mt-3">
              Get Shipping Quote
            </Button>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Billing Address
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="address"
                  checked={!useDifferentAddress}
                  onChange={() => setUseDifferentAddress(false)}
                  className="accent-blue-600"
                />
                <span className="text-sm text-gray-700">
                  Bill to this Address:
                </span>
              </label>
              <div className="pl-6 text-sm text-gray-700">
                <p>Carlos Sebastian</p>
                <p>47 Main Street, New York, NY 10011</p>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="address"
                  checked={useDifferentAddress}
                  onChange={() => setUseDifferentAddress(true)}
                  className="accent-blue-600"
                />
                <span className="text-sm text-gray-700">
                  Use Different Address
                </span>
              </label>
            </div>
            {useDifferentAddress && (
              <div className="mt-4 space-y-3 pl-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </div>
            )}
          </div>
          {/* ✅ Agreement */}
          <div className="mt-6 flex items-start gap-2">
            <Checkbox
              checked={agree}
              onCheckedChange={(v) => setAgree(!!v)}
              id="agree"
            />
            <label htmlFor="agree" className="text-sm text-gray-700">
              I acknowledge that I have reviewed and agree with the{" "}
              <a href="/terms-and-condition" className="text-blue-600 underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="/privacy-policy" className="text-blue-600 underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>

          {/* 🚀 Place Order */}
          <div className="mt-6 flex gap-3">
            <Button variant="outline" className="border-blue-500 text-blue-600">
              ← Back to Traveler Info
            </Button>
            <Button
              onClick={handlePlaceOrder}
              disabled={!agree || isSubmitting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isSubmitting ? "Processing..." : "Place Order →"}
            </Button>
          </div>
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 h-fit shadow-sm">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Order Summary
          </h3>

          <ul className="text-sm text-gray-700 space-y-2">


            {quote && (
              <>
                <li className="flex justify-between text-blue-800">
                  <span>Base Shipping Cost</span>
                  <span>${Number(quote?.baseShippingCost || 0).toFixed(2)}</span>
                </li>
                <li className="flex justify-between text-blue-800">
                  <span>Application Charge</span>
                  <span>${Number(quote?.applicationCharge || 0).toFixed(2)}</span>
                </li>
              </>
            )}
          </ul>

          <hr className="my-4 border-gray-300" />

          <div className="flex justify-between font-semibold text-gray-900">
            <span>Total</span>
            <span>
              $
              {quote?.totalAmount}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
