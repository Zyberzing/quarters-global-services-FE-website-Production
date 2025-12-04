import React, { Suspense } from "react";
import Passport from "./Passport";
import FullScreenLoader from "@/components/FullScreenLoader";
 
export default function Page() {
  return (
  <Suspense fallback={<FullScreenLoader/>}>      <Passport />
    </Suspense>
  );
}
