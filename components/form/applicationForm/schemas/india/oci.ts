import { z } from 'zod';
import { requiredFileSchema } from '../common';

export const ociAdultDetailedSchema = z.object({
  serviceType: z.literal('oci-adult-application-checklist'),

  photograph2x2: requiredFileSchema,
  signature: requiredFileSchema,

  currentPassportCopy: requiredFileSchema,
  lastIndianPassportCopyOrSurrenderCert: requiredFileSchema,
  naturalizationCertificate: requiredFileSchema,

  proofOfLegalStatusUSA: requiredFileSchema.optional(),

  birthCertificate: requiredFileSchema,
  maritalStatusProof: requiredFileSchema.optional(),

  nameChangeDocument: requiredFileSchema.optional(),
  employmentOrWorkLetter: requiredFileSchema.optional(),

  parentsAndSpouseDocuments: requiredFileSchema.optional(),
  previousIndianVisaCopy: requiredFileSchema.optional(),

  addressProofUSA: requiredFileSchema,
  nativeAddressDetails: requiredFileSchema.optional(),

  voterRationCardUndertaking: requiredFileSchema,
  ociUndertaking: requiredFileSchema,
  affidavitInLieuOfOriginals: requiredFileSchema,
});

export const ociMinorDetailedSchema = z.object({
  serviceType: z.literal('oci-minor-application-checklist'),

  photograph2x2: requiredFileSchema,
  signature: requiredFileSchema,

  parentalAuthorizationForm: requiredFileSchema,
  parentsAffidavitForMinor: requiredFileSchema,

  currentPassportCopy: requiredFileSchema,
  lastIndianPassportCopyOrSurrenderCert: requiredFileSchema,
  parentsPassportCopies: requiredFileSchema,

  naturalizationCertificateParents: requiredFileSchema.optional(),
  marriageCertificateParents: requiredFileSchema,

  parentsLegalStatusUSA: requiredFileSchema.optional(),

  parentsOciCardCopy: requiredFileSchema.optional(),
  previousIndianVisaCopy: requiredFileSchema.optional(),

  addressProofUSA: requiredFileSchema,
  nativeAddressDetails: requiredFileSchema.optional(),

  voterRationCardUndertaking: requiredFileSchema,
});

export const ociSpouseDetailedSchema = z.object({
  serviceType: z.literal('oci-spouse-foreign-national'),

  ociApplicationForm: requiredFileSchema,
  photograph2x2: requiredFileSchema,
  signature: requiredFileSchema,

  currentPassportCopy: requiredFileSchema,
  birthCertificateApostilled: requiredFileSchema.optional(),

  spouseIndianOriginProof: requiredFileSchema,
  marriageCertificate: requiredFileSchema,

  jointAffidavitOfMarriage: requiredFileSchema,

  legalStatusUSA: requiredFileSchema,
  nameChangeDocument: requiredFileSchema.optional(),

  employmentOrStatusLetter: requiredFileSchema.optional(),
  previousIndianVisaCopy: requiredFileSchema.optional(),

  addressProofUSA: requiredFileSchema,
  nativeAddressDetails: requiredFileSchema.optional(),

  affidavitInLieuOfOriginals: requiredFileSchema,
  applicantUndertaking: requiredFileSchema,
  spouseUndertaking: requiredFileSchema.optional(),
});

export const ociInLieuOfValidPioSchema = z.object({
  serviceType: z.literal('oci-registration-in-lieu-of-pio-card'),

  canceledIndianPassportCopy: requiredFileSchema,
  renunciationCertificate: requiredFileSchema,
  usPassportCopy: requiredFileSchema,

  addressProofUSA: requiredFileSchema,
  birthCertificate: requiredFileSchema,
  naturalizationCertificate: requiredFileSchema,

  nameChangeDocument: requiredFileSchema.optional(),

  parentsAndSpouseDetails: requiredFileSchema.optional(),
  referenceAddressIndia: requiredFileSchema,

  pioCardOriginal: requiredFileSchema,
  photographs2x2: requiredFileSchema,
});

export const ociInLieuOfLostPioSchema = z.object({
  serviceType: z.literal('oci-registration-lostdamaged-pio-card'),

  usPassportCopy: requiredFileSchema,
  addressProofUSA: requiredFileSchema,

  policeReportLostPio: requiredFileSchema,
  naturalizationCertificate: requiredFileSchema,
  birthCertificate: requiredFileSchema,

  nameChangeDocument: requiredFileSchema.optional(),

  parentsAndSpouseDetails: requiredFileSchema.optional(),
  referenceAddressIndia: requiredFileSchema,

  photographs2x2: requiredFileSchema,
});

export const ociLostDamagedSchema = z.object({
  serviceType: z.literal('oci-lostdamaged'),

  usPassportCopy: requiredFileSchema,
  addressProofUSA: requiredFileSchema,

  policeReport: requiredFileSchema,
  naturalizationCertificate: requiredFileSchema,
  birthCertificate: requiredFileSchema,

  nameChangeDocument: requiredFileSchema.optional(),

  parentsAndSpouseDetails: requiredFileSchema.optional(),
  referenceAddressIndia: requiredFileSchema,

  photographs2x2: requiredFileSchema,

  familyOciCardCopy: requiredFileSchema.optional(),
});

export const ociSurrenderSchema = z.object({
  serviceType: z.literal('oci-surrender'),

  originalOciCard: requiredFileSchema,
  drivingLicenseCopy: requiredFileSchema,
});

export const pioToOciSchema = z.object({
  serviceType: z.literal('pio-to-oci-checklist'),

  canceledIndianPassportCopy: requiredFileSchema,
  renunciationCertificate: requiredFileSchema,
  usPassportCopy: requiredFileSchema,

  addressProofUSA: requiredFileSchema,
  birthCertificate: requiredFileSchema,
  naturalizationCertificate: requiredFileSchema,

  nameChangeDocument: requiredFileSchema.optional(),

  parentsAndSpouseDetails: requiredFileSchema.optional(),
  referenceAddressIndia: requiredFileSchema,

  pioCardOriginal: requiredFileSchema,
  photographs2x2: requiredFileSchema,
});

// export const ociMiscAdultSchema = z.object({
//   serviceType: z.literal('oci-misc-adult'),

//   usPassportCopy: requiredFileSchema,
//   addressProofUSA: requiredFileSchema,

//   originalOciCard: requiredFileSchema,
//   naturalizationCertificate: requiredFileSchema,
//   birthCertificate: requiredFileSchema,

//   nameChangeDocument: requiredFileSchema.optional(),

//   parentsAndSpouseDetails: requiredFileSchema.optional(),
//   referenceAddressIndia: requiredFileSchema,

//   affidavitInLieuOfOriginals: requiredFileSchema,
//   photographs2x2: requiredFileSchema,
// });
