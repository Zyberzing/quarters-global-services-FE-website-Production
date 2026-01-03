import { z } from 'zod';
import { requiredFileSchema } from '../common';

export const visaUSB1B2Schema = z.object({
  serviceType: z.literal('b1b2-visitor-visa'),

  validPassport: requiredFileSchema.optional(),
  ds160Confirmation: requiredFileSchema.optional(),
  visaFeeReceipt: requiredFileSchema.optional(),
  passportPhoto: requiredFileSchema.optional(),
  travelItinerary: requiredFileSchema.optional(),
  bankStatements: requiredFileSchema.optional(),
  invitationLetter: requiredFileSchema.optional(),

  employmentProof: requiredFileSchema.optional(),
  propertyOwnershipProof: requiredFileSchema.optional(),
});

export const visaUSStudentSchema = z.object({
  serviceType: z.literal('f1-student-visa'),

  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  sevisFeeReceipt: requiredFileSchema,
  i20Form: requiredFileSchema,
  visaFeeReceipt: requiredFileSchema,
  passportPhoto: requiredFileSchema,
  academicRecords: requiredFileSchema,
  bankStatementsSponsorLetter: requiredFileSchema,

  englishProficiencyProof: requiredFileSchema.optional(),
});

export const visaUSExchangeVisitorSchema = z.object({
  serviceType: z.literal('j1-exchange-visa'),

  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  sevisFeeReceipt: requiredFileSchema,
  ds2019Form: requiredFileSchema,
  passportPhoto: requiredFileSchema,
  sponsorLetter: requiredFileSchema,
  proofOfFunds: requiredFileSchema,

  trainingProgramDetails: requiredFileSchema.optional(),
});

export const visaUSBusinessSchema = z.object({
  serviceType: z.literal('h1b-work-visa'),

  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  i797ApprovalNotice: requiredFileSchema,
  lcaDocument: requiredFileSchema,
  employmentLetter: requiredFileSchema,
  degreesCertificates: requiredFileSchema,
  passportPhoto: requiredFileSchema,

  resumeCV: requiredFileSchema.optional(),
});

export const visaUSTemporaryWorkerSchema = z.object({
  serviceType: z.literal('h2a-h2b-temporary-worker-visa'),

  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  jobOrderOfferLetter: requiredFileSchema,
  passportPhoto: requiredFileSchema,
  previousVisaHistory: requiredFileSchema.optional(),
});

export const visaUSIntraCompanyTransferSchema = z.object({
  serviceType: z.literal('l1-intra-company-transfer'),

  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  i129sI797Approval: requiredFileSchema,
  employmentLetters: requiredFileSchema,
  passportPhoto: requiredFileSchema,

  companyRelationshipProof: requiredFileSchema.optional(),
});

export const visaUSExtraordinaryAbilitySchema = z.object({
  serviceType: z.literal('o1-extraordinary-ability'),

  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  i797Approval: requiredFileSchema,
  evidenceOfExtraordinaryAbility: requiredFileSchema,
  passportPhoto: requiredFileSchema,

  expertOpinionLetters: requiredFileSchema.optional(),
});

export const visaUSAthleteArtistSchema = z.object({
  serviceType: z.literal('p1-p3-athlete-artist-visa'),

  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  i797Approval: requiredFileSchema,
  contractsItinerary: requiredFileSchema,
  passportPhoto: requiredFileSchema,

  eventInvitations: requiredFileSchema.optional(),
});

export const visaUSReligiousWorkerSchema = z.object({
  serviceType: z.literal('r1-religious-worker-visa'),

  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  i797Approval: requiredFileSchema,
  religiousOrganizationLetter: requiredFileSchema,
  passportPhoto: requiredFileSchema,

  religiousQualificationProof: requiredFileSchema.optional(),
});

export const visaUSNAFTASchema = z.object({
  serviceType: z.literal('tntd-nafta-visa'),

  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  offerLetter: requiredFileSchema,
  proofOfCitizenship: requiredFileSchema,
  passportPhoto: requiredFileSchema,
});

export const visaUSImmediateRelativeSchema = z.object({
  serviceType: z.literal('ir-immediate-relative-visa'),

  validPassport: requiredFileSchema,
  ds260Confirmation: requiredFileSchema,
  civilDocuments: requiredFileSchema,
  policeCertificates: requiredFileSchema,
  medicalExam: requiredFileSchema,
  i864AffidavitOfSupport: requiredFileSchema,
  passportPhotos: requiredFileSchema,

  birthCertificate: requiredFileSchema.optional(),
});

export const visaUSFamilyPreferenceSchema = z.object({
  serviceType: z.literal('f1-f4-family-preference-visa'),

  validPassport: requiredFileSchema,
  ds260Confirmation: requiredFileSchema,
  civilDocuments: requiredFileSchema,
  policeCertificates: requiredFileSchema,
  i864AffidavitOfSupport: requiredFileSchema,
  passportPhotos: requiredFileSchema,

  birthCertificate: requiredFileSchema.optional(),
});

export const visaUSEmploymentBasedSchema = z.object({
  serviceType: z.literal('eb1-employment-based-visa'),

  validPassport: requiredFileSchema,
  ds260Confirmation: requiredFileSchema,
  i140Approval: requiredFileSchema,
  academicRecords: requiredFileSchema,
  policeCertificates: requiredFileSchema,
  passportPhotos: requiredFileSchema,

  jobOfferLetter: requiredFileSchema.optional(),
});

export const visaUSDiversityLotterySchema = z.object({
  serviceType: z.literal('dv-lottery-visa'),

  validPassport: requiredFileSchema,
  selectionLetter: requiredFileSchema,
  ds260Confirmation: requiredFileSchema,
  educationWorkProof: requiredFileSchema,
  policeCertificates: requiredFileSchema,
  passportPhotos: requiredFileSchema,
});

export const visaUSFianceSchema = z.object({
  serviceType: z.literal('k1-fiancee-visa-1'),

  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  i129fApproval: requiredFileSchema,
  proofOfRelationship: requiredFileSchema,
  intentToMarryLetters: requiredFileSchema,
  policeCertificates: requiredFileSchema,
  passportPhotos: requiredFileSchema,

  relationshipChatProof: requiredFileSchema.optional(),
});

export const visaUSSpouseSchema = z.object({
  serviceType: z.literal('k3-spouse-visa'),

  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  i129fApproval: requiredFileSchema,
  marriageCertificate: requiredFileSchema,
  relationshipEvidence: requiredFileSchema,
  policeCertificates: requiredFileSchema,
  passportPhotos: requiredFileSchema,
});

export const visaUSWitnessInformantSchema = z.object({
  serviceType: z.literal('s-visa-witnessesinformants'),

  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  lawEnforcementCertification: requiredFileSchema,
  passportPhotos: requiredFileSchema,
});

export const visaUSTraffickingVictimsSchema = z.object({
  serviceType: z.literal('t-visa-trafficking-victims'),

  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  proofOfTrafficking: requiredFileSchema,
  lawEnforcementDocuments: requiredFileSchema,
  passportPhotos: requiredFileSchema,
});

export const visaUSCrimeVictimsSchema = z.object({
  serviceType: z.literal('u-visa-crime-victims'),

  validPassport: requiredFileSchema,
  ds160Confirmation: requiredFileSchema,
  formI918bCertification: requiredFileSchema,
  policeLegalRecords: requiredFileSchema,
  passportPhotos: requiredFileSchema,
});

export const visaUSPetitionerDocumentsSchema = z.object({
  serviceType: z.literal('petitioner-us-citizen-documents'),

  proofOfUSCitizenship: requiredFileSchema,
  marriageCertificate: requiredFileSchema.optional(),
  terminationOfPriorMarriage: requiredFileSchema.optional(),
  passportStylePhoto: requiredFileSchema,
  bonaFideRelationshipEvidence: requiredFileSchema,
});

export const visaUSBeneficiaryDocumentsSchema = z.object({
  serviceType: z.literal('beneficiary-relative-documents'),

  validPassport: requiredFileSchema,
  birthCertificate: requiredFileSchema,
  policeClearance: requiredFileSchema.optional(),
  passportPhotos: requiredFileSchema,
});

export const visaUSFinancialEvidenceSchema = z.object({
  serviceType: z.literal('financial-evidence'),

  taxReturns: requiredFileSchema,
  w2Forms: requiredFileSchema,
  payStubs: requiredFileSchema,
});

export const visaUSAdjustmentOfStatusSchema = z.object({
  serviceType: z.literal('if-adjusting-status-in-the-us'),

  proofOfLawfulEntry: requiredFileSchema,
});

export const visaUSConsularProcessingSchema = z.object({
  serviceType: z.literal('if-applying-from-abroad-consular-processing'),

  visaApplicationForm: requiredFileSchema,
  civilDocuments: requiredFileSchema,
});
