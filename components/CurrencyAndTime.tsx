"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { convertCountryCurrency } from "@/lib/currentUtils";

// Countries with slug and timezone
const countries = [
  {
    code: "US",
    slug: "united-states",
    name: "US Dollar",
    timezone: "America/New_York",
  },
  { code: "IN", slug: "india", name: "Indian Rupee", timezone: "Asia/Kolkata" },
  {
    code: "CN",
    slug: "china",
    name: "Chinese Yuan",
    timezone: "Asia/Shanghai",
  },
  { code: "EU", slug: "europe", name: "Euro", timezone: "Europe/Berlin" },
  { code: "JP", slug: "japan", name: "Japanese Yen", timezone: "Asia/Tokyo" },
];

export default function CurrencyAndTime() {
  const searchParams = useSearchParams();
  const toCountrySlug = searchParams.get("toCountrySlug") || "india";
  const fromCountrySlug = searchParams.get("fromCountrySlug") || "us-visa";

  // Find countries based on slug
  const defaultToCountry =
    countries.find((c) => c.slug === toCountrySlug) || countries[0];
  const defaultFromCountry =
    countries.find((c) => c.slug === fromCountrySlug) || countries[0];

  const [amount, setAmount] = useState("");
  const [fromCountry, setFromCountry] = useState(defaultFromCountry.code);
  const [toCountry, setToCountry] = useState(defaultToCountry.code);
  const [converted, setConverted] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Currency conversion - using direct third-party API
  const handleConvert = useCallback(async () => {
    if (!amount || isNaN(Number(amount))) return;
    setLoading(true);
    try {
      const result = await convertCountryCurrency(
        fromCountry,
        toCountry,
        Number(amount)
      );
      setConverted(result.convertedAmount);
    } catch (error) {
      console.error("Conversion error:", error);
      setConverted(null);
    } finally {
      setLoading(false);
    }
  }, [amount, fromCountry, toCountry]);

  useEffect(() => {
    if (amount) handleConvert();
  }, [amount, fromCountry, toCountry, handleConvert]);

  // Time logic
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const selectedCountry =
    countries.find((c) => c.code === toCountry) || countries[0];
  const countryTime = new Date(
    time.toLocaleString("en-US", { timeZone: selectedCountry.timezone })
  );

  const hours = countryTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const date = countryTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const week = `Week ${Math.ceil(countryTime.getDate() / 7) + countryTime.getMonth() * 4
    }`;

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12 px-4">

      {/* Currency Exchange Card */}
      <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 200 }} className="p">
        <Card className="border border-red-200 shadow-xl rounded-2xl overflow-hidden bg-white p-0">

          <CardHeader className="bg-gradient-to-r from-black to-[#E7000B] text-white py-3">
            <CardTitle className="text-center text-sm font-semibold tracking-wider uppercase">
              Currency Exchange
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-4">

            {/* Amount */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-black">
                Amount
              </Label>
              <Input
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                className="h-10 rounded-lg border-gray-300 focus:ring-2 focus:ring-red-600"
              />
            </div>

            {/* From / To */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-black">
                  From
                </Label>
                <Select value={fromCountry} onValueChange={setFromCountry}>
                  <SelectTrigger className="h-10 rounded-lg border-gray-300 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold text-black">
                  To
                </Label>
                <Select value={toCountry} onValueChange={setToCountry}>
                  <SelectTrigger className="h-10 rounded-lg border-gray-300 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Result */}
            {converted !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 text-center bg-red-50 text-red-800 rounded-xl p-4 font-semibold border border-red-200"
              >
                {loading
                  ? "Converting..."
                  : `${amount} ${fromCountry} = ${converted} ${toCountry}`}
              </motion.div>
            )}

          </CardContent>
        </Card>
      </motion.div>

      {/* Current Time Card */}
      <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 200 }}>
        <Card className="border border-red-200 shadow-xl rounded-2xl overflow-hidden bg-white p-0 h-full">

          <CardHeader className="bg-gradient-to-r from-black to-[#E7000B] text-white py-3">
            <CardTitle className="text-center text-sm font-semibold tracking-wider uppercase">
               Local Time
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 text-center space-y-3">

            <div className="text-xs uppercase tracking-wide text-gray-500">
              {selectedCountry.name}
            </div>

            <motion.div
              layout
              className="text-4xl sm:text-5xl font-extrabold text-black bg-red-50 rounded-2xl py-4 border border-red-200"
            >
              {hours}
              <div className="text-xs font-medium text-gray-600 mt-1">
                {selectedCountry.timezone}
              </div>
            </motion.div>

            <p className="text-sm font-medium text-black">
              {date}
            </p>
            <p className="text-xs uppercase tracking-wide text-gray-500">
              {week}
            </p>

          </CardContent>
        </Card>
      </motion.div>

    </div>

  );
}
