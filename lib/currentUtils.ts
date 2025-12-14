// Currency conversion utility functions for direct third-party API calls

export type CurrencyConversionResponse = {
  fromCountry: string;
  toCountry: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  rate: number;
  convertedAmount: number;
};

/**
 * Convert currency between two countries using third-party APIs
 * @param fromCountryCode - ISO 3166-1 alpha-2 country code (e.g., "US")
 * @param toCountryCode - ISO 3166-1 alpha-2 country code (e.g., "IN")
 * @param amount - Amount to convert
 */
export async function convertCountryCurrency(
  fromCountryCode: string,
  toCountryCode: string,
  amount: number
): Promise<CurrencyConversionResponse> {
  try {
    // 1️⃣ Get currency code for 'from' country
    const fromRes = await fetch(
      `https://restcountries.com/v3.1/alpha/${fromCountryCode}`
    );
    
    if (!fromRes.ok) {
      throw new Error(`Failed to fetch data for country: ${fromCountryCode}`);
    }
    
    const fromData = await fromRes.json();
    if (!fromData || !fromData[0] || !fromData[0].currencies) {
      throw new Error(
        `Cannot find currency for country code: ${fromCountryCode}`
      );
    }
    const fromCurrencyCode = Object.keys(fromData[0].currencies)[0];

    // 2️⃣ Get currency code for 'to' country
    const toRes = await fetch(
      `https://restcountries.com/v3.1/alpha/${toCountryCode}`
    );
    
    if (!toRes.ok) {
      throw new Error(`Failed to fetch data for country: ${toCountryCode}`);
    }
    
    const toData = await toRes.json();
    if (!toData || !toData[0] || !toData[0].currencies) {
      throw new Error(
        `Cannot find currency for country code: ${toCountryCode}`
      );
    }
    const toCurrencyCode = Object.keys(toData[0].currencies)[0];

    // 3️⃣ Get exchange rate from fallback API
    const fallbackRes = await fetch(
      `https://open.er-api.com/v6/latest/${fromCurrencyCode}`
    );
    
    if (!fallbackRes.ok) {
      throw new Error("Failed to fetch exchange rate");
    }
    
    const fallbackData = await fallbackRes.json();
    if (fallbackData.result !== "success") {
      throw new Error("Failed to fetch exchange rate from fallback API");
    }

    const rate = fallbackData.rates[toCurrencyCode];
    if (!rate) throw new Error(`Exchange rate not found for ${toCurrencyCode}`);

    const convertedAmount = amount * rate;

    // 4️⃣ Return structured result
    return {
      fromCountry: fromData[0].name.common,
      toCountry: toData[0].name.common,
      fromCurrency: fromCurrencyCode,
      toCurrency: toCurrencyCode,
      amount,
      rate,
      convertedAmount,
    };
  } catch (error) {
    console.error("Error in convertCountryCurrency:", error);
    throw error;
  }
}

