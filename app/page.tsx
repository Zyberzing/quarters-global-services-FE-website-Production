import React, { Suspense } from "react";
 import FullScreenLoader from "@/components/FullScreenLoader";
import Home from "./Home";

export default function Page() {
  
  return (
    <Suspense fallback={<FullScreenLoader />}><Home /></Suspense>
  );
}
