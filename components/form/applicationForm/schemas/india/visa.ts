import { z } from 'zod';
import { requiredFileSchema, serviceTypes } from '../common';

// ---- INDIA VISA SCHEMAS ----

// India Tourist Visa
export const visaIndiaTouristSchema = z.object({
  serviceType: z.literal(serviceTypes['tourist-visa']),
  validPassport: requiredFileSchema,
  visaApplicationForm: requiredFileSchema,
  recentPassportPhoto: requiredFileSchema,
  travelItinerary: requiredFileSchema,
  proofOfFunds: requiredFileSchema,
  hotelBookingInvitationLetter: requiredFileSchema,
});

// India Business Visa
export const visaIndiaBusinessSchema = z.object({
  serviceType: z.literal(serviceTypes['business-visa']),
  validPassport: requiredFileSchema,
  visaApplicationForm: requiredFileSchema,
  passportPhotos: requiredFileSchema,
  invitationLetterFromIndianCompany: requiredFileSchema,
  incorporationCertificateOfIndianCompany: requiredFileSchema,
  proofOfFunds: requiredFileSchema,
});

// India Student Visa
export const visaIndiaStudentSchema = z.object({
  serviceType: z.literal(serviceTypes['student-visa']),
  validPassport: requiredFileSchema,
  visaApplicationForm: requiredFileSchema,
  passportPhotos: requiredFileSchema,
  admissionLetterFromIndianInstitution: requiredFileSchema,
  proofOfFunds: requiredFileSchema,
  academicCertificates: requiredFileSchema,
});

// India Medical Visa
export const visaIndiaMedicalSchema = z.object({
  serviceType: z.literal(serviceTypes['medical-visa']),
  validPassport: requiredFileSchema,
  visaApplicationForm: requiredFileSchema,
  passportPhotos: requiredFileSchema,
  medicalTreatmentLetterFromIndianHospital: requiredFileSchema,
  proofOfFunds: requiredFileSchema,
  medicalReports: requiredFileSchema,
});

// India Conference Visa
export const visaIndiaConferenceSchema = z.object({
  serviceType: z.literal(serviceTypes['conference-visa']),
  validPassport: requiredFileSchema,
  visaApplicationForm: requiredFileSchema,
  passportPhotos: requiredFileSchema,
  invitationLetterToConference: requiredFileSchema,
  governmentClearance: requiredFileSchema.optional(),
});

// India Employment Visa
export const visaIndiaEmploymentSchema = z.object({
  serviceType: z.literal(serviceTypes['employment-visa']),
  validPassport: requiredFileSchema,
  visaApplicationForm: requiredFileSchema,
  passportPhotos: requiredFileSchema,
  appointmentLetter: requiredFileSchema,
  companyRegistrationProof: requiredFileSchema,
  proofOfFunds: requiredFileSchema,
});
