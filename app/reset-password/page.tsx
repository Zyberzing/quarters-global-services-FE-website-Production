"use client";

import { lazy, Suspense } from "react";

const ResetPasswordPage = lazy(() => import("./ResetPasswordPage"));

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
