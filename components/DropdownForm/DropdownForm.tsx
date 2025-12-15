"use client";

import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { useGetCountriesQuery } from "@/services/countryApi";
import DropdownWrapper from "./DropdownWrapper";
import { savePlatformServiceStep } from "@/lib/platformServiceStorage";
import Skeleton from "react-loading-skeleton";
import { usePathname } from "next/navigation";
import Button from "../Buttons/Button";

type DropdownOption = {
  id?: string;
  name: string;
  slug: string;
  code?: string;
};

export type PlatformServiceStep = {
  citizenship?: string;
  country?: string;
  passportType?: string;
  apostilleType?: string;
  countryCode: string;
  citizenship_code: string | undefined;
};

type TabType = "Services" | "apostille" | "e-visa";

interface DropdownFormProps {
  activeTab: TabType;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
}

const tabs: TabType[] = ["Services", "apostille", "e-visa"];
const STORAGE_KEY = "platformServiceStep";

const GoButton = ({ handleGo }: { handleGo: () => void }) => (
  <div className="w-full md:w-auto mt-4 md:mt-6">
    <button
      onClick={handleGo}
      className="w-full md:w-auto bg-red-600 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-red-700 transition-colors"
    >
      Go
    </button>
  </div>
);

function DropdownForm({ activeTab, setActiveTab }: DropdownFormProps) {
  const router = useRouter();
  const { data, isLoading: countryLoading } = useGetCountriesQuery();
  const apiCountries: DropdownOption[] =
    data?.data?.data?.map((country: any) => ({
      id: country._id,
      code: country.code,
      name: country.name,
      slug: country.slug,
    })) || [];

  const [country, setCountry] = useState<DropdownOption | null>(null);
  const [citizenship, setCitizenship] = useState<DropdownOption | null>(null);
  const [citizenshipSearch, setCitizenshipSearch] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [passportType, setPassportType] = useState<DropdownOption | null>(null);
  const [apostilleType, setApostilleType] = useState<DropdownOption | null>(null);
  const pathname = usePathname();
  const currentPath = pathname === "/" ? "" : pathname.replace("/", "");
  const visibleTabs = currentPath === "" ? tabs : tabs.filter((tab) => tab === currentPath);

  const [errors, setErrors] = useState({
    citizenship: "",
    country: "",
    passport: "",
    apostille: "",
  });

  const filteredCountries = apiCountries.filter((option) =>
    option.name.toLowerCase().includes(countrySearch.toLowerCase())
  );
  const filteredCitizenships = apiCountries.filter((option) =>
    option.name.toLowerCase().includes(citizenshipSearch.toLowerCase())
  );

  const saveStep = (step: PlatformServiceStep) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(step));
    }
  };

  const loadStep = (): PlatformServiceStep | null => {
    if (typeof window !== "undefined") {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as PlatformServiceStep) : null;
    }
    return null;
  };

  const validate = () => {
    let newErrors = { ...errors };
    if (activeTab === "Services") {
      newErrors = {
        citizenship: citizenship ? "" : "Please select citizenship",
        country: country ? "" : "Please select country",
        passport: "",
        apostille: "",
      };
    } else if (activeTab === "apostille") {
      newErrors = {
        citizenship: "",
        country: country ? "" : "Please select country",
        passport: "",
        apostille: apostilleType ? "" : "Please select apostille type",
      };
    } else if (activeTab === "e-visa") {
      newErrors = {
        citizenship: citizenship ? "" : "Please select citizenship",
        country: country ? "" : "Please select travel country",
        passport: "",
        apostille: "",
      };
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleGo = () => {
    if (!validate()) return;
    localStorage.setItem("fromCountryId", citizenship?.id ?? "");
    localStorage.setItem("toCountryId", country?.id ?? "");
    localStorage.setItem("county", country?.code ?? "");

    const step: PlatformServiceStep = {
      citizenship: citizenship?.slug,
      citizenship_code: citizenship?.code,
      country: country?.slug,
      countryCode: (country as any)?.code,
      passportType: passportType?.slug,
      apostilleType: apostilleType?.slug,
    };
    saveStep(step);
    if (activeTab === "Services") {
      router.push(
        `/services?toCountrySlug=${country?.slug}&&fromCountrySlug=${
          country?.slug == "india"
            ? "indian-visa"
            : country?.slug == "united-states"
            ? "us-visa"
            : "visa"
        }`
      );
    } else if (activeTab === "apostille") {
      router.push(`/apostille?type=${apostilleType?.slug}&&fromCountrySlug=${citizenship?.slug}`);
    } else if (activeTab === "e-visa") {
      router.push(`/category?toCountrySlug=${country?.slug}&fromCountrySlug=${citizenship?.slug}&Slug=e-visa`);
      savePlatformServiceStep({ platformServiceId: country?.id });
    }
  };

  useEffect(() => {
    const saved = loadStep();
    if (saved) {
      if (saved.citizenship)
        setCitizenship({
          id: saved.citizenship,
          name: saved.citizenship,
          slug: saved.citizenship,
          code: saved.citizenship_code,
        });

      if (saved.country && saved.countryCode)
        setCountry({
          id: saved.countryCode,
          code: saved.countryCode,
          name: saved.country,
          slug: saved.country,
        });

      if (saved.passportType)
        setPassportType({
          id: saved.passportType,
          name: saved.passportType,
          slug: saved.passportType,
        });

      if (saved.apostilleType)
        setApostilleType({
          id: saved.apostilleType,
          name: saved.apostilleType,
          slug: saved.apostilleType,
        });
    }
  }, [currentPath, setActiveTab]);

  if (countryLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex flex-row gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            height={40}
            width={250}
            borderRadius={6}
            baseColor="#e0e0e0"
            highlightColor="#f0f0f0"
            enableAnimation={true}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Tabs */}
      <div className="overflow-x-auto">
        <div className="flex justify-center space-x-8 text-sm font-medium mt-10 text-white mb-6 min-w-max">
          {visibleTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 border-b-2 transition ${
                activeTab === tab
                  ? "border-blue-500 text-blue-400 font-semibold"
                  : "border-transparent hover:text-blue-300"
              }`}
            >
              {tab === "Services"
                ? "Services"
                : tab === "apostille"
                ? "Apostille & Legalization"
                : tab === "e-visa"
                ? "E-Visa"
                : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Services Form */}
      {activeTab === "Services" && (
        <div className="p-6 rounded-md max-w-4xl mx-auto w-full flex flex-col md:flex-row md:items-start gap-4 justify-center">
          <DropdownWrapper
            label="Citizenship"
            value={citizenship}
            setValue={setCitizenship}
            search={citizenshipSearch}
            setSearch={setCitizenshipSearch}
            filteredOptions={filteredCitizenships}
            errors={errors.citizenship}
            placeholder="Citizen of"
            type="flag"
          />
          <DropdownWrapper
           label="Traveling"
            value={country}
            setValue={setCountry}
            search={countrySearch}
            setSearch={setCountrySearch}
            filteredOptions={filteredCountries}
            errors={errors.country}
            placeholder="Traveling to"
            type="flag"
          />
          <GoButton handleGo={handleGo} />
        </div>
      )}

      {/* Apostille Form */}
      {activeTab === "apostille" && (
        <div className="p-6 rounded-md max-w-4xl mx-auto w-full flex flex-col md:flex-row md:items-start gap-4 justify-center ">
          <Button
            link="/apostille-and-legalization"
            iconPosition="right"
            name={"Start Legalization Process"}
            icon={
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12.5" r="12" fill="#D31021" />
                <path
                  d="M7.33325 12.5H16.6666M16.6666 12.5L12.6666 8.5M16.6666 12.5L12.6666 16.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
      )}

      {/* E-Visa Form */}
      {activeTab === "e-visa" && (
        <div className="p-6 rounded-md max-w-4xl mx-auto w-full flex flex-col md:flex-row md:items-start gap-4 justify-center">
          <DropdownWrapper
            value={citizenship}
            setValue={setCitizenship}
            search={citizenshipSearch}
            setSearch={setCitizenshipSearch}
            filteredOptions={filteredCitizenships}
            errors={errors.citizenship}
            placeholder="Citizen of"
            type="flag"
            label="Citizenship"
          />
          <DropdownWrapper
            value={country}
            setValue={setCountry}
            search={countrySearch}
            setSearch={setCountrySearch}
            filteredOptions={filteredCountries}
            errors={errors.country}
            placeholder="Traveling to"
            type="flag"
            label="Traveling"
          />
          <GoButton handleGo={handleGo} />
        </div>
      )}
    </div>
  );
}

export default DropdownForm;
