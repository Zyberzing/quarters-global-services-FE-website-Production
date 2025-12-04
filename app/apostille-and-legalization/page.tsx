import React, { Suspense } from "react";
 import FullScreenLoader from "@/components/FullScreenLoader";
import ApostilleAndLegalization from "./ApostilleAndLegalization";

export default function Page() {
  return (
    <Suspense fallback={<FullScreenLoader />}>      <ApostilleAndLegalization />
    </Suspense>
  );
}
