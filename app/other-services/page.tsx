import React, { Suspense } from "react";
import FullScreenLoader from "@/components/FullScreenLoader";
import OtherService from "./OtherService";

export default function Page() {
    return (
        <Suspense fallback={<FullScreenLoader />}>      <OtherService />
        </Suspense>
    );
}
