import React, { Suspense } from "react";
 import PlanSelection from "./PlanSelection";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function Page() {
  return (
  <Suspense fallback={<FullScreenLoader/>}>      <PlanSelection />
    </Suspense>
  );
}
