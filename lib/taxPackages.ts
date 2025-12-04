export const taxPackagesWithPrices = {
  personal_tax_filing: 150,
  business_tax_filing: 250,
  licensing_and_certification: 1000,
} as const;

export type TaxPackageType = keyof typeof taxPackagesWithPrices;
