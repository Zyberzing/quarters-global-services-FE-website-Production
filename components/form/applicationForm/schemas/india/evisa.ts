// =======================================
// INDIA E-TOURIST VISA
// =======================================

import z from 'zod';

// export const ETouristVisaSchema = z.object({
//   serviceType: z.literal('tourist-e-visa'),

//   passportCopy: requiredFileSchema,
//   photograph: requiredFileSchema,
// });

// =======================================
// INDIA E-BUSINESS VISA
// =======================================

// export const EBusinessVisaSchema = z.object({
//   serviceType: z.literal('business-e-visa'),

//   passportCopy: requiredFileSchema,
//   businessCardOrInvitation: requiredFileSchema,
//   photograph: requiredFileSchema,
// });

// =======================================
// INDIA E-MEDICAL VISA
// =======================================

// export const EMedicalVisaSchema = z.object({
//   serviceType: z.literal('medical-e-visa'),

//   passportCopy: requiredFileSchema,
//   hospitalLetter: requiredFileSchema,
//   photograph: requiredFileSchema,
// });

export const emptyVisaSchema = z.object({
  serviceType: z.literal('empty-e-visa'),
});
