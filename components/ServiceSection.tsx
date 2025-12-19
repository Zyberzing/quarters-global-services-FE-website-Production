"use client"
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";


interface ServiceSectionProps {
  title: string;
  description: string;
  buttonText?: string;
  imageSrc: string;
  imagePosition: "left" | "right";
  slug?: string;
  id?: string;
  platformServiceId?: string
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  description,
  buttonText,
  imagePosition,
  imageSrc,
  slug,
  id,
  platformServiceId
}) => {
  const router = useRouter()
  return (
    <section className="py-16 px-4 lg:px-8  ">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Image on left, text on right */}
        {imagePosition === "left" && (
          <>
            <div className="lg:w-1/2 w-full">
              <Image
                width={400}
                height={400}
                src={imageSrc || "/service.jpg"}
                alt={title}
                className="
      w-full 
      h-auto 
      rounded-xl 
      shadow-lg 
      object-cover 
      transition-transform 
      duration-300 
      hover:scale-105 
      lg:h-[400px]   
    "
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">{title}</h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">{description}</p>
              {buttonText && (
                <button onClick={() => {
                  // 🧠 Save service identifiers to localStorage
                  localStorage.setItem(
                    "selectedService",
                    JSON.stringify({
                      _id: "68dea43dd59bef88e366aa25",
                      platformServiceId: "68dea43dd59bef88e366aa23",
                      parentCategoryId: null,
                    })
                  );

                  router.push(`/other-services/${slug}?id=${id}`);
                }}
                  className="
    group
    relative
    inline-flex
    items-center
    gap-3
    bg-red-600
    hover:bg-red-700
    text-white
    px-8
    py-3
    rounded-full
    font-semibold
    text-lg
    shadow-md
    hover:shadow-xl
    transition-all
    duration-300
    cursor-pointer
  "                >
                  {buttonText}

                  <span
                    className="
      inline-flex
      items-center
      justify-center
      w-6
      h-6
      rounded-full
      bg-white/20
      transform
      transition-all
      duration-300
      group-hover:translate-x-2
      group-hover:bg-white
    "
                  >
                    <svg
                      className="w-4 h-4 text-white group-hover:text-red-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          </>
        )}

        {/* Image on right, text on left */}
        {imagePosition === "right" && (
          <>
            <div className="lg:w-1/2 w-full order-2 lg:order-1">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">{title}</h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">{description}</p>
              {buttonText && (
                <button onClick={() => {
                  // 🧠 Save service identifiers to localStorage
                  localStorage.setItem(
                    "selectedService",
                    JSON.stringify({
                      _id: id,
                      platformServiceId: platformServiceId,

                    })
                  );

                  router.push(`/other-services/${slug}?id=${id}`);
                }}
                  className="
    group
    relative
    inline-flex
    items-center
    gap-3
    bg-red-600
    hover:bg-red-700
    text-white
    px-8
    py-3
    rounded-full
    font-semibold
    text-lg
    shadow-md
    hover:shadow-xl
    transition-all
    duration-300
    cursor-pointer
  "                 >
                  {buttonText}

                  <span
                    className="
      inline-flex
      items-center
      justify-center
      w-6
      h-6
      rounded-full
      bg-white/20
      transform
      transition-all
      duration-300
      group-hover:translate-x-2
      group-hover:bg-white
    "
                  >
                    <svg
                      className="w-4 h-4 text-white group-hover:text-red-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
            <div className="lg:w-1/2 w-full order-1 lg:order-2">
              <Image
                width={400}
                height={400}
                src={imageSrc || "/service.jpg"}
                alt={title}
                className="
      w-full 
      h-auto 
      rounded-xl 
      shadow-lg 
      object-cover 
      transition-transform 
      duration-300 
      hover:scale-105 
      lg:h-[400px]   
    "
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ServiceSection