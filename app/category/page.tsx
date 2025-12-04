import React, { Suspense } from "react";
import FullScreenLoader from "@/components/FullScreenLoader";
import Category from "./Category";

export default function Page() {
    return (
        <Suspense fallback={<FullScreenLoader />}>      <Category />
        </Suspense>
    );
}
