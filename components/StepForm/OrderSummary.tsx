import { countrySlugToCode } from "@/lib/countryMap";
import Image from "next/image";
import { useSelector } from "react-redux";

const OrderSummary = ({ step }: { step: number }) => {
  const { draftApplications } = useSelector(
    (state: any) => state.application
  );

  if (!(step === 1 || step === 2)) return null;

  const currency = "USD";

  const applications = draftApplications.filter(
    (app: any) => app.package && app.price
  );

  const total = applications.reduce((sum: number, app: any) => {
    const addonsTotal =
      app.addons?.reduce(
        (aSum: number, addon: any) => aSum + (addon.price || 0),
        0
      ) || 0;

    return sum + app.price + addonsTotal;
  }, 0);

  return (
    <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
      <div className="relative lg:sticky lg:top-20 rigth-10">

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">

          <div className="bg-[#00408D] text-white p-4">
            <h2 className="text-lg font-bold">Order Summary</h2>
          </div>

          <div className="p-4 space-y-4 text-sm">

            {applications.length > 0 ? (
              applications.map((app: any) => {
                const countryCode =
                  countrySlugToCode[app.toCountrySlug] || "UN";

                const flagUrl = `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;

                return (
                  <div key={app.id} className="space-y-2">

                    <div className="flex justify-between items-center border-b py-2">
                      <span className="flex items-center gap-2 text-xs sm:text-sm">
                        <Image
                          src={flagUrl}
                          alt={app.toCountrySlug}
                          width={200}
                          height={200}
                          className=" w-6 h-4"
                        />
                        {app.name} –{" "}
                        <span className="font-semibold">
                          {app.package}
                        </span>
                      </span>

                      <span className="font-semibold">
                        {currency} {app.price.toFixed(2)}
                      </span>
                    </div>

                    {app.addons?.length > 0 && (
                      <div className="pl-6 space-y-1">
                        {app.addons.map((addon: any) => (
                          <div
                            key={addon.id}
                            className="flex justify-between text-xs text-gray-600"
                          >
                            <span>{addon.name}</span>
                            <span>
                              {addon.currency || currency}{" "}
                              {addon.price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                );
              })
            ) : (
              <p className="text-xs text-gray-500">
                No services added yet
              </p>
            )}

            <div className="flex justify-between pt-4 border-t font-bold">
              <span>Total</span>
              <span>{currency} {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
