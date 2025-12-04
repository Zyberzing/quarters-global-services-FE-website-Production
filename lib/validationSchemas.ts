import * as z from "zod";

export const addressSchema = z.object({
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().regex(/^\d{5}$/, "ZIP code must be exactly 5 digits"),
  country: z.string().min(1, "Country is required"),
});

export const step1Schema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\+?\d{10,15}$/, "Invalid phone number format"),
  company: z.string().min(1, "Company is required"),
  departureDate: z.string().regex(
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
    "Date must be in YYYY-MM-DD format"
  ),
  physicalAddress: addressSchema,
  currentLegalAddress: addressSchema,
});

export const step2Schema = z.object({
  applicationType: z.string().min(1, "Application type is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  nationality: z.string().min(1, "Nationality is required"),
  phone: z.string().min(5, "Contact number is required"),
  email: z.string().email("Invalid email address"),
  usPassportNumber: z.string().min(1, "Passport number is required"),
  placeOfIssue: z.string().min(1, "Place of issue is required"),
  dateOfIssue: z.string().min(1, "Date of issue is required"),
  dateOfExpiry: z.string().min(1, "Date of expiry is required"),
});


export const stepOtherDetailsSchema = z.object({
  // Yes/No Questions
  appliedEarlier: z.boolean(),
  surrenderedOci: z.boolean(),
  citizenOfPakBangladesh: z.boolean(),
  parentsFromPakBangladesh: z.boolean(),
  workedInForces: z.boolean(),

  // Text fields
  presentNationality: z.string().min(2, "Nationality is required"),
  referenceName: z.string().min(2, "Name is required"),
  referenceAddress: z.string().min(5, "Address is required"),
  referenceRelationship: z.string().min(2, "Relationship is required"),
  referenceAge: z
    .string()
    .regex(/^\d+$/, "Age must be numeric")
    .optional(),

  // Family details checkboxes
  familyDetails: z.array(z.enum(["Birth", "Descent", "Registration", "Naturalisation"])),

  // More Yes/No
  soughtAsylum: z.boolean(),
  convicted: z.boolean(),
  refusedEntry: z.boolean(),
  ngoViolation: z.boolean(),
  humanTrafficking: z.boolean(),
  cybercrime: z.boolean(),
  glorifyTerrorism: z.boolean(),
  criminalPending: z.boolean(),

  // OCI Card holder family member
  familyFullName: z.string().optional(),
  ociCardRefNo: z.string().optional(),
  placeOfIssue: z.string().optional(),
});

 

export const step1Schema2 = z.object({
  applicationType: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  maritalStatus: z.string().optional(),
  nationality: z.string().optional(),
  phone: z.string().min(5, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  usPassportNumber: z.string().optional(),
  placeOfIssue: z.string().optional(),
  dateOfIssue: z.string().optional(),
  dateOfExpiry: z.string().optional(),
  departureDate: z.string().optional(),
  physicalAddress: z.object({
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
  }),
  currentLegalAddress: z.object({
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
  }),
});

export type Step1Data2 = z.infer<typeof step1Schema2>;
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type StepOtherDetailsData = z.infer<typeof stepOtherDetailsSchema>;

