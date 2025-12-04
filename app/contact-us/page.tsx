import React, { Suspense } from "react";
 import FullScreenLoader from "@/components/FullScreenLoader";
import ContectUs from "./ContactUs";

export default function Page() {
  return (
    <Suspense fallback={<FullScreenLoader />}>      <ContectUs />
    </Suspense>
  );
}
