import { z } from 'zod';
import { requiredFileSchema } from '../common';

// =======================================
// RENUNCIATION OF INDIAN CITIZENSHIP
// =======================================

export const renunciationIndianCitizenshipSchema = z.object({
  serviceType: z.literal('renunciation-indian-citizenship'),

  renunciationApplicationForm: requiredFileSchema,
  indianPassportOriginal: requiredFileSchema,
  foreignPassportCopy: requiredFileSchema,
  naturalizationCertificate: requiredFileSchema,
  photograph: requiredFileSchema,
});

// =======================================
// POLICE CLEARANCE CERTIFICATE (PCC)
// =======================================

export const policeClearanceCertificateSchema = z.object({
  serviceType: z.literal('police-clearance-certificate'),

  pccApplicationForm: requiredFileSchema,
  passportCopy: requiredFileSchema,
  addressProof: requiredFileSchema,
  photograph: requiredFileSchema,
});

// =======================================
// GLOBAL ENTRY PROGRAM (GEP)
// =======================================

export const globalEntryProgramSchema = z.object({
  serviceType: z.literal('global-entry-program'),

  gepApplicationForm: requiredFileSchema,
  passportCopy: requiredFileSchema,
  visaCopy: requiredFileSchema.optional(),
  addressProof: requiredFileSchema,
});
