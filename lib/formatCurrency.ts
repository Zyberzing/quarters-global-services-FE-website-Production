export const formatCurrency = ({
  amount,
  currency = 'USD',
  locale = 'de-DE',
}: {
  amount: number | string;
  currency?: string;
  locale?: string;
}): string => {
  const numericAmount = Number(amount);
  const hasDecimal = numericAmount % 1 !== 0;

  // Format number WITHOUT currency
  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: hasDecimal ? 2 : 0,
    useGrouping: true,
  }).format(numericAmount);

  // Get currency symbol
  const currencySymbol = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  })
    .formatToParts(0)
    .find((p) => p.type === 'currency')?.value;

  return `${formattedNumber} ${currencySymbol}`;
};
