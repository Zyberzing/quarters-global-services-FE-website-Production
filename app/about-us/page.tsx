import React, { Suspense } from "react";
 import FullScreenLoader from "@/components/FullScreenLoader";
import AboutUs from "./AboutUs";
 
export default function Page() {
  return (
    <Suspense fallback={<FullScreenLoader />}>      <AboutUs />
    </Suspense>
  );
}
