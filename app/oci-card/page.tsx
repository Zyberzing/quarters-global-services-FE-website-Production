import React, { Suspense } from "react";
import OCACard from "./OCACard";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function Page() {
  return (
    <Suspense fallback={<FullScreenLoader />}>      <OCACard />
    </Suspense>
  );
}
