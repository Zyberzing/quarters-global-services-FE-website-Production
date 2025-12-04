import React from 'react'
import Skeleton from 'react-loading-skeleton'

 const VisaServiceCardSkeletons = () => {
  return (
    <div className="max-w-sm p-4 rounded-xl border border-gray-200 h-[320px] flex flex-col gap-4 animate-pulse">
        <Skeleton height={48} width={48} borderRadius={8} /> {/* icon */}
        <Skeleton height={24} width="60%" /> {/* title */}
        <Skeleton height={16} width="90%" /> {/* description */}
        <Skeleton height={40} width="50%" borderRadius={6} /> {/* button */}
      </div>
  )
}
export default VisaServiceCardSkeletons

