"use client";

import { lazy, Suspense } from "react";

const VerifyUserPage = lazy(() => import("./VerifyUserPage"));

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyUserPage />
    </Suspense>
  );
}
