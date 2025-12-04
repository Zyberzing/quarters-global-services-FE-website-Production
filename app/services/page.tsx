import React, { Suspense } from "react";
import FullScreenLoader from "@/components/FullScreenLoader";
import Services from "./Services";

export default function Page() {
    return (
        <Suspense fallback={<FullScreenLoader />}><Services /></Suspense>
    );
}
