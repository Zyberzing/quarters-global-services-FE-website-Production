import { Banner_data } from "@/app/data/BannerData";

export function getVisaDetails(visaSlug: string, fromCountrySlug: string) {
  // Normalize visa and country slugs
  const normalizedVisaSlug = visaSlug.trim().toLowerCase();
  const normalizedCountrySlug = fromCountrySlug.trim().toLowerCase();

  // Map user-friendly country slugs to Banner_data keys
  const countryMap: Record<string, string> = {
    "united-states": "usa",
    "us": "usa",
    "usa": "usa",
    "india": "india",
    "in": "india",
  };

  const mappedCountrySlug =
    countryMap[normalizedCountrySlug] || normalizedCountrySlug;

  // Find visa category in Banner_data
  const visaCategory = Banner_data[normalizedVisaSlug as keyof typeof Banner_data];

  if (!visaCategory) {
    return {
      title: "Visa Information Not Found",
      description: "The selected visa type is not available.",
      image: "/images/default-visa.jpg",
    };
  }

  // Find specific country data
  const countryData =
    visaCategory[mappedCountrySlug as keyof typeof visaCategory];

  if (!countryData) {
    return {
      title: "Visa Details Unavailable",
      description:
        "We currently don’t have details for this visa type and country combination.",
      image: "/images/default-visa.jpg",
    };
  }

  // Return matched data
  return countryData;
}
