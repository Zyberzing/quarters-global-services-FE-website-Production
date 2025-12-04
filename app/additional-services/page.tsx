import React, { Suspense } from "react";
import AdditionalServices from "./AdditionalServices";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function Page() {
    return (
  <Suspense fallback={<FullScreenLoader/>}>            <AdditionalServices />
        </Suspense>
    );
}
