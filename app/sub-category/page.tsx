import React, { Suspense } from "react";
import FullScreenLoader from "@/components/FullScreenLoader";
 import SubCategory from "./SubCategory";

export default function Page() {
    return (
        <Suspense fallback={<FullScreenLoader />}>      <SubCategory />
        </Suspense>
    );
}
