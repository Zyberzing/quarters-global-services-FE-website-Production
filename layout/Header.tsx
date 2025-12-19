"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MdMenu, MdClose, MdShoppingCart } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetNavbarServicesQuery } from "@/services/platformNavbarApi";
import { getSession } from "@/lib/session";

const staticRoutes = [
  "other-services",
  "tax-filling",
  "about-us",
  "contact-us",
  "e-visa"
];


const Header = () => {
  const { data, isError, isLoading } = useGetNavbarServicesQuery();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchParams = useSearchParams();
  const country = searchParams.get("toCountrySlug") || "";
  const router = useRouter();
  const currentPath = usePathname();
  const services = data?.data?.data;

  const readCartCount = () => {
    const saved = localStorage.getItem("applications");
    if (!saved) return 0;

    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed.applications)
        ? parsed.applications.filter(
          (app: any) =>
            app?.platformServiceCategoryId?.trim()
        ).length
        : 0;
    } catch {
      return 0;
    }
  };

  // Check login session
  useEffect(() => {
    const fetchSession = async () => {
      const token = await getSession();
      setIsLoggedIn(!!token);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const updateCount = () => {
      setCartCount(readCartCount());
    };

    // initial
    updateCount();

    // 👂 custom event (same tab)
    window.addEventListener("cart-updated", updateCount);

    return () => {
      window.removeEventListener("cart-updated", updateCount);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.06)] border-b border-gray-100 transition-all">
      <div className="w-[90%] max-w-8xl mx-auto px-4 py-5 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center cursor-pointer group"
          onClick={() => router.push("/")}
        >
          <Image
            src="/logo.png"
            alt="Quartus Logo"
            width={130}
            height={42}
            className="transition-transform group-hover:scale-105"
          />
        </div>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">

          {/* API Services */}
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} width={80} height={18} />
            ))}

          {isError && <span className="text-red-500">Failed to load</span>}

          {!isLoading &&
            !isError &&
            services
              ?.filter(
                (s: any) =>
                  s.name !== "OCI Card" && s.name !== "Indian PAN"
              )
              .map((service: any) => (
                <button
                  key={service._id}
                  onClick={() => {
                    // store common values (only if needed)
                    localStorage.setItem("selectedService", service.slug);
                    localStorage.setItem("fromCountryId", "68e966dde7bd0d029655d358");
                    localStorage.setItem("toCountryId", "68e966dde7bd0d029655d359");
                                        
  sessionStorage.setItem("main_service_type", country)

                    sessionStorage.setItem(
                      "platformServiceStep",
                      JSON.stringify({
                        citizenship: "india",
                        citizenship_code: "IN",
                        country: "united-states",
                        countryCode: "US",
                      })
                    );

                    // 🔀 REDIRECT FIX
                    if (staticRoutes.includes(service.slug)) {
                      router.push(`/${service.slug}`);
                      console.log(service, "service")

                    } else {
                      router.push(
                        `/category?toCountrySlug=united-states&Slug=${service.slug}`
                      );
                    }
                  }}


                  className={`relative px-1 transition duration-300 ${currentPath === `/${service.slug}`
                    ? "text-[oklch(57.7%_0.245_27.325)] font-semibold after:scale-x-100"
                    : "text-gray-700 hover:text-[oklch(57.7%_0.245_27.325)]"
                    } after:content-[''] after:absolute after:left-0 after:-bottom-1 
        after:w-full after:h-[2px] after:bg-[oklch(57.7%_0.245_27.325)] 
        after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300`}
                >
                  {service.name}
                </button>
              ))}


          {["about-us", "contact-us"].map((page) => (
            <button
              key={page}
              onClick={() => router.push(`/${page}`)}
              className={`relative px-1 transition duration-300 ${currentPath === `/${page}`
                ? "text-[oklch(57.7%_0.245_27.325)] font-semibold after:scale-x-100"
                : "text-gray-700 hover:text-[oklch(57.7%_0.245_27.325)]"
                } after:content-[''] after:absolute after:left-0 after:-bottom-1 
              after:w-full after:h-[2px] after:bg-[oklch(57.7%_0.245_27.325)] 
              after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300`}
            >
              {page === "about-us" ? "About" : "Contact"}
            </button>
          ))}


        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6 text-sm">

          {/* Cart */}
          <div
            className="relative cursor-pointer hover:scale-105 transition"
            onClick={() => router.push("/checkout")}
          >
            <MdShoppingCart className="text-2xl text-gray-800 hover:text-[oklch(57.7%_0.245_27.325)] transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[oklch(57.7%_0.245_27.325)] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {cartCount}
              </span>
            )}
          </div>

          {/* Login or Dashboard */}
          {!isLoggedIn ? (
            <button
              onClick={() => router.push("/login")}
              className="px-5 py-2.5 text-xs font-semibold border border-[oklch(57.7%_0.245_27.325)] bg-[oklch(57.7%_0.245_27.325)] text-white rounded-md hover:bg-white hover:text-[oklch(57.7%_0.245_27.325)] transition-all shadow-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => router.push("/dashboard/applications")}
              className="px-5 py-2.5 text-xs font-semibold border border-[oklch(57.7%_0.245_27.325)] bg-[oklch(57.7%_0.245_27.325)] text-white rounded-md hover:opacity-90 transition-all shadow-sm"
            >
              Dashboard
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-3xl text-gray-800 hover:text-[oklch(57.7%_0.245_27.325)] transition"
          >
            {mobileMenuOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg px-6 py-6 animate-slideDown">

          {/* Services */}
          {!isLoading &&
            !isError &&
            services
              ?.filter(
                (s: any) =>
                  s.name !== "OCI Card" && s.name !== "Indian PAN"
              )
              .map((service: any) => (
                <button
                  key={service._id}
                  onClick={() => {
                    // store common values (only if needed)
                    localStorage.setItem("selectedService", service.slug);
                    localStorage.setItem("fromCountryId", "68e966dde7bd0d029655d358");
                    localStorage.setItem("toCountryId", "68e966dde7bd0d029655d359");
  sessionStorage.setItem("main_service_type", country)
                    sessionStorage.setItem(
                      "platformServiceStep",
                      JSON.stringify({
                        citizenship: "india",
                        citizenship_code: "IN",
                        country: "united-states",
                        countryCode: "US",
                      })
                    );

                    // 🔀 REDIRECT FIX
                    if (staticRoutes.includes(service.slug)) {
                      router.push(`/${service.slug}`);
                    } else {
                      router.push(
                        `/category?toCountrySlug=united-states&Slug=${service.slug}`
                      );
                    }
                  }}
                  className={`block w-full text-left py-2 text-sm ${currentPath === `/${service.slug}`
                    ? "text-[oklch(57.7%_0.245_27.325)] font-semibold"
                    : "text-gray-700 hover:text-[oklch(57.7%_0.245_27.325)]"
                    } transition`}
                >
                  {service.name}
                </button>
              ))}


          {/* Static Pages */}
          {["about-us", "contact-us"].map((page) => (
            <button
              key={page}
              onClick={() => {
                router.push(`/${page}`);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 text-sm ${currentPath === `/${page}`
                ? "text-[oklch(57.7%_0.245_27.325)] font-semibold"
                : "text-gray-700 hover:text-[oklch(57.7%_0.245_27.325)]"
                } transition`}
            >
              {page === "about-us" ? "About" : "Contact"}
            </button>
          ))}



          {/* Cart */}
          <div
            className="flex items-center gap-3 mt-5 cursor-pointer text-gray-700 hover:text-[oklch(57.7%_0.245_27.325)] transition"
            onClick={() => {
              router.push("/checkout");
              setMobileMenuOpen(false);
            }}
          >
            <MdShoppingCart className="text-xl" />
            <span className="text-sm">Cart ({cartCount})</span>
          </div>

          {!isLoggedIn ? (
            <button
              onClick={() => {
                router.push("/login");
                setMobileMenuOpen(false);
              }}
              className="w-full mt-5 px-4 py-3 text-sm font-semibold border border-[oklch(57.7%_0.245_27.325)] bg-[oklch(57.7%_0.245_27.325)] text-white rounded-md hover:bg-white hover:text-[oklch(57.7%_0.245_27.325)] transition-all"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                router.push("/dashboard/applications");
                setMobileMenuOpen(false);
              }}
              className="w-full mt-5 px-4 py-3 text-sm font-semibold border border-[oklch(57.7%_0.245_27.325)] bg-[oklch(57.7%_0.245_27.325)] text-white rounded-md hover:opacity-90 transition-all"
            >
              Dashboard
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
