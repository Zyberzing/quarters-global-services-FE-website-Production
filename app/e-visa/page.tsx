import React, { Suspense } from "react";
 import FullScreenLoader from "@/components/FullScreenLoader";
import EVisa from "./EVisa";

export default function Page() {
  return (
    <Suspense fallback={<FullScreenLoader />}>      <EVisa />
    </Suspense>
  );
}
