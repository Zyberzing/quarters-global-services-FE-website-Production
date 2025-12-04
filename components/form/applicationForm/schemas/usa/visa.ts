import { z } from 'zod';
import { requiredFileSchema, serviceTypes } from '../common';

// ---- USA VISA SCHEMAS ----

// US Visitor Visa (B1/B2) - Tourist Visa
export const visaUSB1B2Schema = z.object({
  serviceType: z.literal(serviceTypes['b1b2-visitor-visa']),
  validPassport: requiredFileSchema.optional(),
  ds160Confirmation: requiredFileSchema.optional(),
  visaFeeReceipt: requiredFileSchema.optional(),
  passportPhoto: requiredFileSchema.optional(),
  travelItinerary: requiredFileSchema.optional(),
  bankStatements: requiredFileSchema.optional(),
  invitationLetter: requiredFileSchema.optional(),
});

// US Student Visa (F1/M1)
export const visaUSStudentSchema = z.object({
  serviceType: z.literal(serviceTypes['f1-student-visa']),
  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  sevisFeeReceipt: requiredFileSchema,
  i20Form: requiredFileSchema,
  visaFeeReceipt: requiredFileSchema,
  passportPhoto: requiredFileSchema,
  academicRecords: requiredFileSchema,
  bankStatementsSponsorLetter: requiredFileSchema,
});

// US Exchange Visitor Visa (J1)
export const visaUSExchangeVisitorSchema = z.object({
  serviceType: z.literal(serviceTypes['j1-exchange-visitor-visa']),
  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  sevisFeeReceipt: requiredFileSchema,
  ds2019Form: requiredFileSchema,
  passportPhoto: requiredFileSchema,
  sponsorLetter: requiredFileSchema,
  proofOfFunds: requiredFileSchema,
});

// US Business Visa (H1B)
export const visaUSBusinessSchema = z.object({
  serviceType: z.literal(serviceTypes['h1b-business-visa']),
  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  i797ApprovalNotice: requiredFileSchema,
  lcaDocument: requiredFileSchema,
  employmentLetter: requiredFileSchema,
  degreesCertificates: requiredFileSchema,
  passportPhoto: requiredFileSchema,
});

// US Temporary Worker Visa (H2A/H2B)
export const visaUSTemporaryWorkerSchema = z.object({
  serviceType: z.literal(serviceTypes['h2a-h2b-temporary-worker-visa']),
  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  jobOrderOfferLetter: requiredFileSchema,
  passportPhoto: requiredFileSchema,
  previousVisaHistory: requiredFileSchema,
});

// US Intra-Company Transfer (L1)
export const visaUSIntraCompanyTransferSchema = z.object({
  serviceType: z.literal(serviceTypes['l1-intra-company-transfer']),
  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  i129sI797Approval: requiredFileSchema,
  employmentLetters: requiredFileSchema,
  passportPhoto: requiredFileSchema,
});

// US Extraordinary Ability (O1)
export const visaUSExtraordinaryAbilitySchema = z.object({
  serviceType: z.literal(serviceTypes['o1-extraordinary-ability']),
  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  i797Approval: requiredFileSchema,
  evidenceOfExtraordinaryAbility: requiredFileSchema,
  passportPhoto: requiredFileSchema,
});

// US Athlete/Artist Visa (P1/P3)
export const visaUSAthleteArtistSchema = z.object({
  serviceType: z.literal(serviceTypes['p1-p3-athlete-artist-visa']),
  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  i797Approval: requiredFileSchema,
  contractsItinerary: requiredFileSchema,
  passportPhoto: requiredFileSchema,
});

// US Religious Worker Visa (R1)
export const visaUSReligiousWorkerSchema = z.object({
  serviceType: z.literal(serviceTypes['r1-religious-worker-visa']),
  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  i797Approval: requiredFileSchema,
  religiousOrganizationLetter: requiredFileSchema,
  passportPhoto: requiredFileSchema,
});

// US NAFTA Visa (TN/TD)
export const visaUSNAFTASchema = z.object({
  serviceType: z.literal(serviceTypes['tn-td-nafta-visa']),
  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  offerLetter: requiredFileSchema,
  proofOfCitizenship: requiredFileSchema,
  passportPhoto: requiredFileSchema,
});

// US Immediate Relative Visa (IR)
export const visaUSImmediateRelativeSchema = z.object({
  serviceType: z.literal(serviceTypes['ir-immediate-relative-visa']),
  validPassport: requiredFileSchema,
  ds260Confirmation: requiredFileSchema,
  civilDocuments: requiredFileSchema,
  policeCertificates: requiredFileSchema,
  medicalExam: requiredFileSchema,
  i864AffidavitOfSupport: requiredFileSchema,
  passportPhotos: requiredFileSchema,
});

// US Family Preference Visa (F1-F4)
export const visaUSFamilyPreferenceSchema = z.object({
  serviceType: z.literal(serviceTypes['f1-f4-family-preference-visa']),
  validPassport: requiredFileSchema,
  ds260Confirmation: requiredFileSchema,
  civilDocuments: requiredFileSchema,
  policeCertificates: requiredFileSchema,
  i864AffidavitOfSupport: requiredFileSchema,
  passportPhotos: requiredFileSchema,
});

// US Employment-Based Visa (EB1-EB5)
export const visaUSEmploymentBasedSchema = z.object({
  serviceType: z.literal(serviceTypes['eb1-eb5-employment-based-visa']),
  validPassport: requiredFileSchema,
  ds260Confirmation: requiredFileSchema,
  i140Approval: requiredFileSchema,
  jobOfferLetter: requiredFileSchema.optional(),
  academicRecords: requiredFileSchema,
  policeCertificates: requiredFileSchema,
  passportPhotos: requiredFileSchema,
});

// US Diversity Lottery Visa (DV)
export const visaUSDiversityLotterySchema = z.object({
  serviceType: z.literal(serviceTypes['dv-diversity-lottery-visa']),
  validPassport: requiredFileSchema,
  selectionLetter: requiredFileSchema,
  ds260Confirmation: requiredFileSchema,
  educationWorkProof: requiredFileSchema,
  policeCertificates: requiredFileSchema,
  passportPhotos: requiredFileSchema,
});

// US Fiancé(e) Visa (K1)
export const visaUSFianceSchema = z.object({
  serviceType: z.literal(serviceTypes['k1-fiance-visa']),
  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  i129fApproval: requiredFileSchema,
  proofOfRelationship: requiredFileSchema,
  intentToMarryLetters: requiredFileSchema,
  policeCertificates: requiredFileSchema,
  passportPhotos: requiredFileSchema,
});

// US Spouse Visa (K3)
export const visaUSSpouseSchema = z.object({
  serviceType: z.literal(serviceTypes['k3-spouse-visa']),
  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  i129fApproval: requiredFileSchema,
  marriageCertificate: requiredFileSchema,
  relationshipEvidence: requiredFileSchema,
  policeCertificates: requiredFileSchema,
  passportPhotos: requiredFileSchema,
});

// US Witness/Informant Visa (S)
export const visaUSWitnessInformantSchema = z.object({
  serviceType: z.literal(serviceTypes['s-witness-informant-visa']),
  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  lawEnforcementCertification: requiredFileSchema,
  passportPhotos: requiredFileSchema,
});

// US Victims of Trafficking Visa (T)
export const visaUSTraffickingVictimsSchema = z.object({
  serviceType: z.literal(serviceTypes['t-trafficking-victims-visa']),
  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  proofOfTrafficking: requiredFileSchema,
  lawEnforcementDocuments: requiredFileSchema,
  passportPhotos: requiredFileSchema,
});

// US Victims of Crimes Visa (U)
export const visaUSCrimeVictimsSchema = z.object({
  serviceType: z.literal(serviceTypes['u-crime-victims-visa']),
  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  formI918bCertification: requiredFileSchema,
  policeLegalRecords: requiredFileSchema,
  passportPhotos: requiredFileSchema,
});
