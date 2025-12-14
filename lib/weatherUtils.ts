// Weather utility functions for direct third-party API calls

/**
 * Normalize timezone string to a valid IANA timezone
 */
function normalizeTimezone(rawTimezone: string): string {
  // Handle UTC offsets like "UTC+05:30" -> "Asia/Kolkata"
  const tzMap: Record<string, string> = {
    "UTC": "UTC",
    "UTC+00:00": "UTC",
    "UTC+01:00": "Europe/Paris",
    "UTC+02:00": "Europe/Athens",
    "UTC+03:00": "Europe/Moscow",
    "UTC+04:00": "Asia/Dubai",
    "UTC+05:00": "Asia/Karachi",
    "UTC+05:30": "Asia/Kolkata",
    "UTC+06:00": "Asia/Dhaka",
    "UTC+07:00": "Asia/Bangkok",
    "UTC+08:00": "Asia/Singapore",
    "UTC+09:00": "Asia/Tokyo",
    "UTC+10:00": "Australia/Sydney",
    "UTC+11:00": "Pacific/Noumea",
    "UTC+12:00": "Pacific/Fiji",
    "UTC-05:00": "America/New_York",
    "UTC-06:00": "America/Chicago",
    "UTC-07:00": "America/Denver",
    "UTC-08:00": "America/Los_Angeles",
    "UTC-09:00": "America/Anchorage",
    "UTC-10:00": "Pacific/Honolulu",
  };

  return tzMap[rawTimezone] || rawTimezone;
}

/**
 * Convert weather code to human-readable text
 */
function weatherCodeToText(code: number): string {
  const weatherCodes: Record<number, string> = {
    0: "Sunny",
    1: "Mostly cloudy",
    2: "Mostly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Fog",
    51: "Drizzle",
    53: "Drizzle",
    55: "Drizzle",
    61: "Rain",
    63: "Rain",
    65: "Rain",
    66: "Rain",
    67: "Rain",
    71: "Snow",
    73: "Snow",
    75: "Snow",
    77: "Snow",
    80: "Rain showers",
    81: "Rain showers",
    82: "Rain showers",
    85: "Snow",
    86: "Snow",
    95: "Thunderstorm",
    96: "Thunderstorm",
    99: "Thunderstorm",
  };

  return weatherCodes[code] || "Sunny";
}

/**
 * Get week number since start of year
 */
function getWeeksSinceStartOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(diff / oneWeek);
}

export type WeatherForecastDay = {
  date: string;
  day: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
};

export type WeatherForecastResponse = {
  country: string;
  timezone: string;
  totalWeek: number;
  resolvedTimezone: string;
  currentTimeLocal: string;
  currentTimeCST: string;
  currentTimeUTC: string;
  forecast: WeatherForecastDay[];
};

/**
 * Fetch weather forecast directly from third-party APIs
 * @param countryCode - ISO 3166-1 alpha-2 country code (e.g., "US", "IN")
 */
export async function getWeatherForecast(
  countryCode: string
): Promise<WeatherForecastResponse> {
  try {
    // Step 1: Fetch country info from restcountries.com
    const countryRes = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`
    );
    
    if (!countryRes.ok) {
      throw new Error("Failed to fetch country data");
    }
    
    const countryData = await countryRes.json();

    if (!countryData || !countryData[0]) {
      throw new Error("Invalid country code or country data not found");
    }

    const { latlng, timezones, name } = countryData[0];
    const [lat, lon] = latlng;
    const countryName = name?.common || "Unknown";
    const rawTimezone = timezones?.[0] || "UTC";
    const resolvedTimezone = normalizeTimezone(rawTimezone);

    // Step 2: Fetch 7-day forecast from Open-Meteo
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
    const weatherRes = await fetch(weatherUrl);
    
    if (!weatherRes.ok) {
      throw new Error("Failed to fetch weather data");
    }
    
    const weatherData = await weatherRes.json();

    const forecast: WeatherForecastDay[] = weatherData.daily.time.map(
      (date: string, i: number) => {
        const dayName = new Intl.DateTimeFormat("en-US", {
          weekday: "long",
        }).format(new Date(date));
        return {
          date,
          day: dayName,
          minTemp: weatherData.daily.temperature_2m_min[i],
          maxTemp: weatherData.daily.temperature_2m_max[i],
          condition: weatherCodeToText(weatherData.daily.weathercode[i]),
        };
      }
    );

    // Step 3: Generate time data dynamically per country
    let currentTimeLocal: string;
    try {
      currentTimeLocal = new Intl.DateTimeFormat("en-US", {
        timeZone: resolvedTimezone,
        dateStyle: "full",
      }).format(new Date());
    } catch {
      // fallback if timezone still invalid
      currentTimeLocal = new Intl.DateTimeFormat("en-US", {
        timeZone: "UTC",
        dateStyle: "full",
      }).format(new Date());
    }

    // Central Standard Time (fixed reference)
    const currentTimeCST = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      dateStyle: "full",
    }).format(new Date());

    // UTC
    const currentTimeUTC = new Date().toISOString();

    const totalWeek = getWeeksSinceStartOfYear();

    // Step 4: Return clean structured data
    return {
      country: countryName,
      timezone: rawTimezone,
      totalWeek,
      resolvedTimezone,
      currentTimeLocal,
      currentTimeCST,
      currentTimeUTC,
      forecast,
    };
  } catch (error) {
    console.error("Error in getWeatherForecast:", error);
    throw error;
  }
}

