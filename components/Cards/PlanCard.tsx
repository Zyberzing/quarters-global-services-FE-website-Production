"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "nextjs-toploader/app";
import { useSearchParams } from "next/navigation";
import { savePlatformServiceStep } from "@/lib/platformServiceStorage";
import { useDispatch, useSelector } from "react-redux";
import { setPackage } from "@/store/slices/applicationSlice";

export interface VisaPlan {
  _id: string;
  title: string;
  processingTime: string;
  price: string;
  serviceFee: string;
  isPopular?: boolean;
  isPriority?: boolean;
  slug: string;
  name: string;
  priceDescription: string;
  platformServiceId: string;
  platformServiceCategoryId: string;
}

const PlanCard = ({ plan }: { plan: VisaPlan; type: string }) => {
  const router = useRouter();
  const primaryColor = "#D20F21";
  const searchParams = useSearchParams();
  const { activeId } = useSelector((state: any) => state.application);
  const dispatch = useDispatch();
  const country = searchParams.get("toCountrySlug") || "";
  const platformServiceCategorySlug =
    searchParams.get("platformServiceCategorySlug") || "";

  const handleApplyNow = () => {
    dispatch(
      setPackage({
        id: activeId,
        package: plan.name,
        price: plan.price,
        platformServiceCategoryPackageId: plan._id,
        platformServiceId: plan.platformServiceId,
        platformServiceCategoryId: plan.platformServiceCategoryId,
      })
    );
    router.push(
      `/additional-services?slug=${plan.slug}&toCountrySlug=${country}&platformServiceCategorySlug=${platformServiceCategorySlug}`
    );
    savePlatformServiceStep({
      platformServiceCategoryPackageId: String(plan._id),
      price: Number(plan.price),
      currency: "USD",
      Price_name:plan.name
    });
  };

  return (
    <Card
      className={`
        flex flex-col h-full border 
        ${plan.isPriority
          ? `border-[${primaryColor}] shadow-lg`
          : "border-gray-200"
        } 
        rounded-xl 
        hover:shadow-xl 
        transition-shadow duration-300
      `}
    >
      <CardHeader
        className={`
          ${plan.isPriority ? `bg-[${primaryColor}]/10` : ""}
          rounded-t-xl
        `}
      >
        <CardTitle className="flex justify-between items-center text-lg font-semibold">
          {plan.name}
          {/* {plan.isPopular && (
            <Badge className={`bg-[${primaryColor}] text-white px-2 py-1 rounded-full`}>
              Popular
            </Badge>
          )} */}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col justify-between flex-grow py-6 px-4">
        <div className="mb-1">
          <Badge
            variant="outline"
            className={`
              text-sm px-2 py-1 rounded 
              ${plan.priceDescription
                ? "bg-amber-100 text-amber-800 font-medium"
                : "bg-gray-100 text-gray-800"
              }
            `}
          >
            {plan.priceDescription}
          </Badge>
        </div>
        <div className="text-3xl font-bold text-[${primaryColor}]">
          ${plan.price}
        </div>
        {/* <p className="text-sm text-muted-foreground mt-2">
          {plan.priceDescription}
        </p> */}
      </CardContent>

      <CardFooter className="px-4 pb-4">
        <Button
          onClick={handleApplyNow}
          className="inline-flex items-center px-6 py-3 rounded-full border border-gray-400 bg-transparent hover:text-white text-black font-semibold gap-2 hover:bg-[#D31021] transition-colors duration-200"
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
