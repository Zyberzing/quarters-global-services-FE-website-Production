import { z } from 'zod';
import { requiredFileSchema } from '../common';

export const passportIndiaNewAdultSchema = z.object({
  serviceType: z.literal('india-passport-new-adult'),

  proofOfAddress: requiredFileSchema,
  birthCertificate: requiredFileSchema,
  aadhaarCard: requiredFileSchema,
  identityProof: requiredFileSchema,
  passportPhotos: requiredFileSchema,
  applicationForm: requiredFileSchema,

  policeVerificationDocument: requiredFileSchema.optional(),
});

export const passportIndiaNewMinorSchema = z.object({
  serviceType: z.literal('india-passport-new-minor'),

  parentsPassportCopies: requiredFileSchema,
  birthCertificate: requiredFileSchema,
  proofOfAddress: requiredFileSchema,
  photos: requiredFileSchema,
  applicationForm: requiredFileSchema,

  parentsConsentForm: requiredFileSchema.optional(),
});

export const passportIndiaRenewalAdultSchema = z.object({
  serviceType: z.literal('adult-renewal'),

  oldPassport: requiredFileSchema,
  proofOfAddress: requiredFileSchema,
  applicationForm: requiredFileSchema,
  passportPhotos: requiredFileSchema,

  policeVerificationDocument: requiredFileSchema.optional(),
});

export const passportIndiaRenewalMinorSchema = z.object({
  serviceType: z.literal('minor-renewal'),

  oldPassportMinor: requiredFileSchema,
  parentsIds: requiredFileSchema,
  proofOfAddress: requiredFileSchema,
  photos: requiredFileSchema,
  applicationForm: requiredFileSchema,

  parentsConsentForm: requiredFileSchema.optional(),
});

export const passportIndiaLostDamagedSchema = z.object({
  serviceType: z.literal('lost-passport-1'),

  policeReport: requiredFileSchema,
  oldPassportCopy: requiredFileSchema.optional(),
  proofOfAddress: requiredFileSchema,
  photos: requiredFileSchema,
  applicationForm: requiredFileSchema,

  newspaperAdvertisement: requiredFileSchema.optional(),
});

export const passportIndiaTatkalSchema = z.object({
  serviceType: z.literal('tatkal-passport'),

  proofOfUrgency: requiredFileSchema,
  aadhaarIdProof: requiredFileSchema,
  policeVerificationDocument: requiredFileSchema,
  applicationForm: requiredFileSchema,
  photos: requiredFileSchema,

  appointmentConfirmationSlip: requiredFileSchema.optional(),
});

export const passportIndiaNameChangeSchema = z.object({
  serviceType: z.literal('india-passport-name-change'),

  currentPassport: requiredFileSchema,
  gazetteLegalNameChangeCertificate: requiredFileSchema,
  marriageDivorceCertificate: requiredFileSchema.optional(),
  photos: requiredFileSchema,

  affidavitForNameChange: requiredFileSchema.optional(),
});

export const indiaSurrenderWithPassportSchema = z.object({
  serviceType: z.literal('surrender-with-indian-passport-1'),

  photograph2x2: requiredFileSchema,
  signature: requiredFileSchema,

  declarationFromOffice: requiredFileSchema,

  addressProof: requiredFileSchema,
  indianPassportOriginal: requiredFileSchema,
  indianPassportCopy: requiredFileSchema,

  usPassportCopy: requiredFileSchema,
  naturalizationCertificate: requiredFileSchema,

  nameChangeDocument: requiredFileSchema.optional(),

  spouseUsPassportCopy: requiredFileSchema.optional(),
  spouseIndianPassportOrOciCopy: requiredFileSchema.optional(),
  marriageCertificate: requiredFileSchema.optional(),

  familyOciCardCopy: requiredFileSchema.optional(),
  previousIndianVisaCopy: requiredFileSchema.optional(),
});

export const indiaSurrenderWithoutPassportSchema = z.object({
  serviceType: z.literal('surrender-without-indian-passport-1'),

  photograph2x2: requiredFileSchema,
  signature: requiredFileSchema,

  declarationFromOffice: requiredFileSchema,

  addressProof: requiredFileSchema,

  usPassportCopy: requiredFileSchema,
  naturalizationCertificate: requiredFileSchema,

  proofOfIndianOrigin: requiredFileSchema,
  policeReport: requiredFileSchema,

  nameChangeDocument: requiredFileSchema.optional(),
});

export const indiaSurrenderMinorPassportSchema = z.object({
  serviceType: z.literal('surrender-minor-indian-passport'),

  indianPassportOriginal: requiredFileSchema,
  indianPassportCopy: requiredFileSchema,

  usPassportCopy: requiredFileSchema,

  parentsNaturalizationCertificate: requiredFileSchema.optional(),
  parentsPassportCopies: requiredFileSchema,

  familyOciCardCopy: requiredFileSchema.optional(),

  parentsAddressProof: requiredFileSchema,

  previousIndianVisaCopy: requiredFileSchema.optional(),

  photographs2x2: requiredFileSchema,

  nameChangeDocument: requiredFileSchema.optional(),

  parentalAuthorizationForm: requiredFileSchema,
  swornAffidavitByParents: requiredFileSchema,
});
