import React, { Suspense } from "react";
import FullScreenLoader from "@/components/FullScreenLoader";
import Details from "./Details";

export default function Page() {
    return (
        <Suspense fallback={<FullScreenLoader />}>  <Details />  </Suspense>
    );
}
