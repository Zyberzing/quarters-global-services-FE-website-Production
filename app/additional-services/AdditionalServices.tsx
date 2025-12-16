"use client";
import BannerLayout from "@/components/Banner/BannerLayout";
import CommitmentSection from "@/components/CommitmentSection/CommitmentSection";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import AdditionalServiceSkeleton from "@/components/Skeletons/AdditionalServiceSkeleton";
import TestimonialSlider from "@/components/TestimonialSlider ";
import { Checkbox } from "@/components/ui/checkbox";
import { savePlatformServiceStep } from "@/lib/platformServiceStorage";
import { useGetPlatformServiceCategoryPackageAddonQuery } from "@/services/platformServiceAddonApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddon, clearStatus, saveApplication } from "@/store/slices/applicationSlice";

const AdditionalServices = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const country = searchParams.get("toCountrySlug") || "";
  const packageSlug = searchParams.get("slug") || ""; // ← this is the actual package slug

  const { data, isLoading } = useGetPlatformServiceCategoryPackageAddonQuery({
    platformServiceCategoryPackageSlug: packageSlug, // ← use slug param
    toCountrySlug: country, // ← must not be empty
  });
  const additional = data?.data?.data;

  const { activeId } = useSelector((state: any) => state.application);

  const toggleSelection = (addon: any) => {
    const addonId = String(addon._id);

    setSelected((prev) => {
      let updated: string[];

      if (prev.includes(addonId)) {
        // ❌ DESELECT ADDON
        updated = prev.filter((item) => item !== addonId);

        // 🔴 remove from localStorage
        savePlatformServiceStep(
          {
            platformServiceCategoryPackageAddonsId: [addonId],
          },
        );

        // 🔴 remove from redux
        dispatch({
          type: "application/removeAddon",
          payload: { id: activeId, addon: addonId },
        });
      } else {
        // ✅ SELECT ADDON
        updated = [...prev, addonId];

        // 🟢 save to localStorage
        savePlatformServiceStep(
          {
            platformServiceCategoryPackageAddonsId: [addonId],
            additionService: true,
            additionService_price: Number(addon.price),
            additionService_name: addon.name,
            currency: addon.currency || "USD",
          },
          
        );

        // 🟢 save to redux
        dispatch(addAddon({ id: activeId, addon: addonId }));
      }

      return updated;
    });
  };


  const handleContinue = () => {
    dispatch(saveApplication());
    dispatch(clearStatus());
    router.push(`/checkout`);
  };
  return (
    <>
      <BannerLayout bg="/e-visa.jpg">
        <h4 className="bg-black/40 py-3 pb-5 px-4 w-[50%] m-auto rounded-lg text-4xl font-bold mb-4 capitalize">
          Additional Services
        </h4>

      </BannerLayout>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Select Services</h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <AdditionalServiceSkeleton />
              <AdditionalServiceSkeleton />
              <AdditionalServiceSkeleton />
            </>
          ) : (
            <>
              {additional && additional.length > 0 ? (
                additional.map((service: any) => (
                  <div
                    key={service._id}
                    className={`border p-5 rounded-lg shadow-sm transition-all duration-300 ${selected.includes(String(service._id))
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 bg-white"
                      }`}
                  >
                    <label className="flex items-start gap-3 cursor-pointer">
                      <div>
                        <Checkbox
                          checked={selected.includes(String(service._id))}
                          onCheckedChange={() => toggleSelection(service)}
                          className="w-5 h-5"
                        />
                        <h3 className="font-semibold text-lg mb-1 mt-2">
                          {service.name}
                        </h3>
                        <p className="text-sm text-gray-700 mb-2">
                          {service.description}
                        </p>
                        {/* <p className="text-sm text-gray-500 mb-1">
                          <strong>Timeline:</strong> {service.timeline}
                        </p> */}
                        <p className="text-sm font-semibold">
                          {service.price} {service.currency}
                        </p>
                      </div>
                    </label>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-10 px-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-blue-500 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M12 18.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">
                    No Add-ons Available
                  </h3>
                  <p className="text-sm text-gray-600">
                    Currently, there are no extra packages or add-ons for this
                    service. Please proceed with the main package.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleContinue}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Continue
          </button>
        </div>
      </div>

      <CommitmentSection />

      <div className="max-w-7xl mx-auto px-10 py-12  ">
        <SectionTitle
          subtitle="Our Testimonials"
          title="Real Stories. Real Success."
          highlight="Quartus"
          align="center"
        />
        <TestimonialSlider />
      </div>
    </>
  );
};

export default AdditionalServices;
