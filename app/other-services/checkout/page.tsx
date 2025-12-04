import React, { Suspense } from "react";
import FullScreenLoader from "@/components/FullScreenLoader";
import CheckOut from "./CheckOut";

export default function Page() {
  return (
    <Suspense fallback={<FullScreenLoader />}>      <CheckOut />
    </Suspense>
  );
}
