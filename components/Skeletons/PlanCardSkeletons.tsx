"use client";

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PlanCardSkeleton = () => {
  return (
    <div className="flex flex-col h-full border border-gray-200 rounded-xl shadow p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Skeleton width={120} height={24} />
        <Skeleton width={60} height={24} />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-grow mb-4">
        <Skeleton width={80} height={24} className="mb-2" />
        <Skeleton width={100} height={40} className="mb-2" />
        <Skeleton width={140} height={16} />
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <Skeleton width="100%" height={48} borderRadius={24} />
      </div>
    </div>
  );
};

export default PlanCardSkeleton;
