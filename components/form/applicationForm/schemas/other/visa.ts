import { z } from 'zod';
import { requiredFileSchema } from '../common';

export const visaCanadaVisitorSchema = z.object({
  serviceType: z.literal('canada-visitor-visa'),

  validPassport: requiredFileSchema,
  visaApplicationForm: requiredFileSchema,
  passportPhotos: requiredFileSchema,
  proofOfFunds: requiredFileSchema,
  travelItinerary: requiredFileSchema,
});

export const visaCanadaStudentSchema = z.object({
  serviceType: z.literal('canada-student-visa'),

  validPassport: requiredFileSchema,
  visaApplicationForm: requiredFileSchema,
  passportPhotos: requiredFileSchema,
  admissionLetter: requiredFileSchema,
  proofOfFunds: requiredFileSchema,
});

export const visaCanadaWorkPermitSchema = z.object({
  serviceType: z.literal('canada-work-permit'),

  validPassport: requiredFileSchema,
  visaApplicationForm: requiredFileSchema,
  jobOfferLetter: requiredFileSchema,
  passportPhotos: requiredFileSchema,
});

export const visaCanadaPRSchema = z.object({
  serviceType: z.literal('canada-permanent-residency'),

  validPassport: requiredFileSchema,
  applicationForm: requiredFileSchema,
  passportPhotos: requiredFileSchema,
  proofOfFunds: requiredFileSchema,
});

export const visaUKTouristSchema = z.object({
  serviceType: z.literal('uk-tourist-visa'),

  validPassport: requiredFileSchema,
  visaApplicationForm: requiredFileSchema,
  passportPhotos: requiredFileSchema,
  travelItinerary: requiredFileSchema,
  proofOfFunds: requiredFileSchema,
});

export const visaUKStudentSchema = z.object({
  serviceType: z.literal('uk-student-visa'),

  validPassport: requiredFileSchema,
  visaApplicationForm: requiredFileSchema,
  passportPhotos: requiredFileSchema,
  casLetter: requiredFileSchema,
  proofOfFunds: requiredFileSchema,
});

export const visaUKWorkSchema = z.object({
  serviceType: z.literal('uk-work-visa'),

  validPassport: requiredFileSchema,
  visaApplicationForm: requiredFileSchema,
  jobOfferLetter: requiredFileSchema,
  passportPhotos: requiredFileSchema,
});

export const visaUKDependentSchema = z.object({
  serviceType: z.literal('uk-dependent-visa'),

  validPassport: requiredFileSchema,
  visaApplicationForm: requiredFileSchema,
  relationshipProof: requiredFileSchema,
  passportPhotos: requiredFileSchema,
});

export const visaSchengenTouristSchema = z.object({
  serviceType: z.literal('schengen-tourist-visa'),

  validPassport: requiredFileSchema,
  visaApplicationForm: requiredFileSchema,
  passportPhotos: requiredFileSchema,
  travelItinerary: requiredFileSchema,
  travelInsurance: requiredFileSchema,
});

export const visaSchengenBusinessSchema = z.object({
  serviceType: z.literal('schengen-business-visa'),

  validPassport: requiredFileSchema,
  visaApplicationForm: requiredFileSchema,
  invitationLetter: requiredFileSchema,
  passportPhotos: requiredFileSchema,
  travelInsurance: requiredFileSchema,
});

export const visaSchengenStudentSchema = z.object({
  serviceType: z.literal('schengen-student-visa'),

  validPassport: requiredFileSchema,
  visaApplicationForm: requiredFileSchema,
  admissionLetter: requiredFileSchema,
  passportPhotos: requiredFileSchema,
  travelInsurance: requiredFileSchema,
});
