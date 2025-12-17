"use client";

import React, { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step3 from "./Step3";
import Image from "next/image";
import { getPlatformServices } from "@/lib/platformServiceStorage";
import { useSelector } from "react-redux";
import Link from "next/link";
import OrderSummary from "./OrderSummary";

const steps = [
  { id: 1, label: "Traveler Info" },
  { id: 2, label: "Shipping/Billing" },
  { id: 3, label: "Order Confirmation" },
  { id: 4, label: "Thank You" },
];



const MultiStepForm = () => {
  const [step] = useState(1);

  //  Dynamic values
  const [, setPrices] = useState<number[]>([]);
  const [currency, setCurrency] = useState<string>("USD");
  const [total, setTotal] = useState<number>(0);
  const { activeId } = useSelector((state: any) => state.application);
  const [, setNames] = useState<string[]>([]);



  

  useEffect(() => {
    const stored = getPlatformServices();

    if (stored && stored.length > 0) {
      //  Separate by type
      const mainServices = stored.filter(
        (s) => !s.additionService && Number(s.price) > 0
      );
      const addOnServices = stored.filter(
        (s) => s.additionService && Number(s.additionService_price) > 0
      );

      //  Extract name + price arrays
      const mainNames = mainServices.map((s) => s.Price_name || "Unnamed Service");
      const mainPrices = mainServices.map((s) => Number(s.price));

      const addOnNames = addOnServices.map(
        (s) => s.additionService_name || "Additional Service"
      );
      const addOnPrices = addOnServices.map((s) =>
        Number(s.additionService_price)
      );

      const curr =
        mainServices[0]?.currency ||
        addOnServices[0]?.currency ||
        "USD";

      //  Save states
      setCurrency(curr);
      setPrices([...mainPrices, ...addOnPrices]);
      setNames([...mainNames, ...addOnNames]);

      //  Totals
      const totalDynamic =
        mainPrices.reduce((a, b) => a + b, 0) +
        addOnPrices.reduce((a, b) => a + b, 0);

      const totalValue =
        totalDynamic;

      setTotal(totalValue);
    }
  }, [activeId]);



  return (
    <div className="w-full mx-auto">
      {/* Step Indicator */}
      <div className="bg-[#96C6FF] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white text-center mb-10">
            Checkout
          </h1>

          <div className="relative flex items-center justify-between">
            {/* Animated Connector */}
            <div className="absolute top-5 left-1/12 w-[80%] h-1 bg-[#00408D] rounded-full overflow-hidden">
              <div
                className="h-1 bg-red-600 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 150}%` }}
              ></div>
            </div>

            {/* Step Circles */}
            {steps.slice(0, 3).map((s) => {
              const isActive = step === s.id;
              const isCompleted = step > s.id;

              return (
                <div
                  key={s.id}
                  className="flex flex-col items-center relative z-10"
                  style={{ width: "20.333%" }}
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold transition-all duration-300
                    ${isActive
                        ? "bg-red-600 text-white scale-110 shadow-lg"
                        : isCompleted
                          ? "bg-white border-2 border-red-600 text-red-600"
                          : "bg-white border-2 border-[#00408D] text-[#00408D]"
                      }`}
                  >
                    {s.id}
                  </div>
                  <div
                    className={`mt-3 text-center font-medium text-sm transition-colors duration-300
                    ${isActive
                        ? "text-white"
                        : isCompleted
                          ? "text-red-600"
                          : "text-[#00408D]"
                      }`}
                  >
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Conditional Layout */}
      {step === 4 ? (
        <div className="max-w-3xl mx-auto text-center bg-white p-12 rounded-lg shadow-lg relative">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Thank you for your order!
          </h2>
          <p className="text-gray-700">
            Your order has been successfully processed. A confirmation email has
            been sent to you.
          </p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:justify-between md:justify-center mt-6">

          {/* Form Steps */}
          <div className={`${step === 3 ? "w-full" : "w-full lg:w-1/2"} lg:ml-4`}>
            {step === 1 && <Step1 />}
            {step === 3 && <Step3 />}
          </div>

          {/* Order Summary */}
         <OrderSummary step={step}/>

        </div>

      )}
    </div>
  );
};

export default MultiStepForm;
