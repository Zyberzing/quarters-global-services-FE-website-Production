import React from "react";
import ServiceButton from "../Buttons/ServiceButton";
import { setCategory, startApplication } from "@/store/slices/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "nextjs-toploader/app";

interface VisaServiceCardProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  shouldStartApplication?: boolean; // ✅ renamed
  save?: (id: string) => void;
  mainType?: boolean;
}

const VisaServiceCard: React.FC<VisaServiceCardProps> = ({
  icon,
  title,
  description,
  link,
  id,
  shouldStartApplication,
  save,
  mainType = false,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { activeId } = useSelector((state: any) => state.application);
  const handleApplyNow = () => {
    dispatch(
      setCategory({ id: activeId, name: title, platformServiceCategoryId: id })
    );
    if (link) {
      router.push(link);
    }
  };

  return (
    <div className="max-w-sm p-4 rounded-xl border border-gray-200 h-[320px]  hover:shadow-md transition-shadow  flex items-center">
      <div className="flex flex-col items-start gap-3">
        {/* Icon box */}
        <div>{icon}</div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-600">{description}</p>

        {/* Link */}
        <ServiceButton
          name="Apply Now"
          rightIcon={
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.63672 18.864L18.3646 6.13611M18.3646 6.13611H11.2939M18.3646 6.13611L18.3643 13.2072"
                stroke="#444444"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          onClick={() => {
            
            if (shouldStartApplication) {
              //@ts-ignore
              dispatch(startApplication({ type: title ?? "", platformServiceId: id ?? "" }));
              if (link) {
                router.push(link);
              }
              sessionStorage.setItem("main_service_type", title);
              return;
            }

            if (title === "OCI Card") {
              sessionStorage.setItem("formType", "OCI");
            }
            if (mainType) {
              sessionStorage.setItem("main_service_type", title);
            }
            if (save) {
              save(id);
            }
            // Then navigate
            handleApplyNow();
          }}
        />
      </div>
    </div>
  );
};

export default VisaServiceCard;