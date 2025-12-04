"use client";

import React, { JSX } from "react";
import { FaFileAlt, FaCloudUploadAlt, FaIdBadge, FaFlag } from "react-icons/fa";

interface Step {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  circleColor: string;
  icon: JSX.Element;
}

const StepFlow: React.FC = () => {
  const steps: Step[] = [
    {
      id: 1,
      title: "File a Report",
      subtitle: "Step 1:",
      description: "We help you file a theft report with proper authorities.",
      icon: <FaFileAlt size={32} />,
      color: "bg-blue-100 border-blue-400 text-blue-700",
      circleColor: "bg-blue-200",
    },
    {
      id: 2,
      title: "Prepare Application",
      subtitle: "Step 2:",
      description:
        "Fill DS-64 (lost/stolen) and DS-11 with required documents.",
      icon: <FaCloudUploadAlt size={32} />,
      color: "bg-rose-100 border-rose-400 text-rose-700",
      circleColor: "bg-rose-200",
    },
    {
      id: 3,
      title: "Identity Verification",
      subtitle: "Step 3:",
      description: "We assist in verifying your identity securely.",
      icon: <FaIdBadge size={32} />,
      color: "bg-blue-100 border-blue-400 text-blue-700",
      circleColor: "bg-blue-200",
    },
    {
      id: 4,
      title: "Fast Replacement",
      subtitle: "Step 4:",
      description: "Receive your new passport without delays.",
      icon: <FaFlag size={32} />,
      color: "bg-rose-100 border-rose-400 text-rose-700",
      circleColor: "bg-rose-200",
    },
  ];

  return (
    <div className="flex justify-center items-center flex-wrap gap-8 py-10 relative">
      {steps.map((step) => (
        <div
          key={step.id}
          className="relative flex flex-col items-center text-center max-w-[250px]"
        >
          {/* connector line */}
          {/* {index < steps.length - 1 && (
            <div className="absolute top-1/2 right-[-80px] w-40 h-0.5 bg-gray-200 z-0" />
          )} */}

          {/* main circle */}
          <div
            className={`relative z-10 w-40 h-40 flex items-center justify-center rounded-full border-4 ${step.color}`}
          >
            <div
              className={`w-28 h-28 flex items-center justify-center rounded-full ${step.circleColor}`}
            >
              {step.icon}
            </div>
          </div>

          {/* text content */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">
              {step.subtitle} <br />{" "}
              <span className="text-gray-800">{step.title}</span>
            </h3>
            <p className="text-sm text-gray-600 mt-1">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepFlow;
