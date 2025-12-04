import React, { Suspense } from "react";
import Visa from "./Visa";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function Page() {
  return (
    <Suspense fallback={<FullScreenLoader />}>      <Visa />
    </Suspense>
  );
}
