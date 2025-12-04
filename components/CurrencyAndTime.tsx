"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
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

// Countries with slug and timezone
const countries = [
  { code: "US", slug: "united-states", name: "US Dollar", timezone: "America/New_York" },
  { code: "IN", slug: "india", name: "Indian Rupee", timezone: "Asia/Kolkata" },
  { code: "CN", slug: "china", name: "Chinese Yuan", timezone: "Asia/Shanghai" },
  { code: "EU", slug: "europe", name: "Euro", timezone: "Europe/Berlin" },
  { code: "JP", slug: "japan", name: "Japanese Yen", timezone: "Asia/Tokyo" },
];

export default function CurrencyAndTime() {
  const searchParams = useSearchParams();
  const toCountrySlug = searchParams.get("toCountrySlug") || "india";
  const fromCountrySlug = searchParams.get("fromCountrySlug") || "us-visa";

  // Find countries based on slug
  const defaultToCountry = countries.find(c => c.slug === toCountrySlug) || countries[0];
  const defaultFromCountry = countries.find(c => c.slug === fromCountrySlug) || countries[0];

  const [amount, setAmount] = useState("");
  const [fromCountry, setFromCountry] = useState(defaultFromCountry.code);
  const [toCountry, setToCountry] = useState(defaultToCountry.code);
  const [converted, setConverted] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const base = process.env.NEXT_PUBLIC_QUARTUS_API_URL;

  // Currency conversion
  const handleConvert = useCallback(async () => {
    if (!amount || isNaN(Number(amount))) return;
    setLoading(true);
    try {
      const { data } = await axios.post(`${base}/common/convert-country-currency`, {
        fromCountryCode: fromCountry,
        toCountryCode: toCountry,
        amount: Number(amount),
      });
      setConverted(data?.data?.convertedAmount || null);
    } catch (error) {
      console.error("Conversion error:", error);
      setConverted(null);
    } finally {
      setLoading(false);
    }
  }, [amount, fromCountry, toCountry, base]);

  useEffect(() => {
    if (amount) handleConvert();
  }, [amount, fromCountry, toCountry, handleConvert]);

  // Time logic
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const selectedCountry = countries.find(c => c.code === toCountry) || countries[0];
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
  const week = `Week ${Math.ceil(countryTime.getDate() / 7) + countryTime.getMonth() * 4}`;

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-5xl m-auto mt-10">
      {/* Currency Exchange Card */}
      <Card className="shadow-md border border-blue-100">
        <CardHeader className="bg-blue-900 text-white rounded-t-lg py-2">
          <CardTitle className="text-center text-sm font-semibold tracking-wide">
            Currency Exchange Rate
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          <div>
            <Label className="text-sm font-medium">Amount</Label>
            <Input
              placeholder="Type amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1"
              type="number"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">From</Label>
            <Select value={fromCountry} onValueChange={setFromCountry}>
              <SelectTrigger className="mt-1">
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

          <div>
            <Label className="text-sm font-medium">To</Label>
            <Select value={toCountry} onValueChange={setToCountry}>
              <SelectTrigger className="mt-1">
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

          {converted !== null && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-center bg-blue-50 text-blue-800 rounded-lg p-3 font-medium shadow-sm"
            >
              {loading
                ? "Converting..."
                : `${amount} ${fromCountry} = ${converted} ${toCountry}`}
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Current Time Card */}
      <Card className="shadow-md border border-blue-100">
        <CardHeader className="bg-blue-900 text-white rounded-t-lg py-2">
          <CardTitle className="text-center text-sm font-semibold tracking-wide">
            Current Time in {selectedCountry.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 text-center">
          <motion.div
            key={hours}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl sm:text-4xl font-bold text-blue-900 bg-blue-100 rounded-lg py-2"
          >
            {hours} <span className="text-sm text-gray-600 align-middle">({selectedCountry.timezone})</span>
          </motion.div>

          <p className="mt-3 text-gray-700">
            {date}, {week}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
