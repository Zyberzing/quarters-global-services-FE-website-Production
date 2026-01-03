import { z } from 'zod';
import { requiredFileSchema } from '../common';

export const passportUSANewDS11Schema = z.object({
  serviceType: z.literal('new-passport'),

  proofOfCitizenship: requiredFileSchema,
  proofOfIdentity: requiredFileSchema,
  passportPhoto2x2: requiredFileSchema,
  socialSecurityNumber: z.string().min(1, 'Social Security Number is required'),
  ds11Form: requiredFileSchema,

  appointmentConfirmation: requiredFileSchema.optional(),
});

export const passportUSARenewalDS82Schema = z.object({
  serviceType: z.literal('renewal'),

  mostRecentPassport: requiredFileSchema,
  passportPhoto2x2: requiredFileSchema,
  ds82Form: requiredFileSchema,
  paymentReceipt: requiredFileSchema,

  nameChangeDocument: requiredFileSchema.optional(),

  oldPassportSubmission: requiredFileSchema.optional(),
});

export const passportUSAChildUnder16Schema = z.object({
  serviceType: z.literal('child-passport'),

  proofOfCitizenship: requiredFileSchema,
  parentsIdCopies: requiredFileSchema,
  parentalConsent: requiredFileSchema,
  passportPhotos: requiredFileSchema,
  ds11Form: requiredFileSchema,

  parentsMarriageCertificate: requiredFileSchema.optional(),
});

export const passportUSALostSchema = z.object({
  serviceType: z.literal('lost-passport'),

  ds64StatementOfLoss: requiredFileSchema,
  ds11Form: requiredFileSchema,
  proofOfCitizenship: requiredFileSchema,
  proofOfIdentity: requiredFileSchema,
  passportPhoto: requiredFileSchema,

  policeReport: requiredFileSchema.optional(),
});

export const passportUSAStolenSchema = z.object({
  serviceType: z.literal('stolen-passport'),

  ds64StatementOfLoss: requiredFileSchema,
  ds11Form: requiredFileSchema,
  proofOfCitizenship: requiredFileSchema,
  proofOfIdentity: requiredFileSchema,
  passportPhoto: requiredFileSchema,

  policeReport: requiredFileSchema.optional(),
});

export const passportUSADamagedSchema = z.object({
  serviceType: z.literal('damaged-passport'),

  ds64StatementOfLoss: requiredFileSchema,
  ds11Form: requiredFileSchema,
  proofOfCitizenship: requiredFileSchema,
  proofOfIdentity: requiredFileSchema,
  passportPhoto: requiredFileSchema,

  damagedPassportSubmission: requiredFileSchema.optional(),
});

export const passportUSACardSchema = z.object({
  serviceType: z.literal('usa-passport-card'),

  ds11OrDs82Form: requiredFileSchema,
  passportPhoto: requiredFileSchema,
  proofOfCitizenship: requiredFileSchema,
  proofOfIdentity: requiredFileSchema,

  previousPassportCopy: requiredFileSchema.optional(),
});

export const passportUSANameChangeCorrectionSchema = z.object({
  serviceType: z.literal('name-change'),

  ds5504Form: requiredFileSchema,
  currentPassport: requiredFileSchema,
  legalNameChangeDocument: requiredFileSchema,

  affidavitForNameChange: requiredFileSchema.optional(),
});

export const passportUSASecondSchema = z.object({
  serviceType: z.literal('second-passport'),

  ds82OrDs11Form: requiredFileSchema,
  currentValidPassport: requiredFileSchema,
  letterOfJustification: requiredFileSchema,
  passportPhoto: requiredFileSchema,

  employerTravelLetter: requiredFileSchema.optional(),
});

export const passportUSASecondValidSchema = z.object({
  serviceType: z.literal('second-valid-passport'),

  ds82OrDs11Form: requiredFileSchema,
  currentValidPassport: requiredFileSchema,
  letterOfJustification: requiredFileSchema,
  passportPhoto: requiredFileSchema,

  employerTravelLetter: requiredFileSchema.optional(),
});

export const passportUSAExpeditedServiceSchema = z.object({
  serviceType: z.literal('expedited-passport-service'),

  proofOfUrgentTravel: requiredFileSchema,
  expeditedFeePayment: requiredFileSchema,
  standardRequiredDocs: requiredFileSchema,

  appointmentConfirmation: requiredFileSchema.optional(),
});

export const passportUSAEmergencySameDaySchema = z.object({
  serviceType: z.literal('emergency-or-same-day-passport'),

  proofOfEmergency: requiredFileSchema,
  proofOfTravel: requiredFileSchema,
  requiredStandardDocs: requiredFileSchema,

  appointmentConfirmation: requiredFileSchema.optional(),
});

export const surrenderWithIndianPassportSchema = z.object({
  serviceType: z.literal('surrender-with-indian-passport'),

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

export const surrenderWithoutIndianPassportSchema = z.object({
  serviceType: z.literal('surrender-without-indian-passport'),

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

export const surrenderMinorPassportSchema = z.object({
  serviceType: z.literal('surrender-minor-passport'),

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
