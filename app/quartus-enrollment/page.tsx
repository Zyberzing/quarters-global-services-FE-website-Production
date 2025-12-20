import { Suspense } from "react";
import FullScreenLoader from "@/components/FullScreenLoader";
import QuartusEnrollmentPage from "./QuartusEnrollment";
 
export default function Page() {
  return (
  <Suspense fallback={<FullScreenLoader/>}>      <QuartusEnrollmentPage />
    </Suspense>
  );
}
