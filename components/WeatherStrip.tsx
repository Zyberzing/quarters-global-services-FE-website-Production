"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import ReactCountryFlag from "react-country-flag";
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudDrizzle,
  Snowflake,
  CloudLightning,
  CloudFog,
} from "lucide-react";

// ✅ Types
type Condition =
  | "Sunny"
  | "Mostly cloudy"
  | "Cloudy"
  | "Rain"
  | "Rain showers"
  | "Drizzle"
  | "Snow"
  | "Thunderstorm"
  | "Fog"
  | "Overcast";

type DayForecast = { dow: string; highC: number; lowC: number; condition: Condition };
type Normalized = {
  country: string;
  countryCode: string;
  now: { tempC: number; condition: Condition };
  days: DayForecast[];
};

// ✅ Weather icon map
function iconFor(c: Condition) {
  switch (c) {
    case "Sunny":
      return <Sun className="size-6 text-yellow-400" />;
    case "Mostly cloudy":
      return <CloudSun className="size-6 text-blue-400" />;
    case "Cloudy":
    case "Overcast":
      return <Cloud className="size-6 text-gray-400" />;
    case "Rain":
    case "Rain showers":
      return <CloudRain className="size-6 text-blue-500" />;
    case "Drizzle":
      return <CloudDrizzle className="size-6 text-blue-400" />;
    case "Snow":
      return <Snowflake className="size-6 text-sky-300" />;
    case "Thunderstorm":
      return <CloudLightning className="size-6 text-yellow-500" />;
    case "Fog":
      return <CloudFog className="size-6 text-gray-300" />;
    default:
      return <Sun className="size-6 text-yellow-400" />;
  }
}

const cn = (...s: (string | undefined)[]) => s.filter(Boolean).join(" ");

// ✅ Helper: convert slug → country code
function convertSlugToCode(slug: string | null): string {
  if (!slug) return "IN";
  const map: Record<string, string> = {
    "united-states": "US",
    canada: "CA",
    india: "IN",
    "united-kingdom": "GB",
    australia: "AU",
  };
  return map[slug.toLowerCase()] || "IN";
}

// ✅ Convert API → UI
function adapt(api: any, countryCode: string): Normalized {
  const normCond = (t: string): Condition => {
    const x = (t || "").toLowerCase();
    if (x.includes("thunder")) return "Thunderstorm";
    if (x.includes("snow")) return "Snow";
    if (x.includes("drizzle")) return "Drizzle";
    if (x.includes("rain")) return "Rain";
    if (x.includes("fog")) return "Fog";
    if (x.includes("overcast")) return "Overcast";
    if (x.includes("mostly") && x.includes("cloud")) return "Mostly cloudy";
    if (x.includes("cloud")) return "Cloudy";
    return "Sunny";
  };

  const daysSrc: any[] = api?.data?.forecast ?? [];
  const firstDay = daysSrc[0];

  return {
    country: api?.data?.country ?? "—",
    countryCode,
    now: {
      tempC: Number(
        ((firstDay?.maxTemp ?? 0) + (firstDay?.minTemp ?? 0)) / 2
      ),
      condition: normCond(firstDay?.condition ?? "Sunny"),
    },
    days: daysSrc.map((d: any) => ({
      dow: d?.day ?? "—",
      highC: Number(d?.maxTemp ?? 0),
      lowC: Number(d?.minTemp ?? 0),
      condition: normCond(d?.condition ?? ""),
    })),
  };
}

// ✅ Main Component
export default function WeatherStripAxiosDirect({
  className,
}: {
  className?: string;
}) {
  const searchParams = useSearchParams();
  const toCountrySlug = searchParams.get("toCountrySlug");
  const countryCode = convertSlugToCode(toCountrySlug);

  const [data, setData] = useState<Normalized | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const base = process.env.NEXT_PUBLIC_QUARTUS_API_URL;
  const url = useMemo(
    () => `${base?.replace(/\/$/, "")}/common/get-wather-forecast`,
    [base]
  );

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await axios.get(url, {
          params: { countryCode },
          signal: ctrl.signal as any,
        });
        if (res.data?.status) {
          const normalized = adapt(res.data, countryCode);
          setData(normalized);
        } else {
          setErr("Invalid API response");
        }
      } catch (e: any) {
        if (!axios.isCancel(e)) setErr(e?.message ?? "Failed to load weather");
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, [url, countryCode]);

  return (
    <Card
      className={cn(
        "w-full overflow-hidden border shadow-lg rounded-2xl",
        "bg-white/95 dark:bg-gray-900",
        className
      )}
    >
      <CardContent className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="grid place-items-center size-9 rounded-full bg-blue-100 shadow-sm">
              {data?.countryCode ? (
                <ReactCountryFlag
                  countryCode={data.countryCode}
                  svg
                  style={{
                    width: "1.8em",
                    height: "1.8em",
                    borderRadius: "50%",
                  }}
                  title={data.country}
                />
              ) : (
                <span className="text-lg">🌍</span>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {loading ? "Loading…" : data?.country ?? "—"}
              </p>
              <p className="text-xs text-muted-foreground">
                7-Day Weather Forecast
              </p>
            </div>
          </div>

          {/* Current Weather (desktop) */}
          <div className="hidden sm:flex items-center gap-3 ml-auto">
            {loading ? (
              <>
                <Skeleton className="size-9 rounded-full" />
                <Skeleton className="h-6 w-10" />
                <Skeleton className="h-4 w-20" />
              </>
            ) : err ? (
              <span className="text-sm text-red-600">Error</span>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="grid place-items-center size-9 rounded-full bg-blue-50 shadow-inner"
                >
                  {iconFor(data?.now?.condition || "Sunny")}
                </motion.div>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-semibold">
                    {data?.now?.tempC?.toFixed(1) ?? "--"}
                  </span>
                  <span className="text-sm">°C</span>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {data?.now?.condition ?? "--"}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Days scroller */}
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {loading
            ? Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-[110px] w-[90px] rounded-xl" />
              ))
            : err
            ? (
              <div className="text-sm text-red-600">
                Failed to load forecast.
              </div>
            )
            : data?.days?.map((d, i) => (
                <motion.div
                  key={d.dow + i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="shrink-0 w-[90px]"
                >
                  <div className="rounded-xl bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 p-3 text-center hover:shadow-md transition-all">
                    <p className="text-[12px] font-medium text-gray-600 dark:text-gray-300">
                      {d.dow}
                    </p>
                    <div className="grid place-items-center my-2">
                      {iconFor(d.condition)}
                    </div>
                    <p className="text-[11px] text-gray-500">
                      {d.highC.toFixed(1)}°/
                      <span className="opacity-70">{d.lowC.toFixed(1)}°</span>
                    </p>
                    <p className="text-[11px] mt-1 line-clamp-1 text-gray-700 dark:text-gray-100">
                      {d.condition}
                    </p>
                  </div>
                </motion.div>
              ))}
        </div>
      </CardContent>
    </Card>
  );
}
