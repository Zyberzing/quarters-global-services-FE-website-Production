"use client";

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdditionalServiceSkeleton = () => {
  return (
    <div className="border p-5 rounded-lg shadow-sm bg-white transition-all duration-300">
      <div className="flex items-start gap-3">
        {/* Service Details Skeleton */}
        <div className="flex-1">
             <Skeleton width={20} height={20} className="mt-1" />
          {/* Name */}
          <Skeleton width={150} height={20} className="mb-2 mt-2" />
          {/* Description */}
          <Skeleton width="100%" height={14} className="mb-1" />
          <Skeleton width="80%" height={14} className="mb-1" />
          {/* Timeline */}
          <Skeleton width={120} height={14} className="mb-1" />
          {/* Price */}
          <Skeleton width={60} height={16} />
        </div>
      </div>
    </div>
  );
};

export default AdditionalServiceSkeleton;
