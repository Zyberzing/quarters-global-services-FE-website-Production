import { z } from "zod";
import { FieldConfig } from "@/components/DynamicForm/DynamicForm";

// ---------- Common Applicant Fields ----------
export const commonApplicantSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  countryCode: z.string(),
  phone: z.string(),
  status: z.string(),
});

export const commonApplicantFields: FieldConfig[] = [
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "countryCode", label: "Country Code", type: "text" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "status", label: "Status", type: "text" },
];

// ---------- OCI ----------
export const ociSchema = z.object({
  serviceType: z.string(),
  applicationType: z.string(),
  maritalStatus: z.string().optional(),
  nationality: z.string(),
  passportNumber: z.string(),
  placeOfIssue: z.string(),
  issueDate: z.string(),
  expiryDate: z.string(),
  currentResidentialAddress: z.string(),
  relativeName: z.string(),
  relativeDob: z.string(),
  relativeGender: z.string(),
  relationship: z.string(),
  referenceAddress: z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    contactNumber: z.string(),
  }),
  appliedEarlier: z.boolean(),
  surrenderedEarlier: z.boolean(),
  citizenPakistanBangladesh: z.boolean(),
  parentsFromPakistanBangladesh: z.boolean(),
  workedInForces: z.boolean(),
  acquisitionNationality: z.string(),
  asylum: z.boolean(),
  convicted: z.boolean(),
  refusedEntry: z.boolean(),
  associatedWithNGO: z.boolean(),
  humanTraffickingFraud: z.boolean(),
  cybercrimeTerrorism: z.boolean(),
  glorifiedTerrorism: z.boolean(),
  criminalProceedingsPending: z.boolean(),
});

export const ociFields: FieldConfig[] = [
  { name: "applicationType", label: "Application Type", type: "text" },
  { name: "maritalStatus", label: "Marital Status", type: "text" },
  { name: "nationality", label: "Nationality", type: "text" },
  { name: "passportNumber", label: "Passport Number", type: "text" },
  { name: "placeOfIssue", label: "Place of Issue", type: "text" },
  { name: "issueDate", label: "Issue Date", type: "date" },
  { name: "expiryDate", label: "Expiry Date", type: "date" },
  { name: "currentResidentialAddress", label: "Current Residential Address", type: "text" },
  { name: "relativeName", label: "Relative Name", type: "text" },
  { name: "relativeDob", label: "Relative Date of Birth", type: "date" },
  { name: "relativeGender", label: "Relative Gender", type: "text" },
  { name: "relationship", label: "Relationship", type: "text" },
  { name: "referenceAddress.address", label: "Reference Address", type: "text" },
  { name: "referenceAddress.city", label: "Reference City", type: "text" },
  { name: "referenceAddress.state", label: "Reference State", type: "text" },
  { name: "referenceAddress.contactNumber", label: "Reference Contact Number", type: "text" },
  { name: "appliedEarlier", label: "Applied Earlier", type: "checkbox" },
  { name: "surrenderedEarlier", label: "Surrendered Earlier", type: "checkbox" },
  { name: "citizenPakistanBangladesh", label: "Citizen of Pakistan/Bangladesh", type: "checkbox" },
  { name: "parentsFromPakistanBangladesh", label: "Parents from Pakistan/Bangladesh", type: "checkbox" },
  { name: "workedInForces", label: "Worked in Forces", type: "checkbox" },
  { name: "acquisitionNationality", label: "Acquisition of Nationality", type: "text" },
  { name: "asylum", label: "Asylum", type: "checkbox" },
  { name: "convicted", label: "Convicted", type: "checkbox" },
  { name: "refusedEntry", label: "Refused Entry", type: "checkbox" },
  { name: "associatedWithNGO", label: "Associated with NGO", type: "checkbox" },
  { name: "humanTraffickingFraud", label: "Human Trafficking/Fraud", type: "checkbox" },
  { name: "cybercrimeTerrorism", label: "Cybercrime/Terrorism", type: "checkbox" },
  { name: "glorifiedTerrorism", label: "Glorified Terrorism", type: "checkbox" },
  { name: "criminalProceedingsPending", label: "Criminal Proceedings Pending", type: "checkbox" },
];

export const ociSchemaWithCommon = commonApplicantSchema.merge(ociSchema);
export const ociFieldsWithCommon = [...commonApplicantFields, ...ociFields];

// ---------- Visa ----------
export const visaSchema = z.object({
  serviceType: z.string(), supportingDocs: z.array(z.string()),
  company: z.string().optional(),
});
export const visaFields: FieldConfig[] = [
  { name: "supportingDocs", label: "Supporting Docs (comma separated)", type: "text" },
  { name: "company", label: "Company", type: "text" },
];

export const visaSchemaWithCommon = commonApplicantSchema.merge(visaSchema);
export const visaFieldsWithCommon = [...commonApplicantFields, ...visaFields];

// ---------- Apostille ----------
export const apostilleSchema = z.object({
  serviceType: z.string(),
  destinationCountry: z.string(),
  documentCount: z.string(),
});
export const apostilleFields: FieldConfig[] = [
  { name: "destinationCountry", label: "Destination Country", type: "text" },
  { name: "documentCount", label: "Document Count", type: "text" },
];
export const apostilleSchemaWithCommon = commonApplicantSchema.merge(apostilleSchema);
export const apostilleFieldsWithCommon = [...commonApplicantFields, ...apostilleFields];

// ---------- Courier ----------
export const courierSchema = z.object({
  // 🧩 Sender Details
  senderName: z.string().min(1, "Sender Name is required"),
  senderPhone: z.string().min(1, "Sender Phone is required"),
  senderAddress: z.string().min(1, "Sender Address is required"),
  senderCity: z.string().min(1, "Sender City is required"),
  senderState: z.string().min(1, "Sender State is required"),
  senderCountry: z.string().min(1, "Sender Country is required"),

  // 🧩 Recipient Details
  recipientName: z.string().min(1, "Recipient Name is required"),
  recipientPhone: z.string().min(1, "Recipient Phone is required"),
  recipientAddress: z.string().min(1, "Recipient Address is required"),
  recipientCity: z.string().min(1, "Recipient City is required"),
  recipientState: z.string().min(1, "Recipient State is required"),
  recipientCountry: z.string().min(1, "Recipient Country is required"),

  // 🧩 Courier Info
  serviceType: z.string().min(1, "Service Type is required"),
  deliveryType: z.string().min(1, "Delivery Type is required"),
  preferredCourier: z.string().min(1, "Preferred Courier is required"),
  pagesOrEnvelopes: z.string().min(1, "Pages/Envelopes count is required"),
  trackingNumber: z.string().min(1, "Tracking Number is required"),

  // 🧩 Optional Fields
  documents: z.any().optional(), // for file/image upload
});

export const courierFields = [
  // Sender Details
  { name: "senderName", label: "Sender Name", type: "text" },
  { name: "senderPhone", label: "Sender Phone", type: "text" },
  { name: "senderAddress", label: "Sender Address", type: "text" },
  { name: "senderCity", label: "Sender City", type: "text" },
  { name: "senderState", label: "Sender State", type: "text" },
  { name: "senderCountry", label: "Sender Country", type: "text" },

  // Recipient Details
  { name: "recipientName", label: "Recipient Name", type: "text" },
  { name: "recipientPhone", label: "Recipient Phone", type: "text" },
  { name: "recipientAddress", label: "Recipient Address", type: "text" },
  { name: "recipientCity", label: "Recipient City", type: "text" },
  { name: "recipientState", label: "Recipient State", type: "text" },
  { name: "recipientCountry", label: "Recipient Country", type: "text" },

  // Courier Info
  { name: "serviceType", label: "Service Type", type: "text" },
  { name: "deliveryType", label: "Delivery Type", type: "text" },
  { name: "preferredCourier", label: "Preferred Courier", type: "text" },
  { name: "pagesOrEnvelopes", label: "Pages / Envelopes", type: "number" },
  { name: "trackingNumber", label: "Tracking Number", type: "text" },

  // Optional upload field
  { name: "documents", label: "Upload Documents", type: "file" },
];

export const courierSchemaWithCommon = commonApplicantSchema.merge(courierSchema);
export const courierFieldsWithCommon = [...commonApplicantFields, ...courierFields];

// ---------- Vehicle ----------
export const vehicleSchema = z.object({
  vehicleType: z.string().min(1, "Vehicle Type is required"),
  numberOfPassengers: z.string().min(1, "Number of Passengers is required"),

  pickUpDate: z.string().min(1, "Pick-up Date is required"),
  dropDate: z.string().min(1, "Drop Date is required"),

  pickupLocation: z.string().min(1, "Pickup Location is required"),
  dropOffLocation: z.string().min(1, "Drop off Location is required"),

  purpose: z.string().min(1, "Purpose is required"),
  preferredDriver: z.string().min(1, "Preferred Driver is required"),
});
export const vehicleFields: FieldConfig[] = [
  { name: "vehicleType", label: "Vehicle Type", type: "text" },
  { name: "numberOfPassengers", label: "Number of Passengers", type: "number" },
  { name: "pickUpDate", label: "Pick-up Date", type: "date" },
  { name: "dropDate", label: "Drop Date", type: "date" },
  { name: "pickupLocation", label: "Pickup Location", type: "text" },
  { name: "dropOffLocation", label: "Drop off Location", type: "text" },
  { name: "purpose", label: "Purpose", type: "text" },
  { name: "preferredDriver", label: "Preferred Driver", type: "text" },
];


export const vehicleSchemaWithCommon = commonApplicantSchema.merge(vehicleSchema);
export const vehicleFieldsWithCommon = [...commonApplicantFields, ...vehicleFields];

// ---------- Flight Charter ----------
export const flightCharterSchema = z.object({
  // Common Passenger Info
  charterType: z.string().min(1, 'Charter Type is required'),
  numberOfPassengers: z.string().min(1, 'Number of Passengers is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  passengerName: z.string().min(1, 'Passenger Name is required'),
  email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  countryCode: z.string().optional(),
  totalPassenger: z.string().min(1, 'Total Passenger is required'),
  specialRequirements: z.string().min(1, 'Special Requirements is required'),
  travelInsurance: z.string().min(1, 'Travel Insurance selection is required'),
  returnTrip: z.string().min(1, 'Return Trip selection is required'),

  // Flight Charter Specific Fields
  serviceType: z.string().min(1, 'Service Type is required'),
});

export const flightCharterFields = [
  // Common Passenger Fields
  { name: "charterType", label: "Charter Type", type: "text" },
  { name: "numberOfPassengers", label: "Number of Passengers", type: "number" },
  { name: "date", label: "Date", type: "date" },
  { name: "time", label: "Time", type: "time" },
  { name: "passengerName", label: "Passenger Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "text" },
  { name: "countryCode", label: "Country Code", type: "text" },
  { name: "totalPassenger", label: "Total Passengers", type: "number" },
  { name: "specialRequirements", label: "Special Requirements", type: "textarea" },
  { name: "travelInsurance", label: "Travel Insurance", type: "text" },
  { name: "returnTrip", label: "Return Trip", type: "text" },

  // Flight Charter Specific Fields
  { name: "serviceType", label: "Service Type", type: "text" },
];

export const flightCharterSchemaWithCommon = commonApplicantSchema.merge(flightCharterSchema);
export const flightCharterFieldsWithCommon = [...commonApplicantFields, ...flightCharterFields];

// ---------- Event ----------
export const eventSchema = z.object({
  serviceType: z.string(),
  eventType: z.string(),
  organizerName: z.string(),
  eventDate: z.string(),
  time: z.string(),
});
export const eventFields: FieldConfig[] = [
  { name: "eventType", label: "Event Type", type: "text" },
  { name: "organizerName", label: "Organizer Name", type: "text" },
  { name: "eventDate", label: "Event Date", type: "text" },
  { name: "time", label: "Time", type: "text" },
];
export const eventSchemaWithCommon = commonApplicantSchema.merge(eventSchema);
export const eventFieldsWithCommon = [...commonApplicantFields, ...eventFields];

// ---------- Consultancy ----------
export const consultancySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone Number is required'),
  countryCode: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  consultancyType: z.string().min(1, 'Consultancy Type is required'),
  appointmentMode: z.string().min(1, 'Preferred Appointment Mode is required'),
  appointmentDatePreference: z.string().min(1, 'Appointment Date Preference is required'),
  message: z.string().optional(),
  serviceType: z.string(),
  inquiryType: z.string(),
  purpose: z.string(),
});
export const consultancyFields = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "text" },
  { name: "countryCode", label: "Country Code", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "state", label: "State", type: "text" },
  { name: "consultancyType", label: "Consultancy Type", type: "text" },
  { name: "appointmentMode", label: "Preferred Appointment Mode", type: "text" },
  { name: "appointmentDatePreference", label: "Appointment Date Preference", type: "date" },
  { name: "message", label: "Message", type: "textarea" },
  { name: "serviceType", label: "Service Type", type: "text" },
  { name: "inquiryType", label: "Inquiry Type", type: "text" },
  { name: "purpose", label: "Purpose", type: "text" },
];

export const consultancySchemaWithCommon = commonApplicantSchema.merge(consultancySchema);
export const consultancyFieldsWithCommon = [...commonApplicantFields, ...consultancyFields];

// ---------- Miscellaneous ----------
export const miscellaneousSchema = z.object({
  serviceType: z.string(),
  miscServiceType: z.string(),
  nationality: z.string(),
});
export const miscellaneousFields: FieldConfig[] = [
  { name: "miscServiceType", label: "Misc Service Type", type: "text" },
  { name: "nationality", label: "Nationality", type: "text" },
];
export const miscellaneousSchemaWithCommon = commonApplicantSchema.merge(miscellaneousSchema);
export const miscellaneousFieldsWithCommon = [...commonApplicantFields, ...miscellaneousFields];

// ---------- Driver ----------
export const driverSchema = z.object({
  // Applicant Details
  fullName: z.string(),
  email: z.string(),
  countryCode: z.string(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  pinCode: z.string(),

  // Driver Specific
  serviceType: z.string(),
  licenseNumber: z.string(),
  licenseExpiryDate: z.string(),
  drivingExperienceYears: z.string(),

  // Other
  status: z.enum(["Available", "Not Available"]),
  photo: z.any().optional(),
  licence: z.any().optional(), // API spelling
});

export const driverFields: FieldConfig[] = [
  // Applicant Details
  { name: "fullName", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "countryCode", label: "Country Code", type: "text" },
  { name: "phone", label: "Phone Number", type: "text" },
  { name: "address", label: "Address", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "state", label: "State", type: "text" },
  { name: "pinCode", label: "Pin Code", type: "text" },

  // Driver Specific
  { name: "serviceType", label: "Service Type", type: "text" },
  { name: "licenseNumber", label: "License Number", type: "text" },
  { name: "licenseExpiryDate", label: "License Expiry Date", type: "date" },
  { name: "drivingExperienceYears", label: "Experience (Years)", type: "text" },

  // Other
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Available", value: "Available" },
      { label: "Not Available", value: "Not Available" },
    ]
  },
  { name: "photo", label: "Photo", type: "file" },
  { name: "licence", label: "Licence File", type: "file" },
];

export const driverSchemaWithCommon = commonApplicantSchema.merge(driverSchema);
export const driverFieldsWithCommon = [...commonApplicantFields, ...driverFields];

// ---------- Travel Insurance ----------
export const travelInsuranceSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  dateOfBirth: z.string("Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  email: z.string().email().min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required"),
  countryCode: z.string().optional(),

  // Travel Dates
  startDate: z.string("Start Date is required"),
  endDate: z.string("End Date is required"),

  // Travel Details
  sourceCountry: z.string().min(1, "Source Country is required"),
  destinationCountry: z.string().min(1, "Destination Country is required"),
  visaType: z.string().min(1, "Visa Type is required"),
  passportNumber: z.string().min(1, "Passport Number is required"),
  passportExpiryDate: z.string("Passport Expiry Date is required"),
  purposeOfTravel: z.string().min(1, "Purpose of Travel is required"),
  insurancePreference: z.string().min(1, "Insurance Preference is required"),

  // Health Information
  anyPremedicalCondition: z.string().min(1, "Please specify if you have any premedical conditions"),
  currentMedication: z.string().min(1, "Current Medication is required"),
  covidCoverageRequired: z.string().min(1, "COVID-19 Coverage selection is required"),

  // Coverage Requirement
  coverageType: z.string().min(1, "Coverage Type is required"),
  coverageLimit: z.string().min(1, "Coverage Limit is required"),
  deductibleAmount: z.string().min(1, "Deductible Amount is required"),

  // Additional Information
  plannedActivities: z.string().min(1, "Planned Activities is required"),
  ageGroupOfTravellers: z.string().min(1, "Age Group of Travellers is required"),
  travellingWithChildren: z.string().min(1, "Travelling with Children is required"),
  additionalNotes: z.string().optional(),
});

export const travelInsuranceFields: FieldConfig[] = [
  // Personal Information
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "dateOfBirth", label: "Date of Birth", type: "date" },
  { name: "gender", label: "Gender", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "text" },
  { name: "countryCode", label: "Country Code", type: "text" },

  // Travel Dates
  { name: "startDate", label: "Start Date", type: "date" },
  { name: "endDate", label: "End Date", type: "date" },

  // Travel Details
  { name: "sourceCountry", label: "Source Country", type: "text" },
  { name: "destinationCountry", label: "Destination Country", type: "text" },
  { name: "visaType", label: "Visa Type", type: "text" },
  { name: "passportNumber", label: "Passport Number", type: "text" },
  { name: "passportExpiryDate", label: "Passport Expiry Date", type: "date" },
  { name: "purposeOfTravel", label: "Purpose of Travel", type: "text" },
  { name: "insurancePreference", label: "Insurance Preference", type: "text" },

  // Health Information
  { name: "anyPremedicalCondition", label: "Any Premedical Condition", type: "text" },
  { name: "currentMedication", label: "Current Medication", type: "text" },
  { name: "covidCoverageRequired", label: "COVID-19 Coverage Required", type: "text" },

  // Coverage Requirement
  { name: "coverageType", label: "Coverage Type", type: "text" },
  { name: "coverageLimit", label: "Coverage Limit", type: "text" },
  { name: "deductibleAmount", label: "Deductible Amount", type: "text" },

  // Additional Information
  { name: "plannedActivities", label: "Planned Activities", type: "text" },
  { name: "ageGroupOfTravellers", label: "Age Group of Travellers", type: "text" },
  { name: "travellingWithChildren", label: "Travelling with Children", type: "text" },
  { name: "additionalNotes", label: "Additional Notes", type: "textarea" },
];

export const travelInsuranceSchemaWithCommon = commonApplicantSchema.merge(travelInsuranceSchema);
export const travelInsuranceFieldsWithCommon = [...commonApplicantFields, ...travelInsuranceFields];

// ---------- Concert, Wedding, Private Tour, Corporate Ground Transport ----------
export const eventTransportSchema = z.object({
  serviceType: z.string(),
  eventCategory: z.string(),
  eventDate: z.string(),
  location: z.string(),
  numberOfGuests: z.string(),
  transportType: z.string(),
});
export const eventTransportFields: FieldConfig[] = [
  { name: "eventCategory", label: "Event Category", type: "text" },
  { name: "eventDate", label: "Event Date", type: "date" },
  { name: "location", label: "Event Location", type: "text" },
  { name: "numberOfGuests", label: "Number of Guests", type: "number" },
  { name: "transportType", label: "Transport Type", type: "text" },
];
export const eventTransportSchemaWithCommon = commonApplicantSchema.merge(eventTransportSchema);
export const eventTransportFieldsWithCommon = [...commonApplicantFields, ...eventTransportFields];

// ---------- IDP (International Driving License) ----------
export const idpSchema = z.object({
  // Common Applicant / License Holder Info
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone Number is required'),
  countryCode: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  typeOfLicense: z.string().min(1, 'Type of License is required'),
  countryIssued: z.string().min(1, 'Country Issued is required'),
  licenseExpiryDate: z.string().min(1, 'License Expiry Date is required'),
  needPhysicalCopy: z.string().min(1, 'Need Physical Copy is required'),
  licenseCopy: z.any().optional(),

  // IDP-Specific Fields
  serviceType: z.string().min(1, 'Service Type is required'),
  licenseNumber: z.string().min(1, 'Driver License Number is required'),
  issuingCountry: z.string().min(1, 'Issuing Country is required'),
  issueDate: z.string().min(1, 'Issue Date is required'),
  expiryDate: z.string().min(1, 'Expiry Date is required'),
});

export const idpFields = [
  // Common Applicant / License Holder Info
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "text" },
  { name: "countryCode", label: "Country Code", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "state", label: "State", type: "text" },
  { name: "typeOfLicense", label: "Type of License", type: "text" },
  { name: "countryIssued", label: "Country Issued", type: "text" },
  { name: "licenseExpiryDate", label: "License Expiry Date", type: "date" },
  {
    name: "needPhysicalCopy",
    label: "Need Physical Copy",
    type: "select",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  { name: "licenseCopy", label: "Upload License Copy", type: "file" },

  // IDP-Specific Fields
  { name: "serviceType", label: "Service Type", type: "text" },
  { name: "licenseNumber", label: "Driver License Number", type: "text" },
  { name: "issuingCountry", label: "Issuing Country", type: "text" },
  { name: "issueDate", label: "Issue Date", type: "date" },
  { name: "expiryDate", label: "Expiry Date", type: "date" },
];

export const idpSchemaWithCommon = commonApplicantSchema.merge(idpSchema);
export const idpFieldsWithCommon = [...commonApplicantFields, ...idpFields];

// ---------- Indian PAN Card ----------
export const indianPanSchema = z.object({
  // Common Applicant Details
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone Number is required'),
  countryCode: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  applicationType: z.string().min(1, 'Application Type is required'),

  // PAN-Specific Fields
  serviceType: z.string().min(1, 'Service Type is required'),
  applicantType: z.string().min(1, 'Applicant Type is required'),
  citizenship: z.string().min(1, 'Citizenship is required'),
  hasIndianAddress: z.string().min(1, 'This field is required'),
  aadhaarNumber: z.string().optional(),
  passportNumber: z.string().min(1, 'Passport Number is required'),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),

  // Optional Uploads
  passportOCICopy: z.any().optional(),
});

export const indianPanFields = [
  // Common Applicant Details
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "text" },
  { name: "countryCode", label: "Country Code", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "state", label: "State", type: "text" },
  { name: "applicationType", label: "Application Type", type: "text" },

  // PAN-Specific Fields
  { name: "serviceType", label: "Service Type", type: "text" },
  { name: "applicantType", label: "Applicant Type (NRI/OCI/Foreign Citizen)", type: "text" },
  { name: "citizenship", label: "Citizenship", type: "text" },
  { name: "hasIndianAddress", label: "Has Indian Address?", type: "text" },
  { name: "aadhaarNumber", label: "Aadhaar Number", type: "text" },
  { name: "passportNumber", label: "Passport Number", type: "text" },
  { name: "dateOfBirth", label: "Date of Birth", type: "date" },
  { name: "passportOCICopy", label: "Upload Passport / OCI Copy", type: "file" },
];

export const indianPanSchemaWithCommon = commonApplicantSchema.merge(indianPanSchema);
export const indianPanFieldsWithCommon = [...commonApplicantFields, ...indianPanFields];

// ---------- Concert & Program Tickets ----------

// 🧩 Full Concert Tickets Schema (All Fields)
export const concertTicketsSchema = z.object({
  // Organizer / Event Info
  eventType: z.string().min(1, "Event Type is required"),
  eventDate: z.string().min(1, "Event Date is required"),
  organizerName: z.string().min(1, "Organizer Name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  phone: z.string().min(1, "Phone Number is required"),
  countryCode: z.string().optional(),
  organizerAddress: z.string().min(1, "Organizer Address is required"),
  city: z.string().min(1, "City is required"),
  time: z.string().min(1, "Time is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),

  // Concert Booking Details
  serviceType: z.string().min(1, "Service Type is required"),
  eventName: z.string().min(1, "Event Name is required"),
  seatCategory: z.string().min(1, "Seat Category is required"),

  // ✅ Correct Zod way to validate number fields
  numberOfTickets: z
    .number()
    .min(1, "At least one ticket must be selected"),

  includeTransport: z.boolean().optional(),
});

// 🧩 Corresponding Fields Configuration
export const concertTicketsFields: FieldConfig[] = [
  // Organizer / Event Info
  { name: "eventType", label: "Event Type", type: "text" },
  { name: "eventDate", label: "Event Date", type: "date" },
  { name: "organizerName", label: "Organizer Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "text" },
  { name: "countryCode", label: "Country Code", type: "text" },
  { name: "organizerAddress", label: "Organizer Address", type: "textarea" },
  { name: "city", label: "City", type: "text" },
  { name: "time", label: "Event Time", type: "date" },
  { name: "state", label: "State", type: "text" },
  { name: "country", label: "Country", type: "text" },

  // Concert Booking Details
  { name: "serviceType", label: "Service Type", type: "text" },
  { name: "eventName", label: "Event Name", type: "text" },
  { name: "seatCategory", label: "Seat Category", type: "text" },
  { name: "numberOfTickets", label: "Number of Tickets", type: "number" },
  {
    name: "includeTransport",
    label: "Include Transport?",
    type: "checkbox",
  },
];


export const concertTicketsSchemaWithCommon = commonApplicantSchema.merge(concertTicketsSchema);
export const concertTicketsFieldsWithCommon = [...commonApplicantFields, ...concertTicketsFields];

// ---------- Consultancy Service ----------
export const consultancyServiceSchema = z.object({
  serviceType: z.string(),
  consultationTopic: z.string(),
  details: z.string().optional(),
});
export const consultancyServiceFields: FieldConfig[] = [
  { name: "consultationTopic", label: "Consultation Topic", type: "text" },
  { name: "details", label: "Additional Details", type: "textarea" },
];
export const consultancyServiceSchemaWithCommon = commonApplicantSchema.merge(consultancyServiceSchema);
export const consultancyServiceFieldsWithCommon = [...commonApplicantFields, ...consultancyServiceFields];

// ---------- Immigration Service ----------
export const immigrationServiceSchema = z.object({
  // Common Applicant Information
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone Number is required'),
  countryCode: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),

  // Immigration Service Fields
  serviceType: z.string().min(1, 'Service Type is required'),
  visaCategory: z.string().min(1, 'Visa Category is required'),
  countryOfDestination: z.string().min(1, 'Country of Destination is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  currentVisaStatus: z.string().min(1, 'Current Visa Status is required'),
  travelIntentPurpose: z.string().min(1, 'Travel Intent / Purpose is required'),
  purposeOfTravel: z.string().min(1, 'Purpose of Travel is required'),

  // Optional File Upload
  resume: z.union([z.instanceof(File), z.string()]).optional(),
});

export const immigrationServiceFields = [
  // Common Applicant Fields
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "text" },
  { name: "countryCode", label: "Country Code", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "state", label: "State", type: "text" },

  // Immigration-Specific Fields
  { name: "serviceType", label: "Service Type", type: "text" },
  { name: "visaCategory", label: "Visa Category", type: "text" },
  { name: "countryOfDestination", label: "Country of Destination", type: "text" },
  { name: "nationality", label: "Nationality", type: "text" },
  { name: "currentVisaStatus", label: "Current Visa Status", type: "text" },
  { name: "travelIntentPurpose", label: "Travel Intent / Purpose", type: "textarea" },
  { name: "purposeOfTravel", label: "Purpose of Travel", type: "text" },
  { name: "resume", label: "Upload Resume", type: "file" },
];

export const immigrationServiceSchemaWithCommon = commonApplicantSchema.merge(immigrationServiceSchema);
export const immigrationServiceFieldsWithCommon = [...commonApplicantFields, ...immigrationServiceFields];

// ---------- Consular Services ----------


// 🧩 Full Consular Services Schema (All Fields)
export const consularServicesSchemaWithCommon = z.object({
  // Common Applicant Fields
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  phone: z.string().min(1, "Phone Number is required"),
  countryCode: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  serviceType: z.string().min(1, "Service Type is required"),
  documentCategory: z.string().min(1, "Document Category is required"),
  countryOfUse: z.string().min(1, "Country of Use is required"),
  numberOfDocuments: z.string().min(1, "Number of Documents is required"),
  urgentProcessing: z.string().min(1, "Urgent Processing is required"),

  // Consular-Specific Fields
  serviceCategory: z.string().min(1, "Service Category is required"),
  documentType: z.string().min(1, "Document Type is required"),
});

// 🧩 Field Config for All Fields (used in Dynamic Form)
export const consularServicesFieldsWithCommon: FieldConfig[] = [
  // Common Applicant Fields
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "text" },
  { name: "countryCode", label: "Country Code", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "state", label: "State", type: "text" },
  { name: "serviceType", label: "Service Type", type: "text" },
  { name: "documentCategory", label: "Document Category", type: "text" },
  { name: "countryOfUse", label: "Country of Use", type: "text" },
  { name: "numberOfDocuments", label: "Number of Documents", type: "number" },
  {
    name: "urgentProcessing",
    label: "Urgent Processing",
    type: "select",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },

  // Consular-Specific Fields
  { name: "serviceCategory", label: "Service Category", type: "text" },
  { name: "documentType", label: "Document Type", type: "text" },
];

// 🧩 Type inference for strong TypeScript typing
export type ConsularServicesFormData = z.infer<
  typeof consularServicesSchemaWithCommon
>;


// ---------- Tour Packages ----------
export const tourPackagesSchema = z.object({
  serviceType: z.string(),
  destination: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  travelers: z.string(),
});
export const tourPackagesFields: FieldConfig[] = [
  { name: "destination", label: "Destination", type: "text" },
  { name: "startDate", label: "Start Date", type: "date" },
  { name: "endDate", label: "End Date", type: "date" },
  { name: "travelers", label: "Number of Travelers", type: "number" },
];
export const tourPackagesSchemaWithCommon = commonApplicantSchema.merge(tourPackagesSchema);
export const tourPackagesFieldsWithCommon = [...commonApplicantFields, ...tourPackagesFields];

// ---------- STEP Enrollment Assistance ----------
export const stepEnrollmentSchema = z.object({
  serviceType: z.string(),
  countryOfStay: z.string(),
  travelDuration: z.string(),

  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  phone: z.string().min(1, "Phone Number is required"),
  countryCode: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  travelerFullName: z.string().min(1, "Traveler Full Name is required"),
  countryOfCitizenship: z.string().min(1, "Country of Citizenship is required"),
  tripDestinations: z.string().min(1, "Trip Destination(s) is required"),
  travelDates: z.string().min(1, "Travel Dates is required"),
  emergencyContactName: z.string().min(1, "Emergency Contact Name is required"),
  emergencyContactNumber: z.string().min(1, "Emergency Contact Number is required"),
  emergencyContactCountryCode: z.string().optional(),
});

export const stepEnrollmentFields: FieldConfig[] = [
  { name: "serviceType", label: "Service Type", type: "text" },
  { name: "countryOfStay", label: "Country of Stay", type: "text" },
  { name: "travelDuration", label: "Travel Duration", type: "text" },

  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "text" },
  { name: "countryCode", label: "Country Code", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "state", label: "State", type: "text" },

  { name: "travelerFullName", label: "Traveler Full Name", type: "text" },
  { name: "countryOfCitizenship", label: "Country of Citizenship", type: "text" },
  { name: "tripDestinations", label: "Trip Destinations", type: "text" },
  { name: "travelDates", label: "Travel Dates", type: "text" },

  { name: "emergencyContactName", label: "Emergency Contact Name", type: "text" },
  { name: "emergencyContactNumber", label: "Emergency Contact Number", type: "text" },
  { name: "emergencyContactCountryCode", label: "Emergency Contact Country Code", type: "text" },
];

export const stepEnrollmentSchemaWithCommon = commonApplicantSchema.merge(stepEnrollmentSchema);
export const stepEnrollmentFieldsWithCommon = [...commonApplicantFields, ...stepEnrollmentFields];

// ---------- Global Entry / TSA PreCheck ----------
export const globalEntrySchema = z.object({
  // Common Applicant Information
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone Number is required'),
  countryCode: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  programType: z.string().min(1, 'Program Type is required'),
  citizenship: z.string().min(1, 'Citizenship is required'),
  knownTravelerNumber: z.string().optional(),
  knownTravelerCountryCode: z.string().optional(),
  appointmentDatePreference: z.string().min(1, 'Appointment Date Preference is required'),

  // Global Entry Specific Field
  serviceType: z.string().min(1, 'Service Type is required'),
});

export const globalEntryFields = [
  // Common Applicant Fields
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "text" },
  { name: "countryCode", label: "Country Code", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "state", label: "State", type: "text" },
  { name: "programType", label: "Program Type", type: "text" },
  { name: "citizenship", label: "Citizenship", type: "text" },
  { name: "knownTravelerNumber", label: "Known Traveler Number", type: "text" },
  { name: "knownTravelerCountryCode", label: "Known Traveler Country Code", type: "text" },
  { name: "appointmentDatePreference", label: "Appointment Date Preference", type: "date" },

  // Global Entry Specific Field
  { name: "serviceType", label: "Service Type", type: "text" },
];

export const globalEntrySchemaWithCommon = commonApplicantSchema.merge(globalEntrySchema);
export const globalEntryFieldsWithCommon = [...commonApplicantFields, ...globalEntryFields];

// ---------- FBI Fingerprinting & Background Checks ----------
export const fbiFingerprintingSchema = z.object({
  serviceType: z.string(),
  reasonForCheck: z.string(),
  fingerprintsRequired: z.boolean(),
});
export const fbiFingerprintingFields: FieldConfig[] = [
  { name: "reasonForCheck", label: "Reason for Background Check", type: "text" },
  { name: "fingerprintsRequired", label: "Fingerprints Required", type: "checkbox" },
];
export const fbiFingerprintingSchemaWithCommon = commonApplicantSchema.merge(fbiFingerprintingSchema);
export const fbiFingerprintingFieldsWithCommon = [...commonApplicantFields, ...fbiFingerprintingFields];

// ---------- Property Management & Investment ----------
export const propertyManagementSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  phone: z.string().min(1, "Phone Number is required"),
  countryCode: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  propertyType: z.string().min(1, "Property Type is required"),
  estimatedBudget: z.string().min(1, "Estimated Budget is required"),
  investmentType: z.string().min(1, "Investment Type is required"),
  message: z.string().optional(),

  // Original propertyManagementSchema fields
  serviceType: z.string(),
  location: z.string(),
  investmentBudget: z.string(),
});

export const propertyManagementFields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "text" },
  { name: "countryCode", label: "Country Code", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "state", label: "State", type: "text" },
  { name: "propertyType", label: "Property Type", type: "text" },
  { name: "estimatedBudget", label: "Estimated Budget", type: "text" },
  { name: "investmentType", label: "Investment Type", type: "text" },
  { name: "message", label: "Message", type: "textarea" },

  // Original propertyManagement fields
  { name: "serviceType", label: "Service Type", type: "text" },
  { name: "location", label: "Location", type: "text" },
  { name: "investmentBudget", label: "Investment Budget", type: "text" },
];


export const propertyManagementSchemaWithCommon = commonApplicantSchema.merge(propertyManagementSchema);
export const propertyManagementFieldsWithCommon = [...commonApplicantFields, ...propertyManagementFields];


// ---------- Fast Track Immigration (FTI-TTP) ----------
export const fastTrackSchema = z.object({
  // Common Applicant Fields
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone Number is required'),
  countryCode: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  programType: z.string().min(1, 'Program Type is required'),
  citizenship: z.string().min(1, 'Citizenship is required'),
  passportNumber: z.string().min(1, 'Passport Number is required'),
  appointmentCity: z.string().min(1, 'Appointment City is required'),
  preferredDate: z.string().min(1, 'Preferred Date is required'),
  message: z.string().optional(),

  // Fast Track Specific Fields
  serviceType: z.string().min(1, 'Service Type is required'),
  travelDate: z.string().min(1, 'Planned Travel Date is required'),
});

export const fastTrackFields = [
  // Common Fields
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "text" },
  { name: "countryCode", label: "Country Code", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "state", label: "State", type: "text" },
  { name: "programType", label: "Program Type (Global Entry/TSA PreCheck)", type: "text" },
  { name: "citizenship", label: "Citizenship", type: "text" },
  { name: "passportNumber", label: "Passport Number", type: "text" },
  { name: "appointmentCity", label: "Appointment City", type: "text" },
  { name: "preferredDate", label: "Preferred Date", type: "date" },
  { name: "message", label: "Message", type: "textarea" },

  // Fast Track Specific Fields
  { name: "serviceType", label: "Service Type", type: "text" },
  { name: "travelDate", label: "Planned Travel Date", type: "date" },
];

export const fastTrackSchemaWithCommon = commonApplicantSchema.merge(fastTrackSchema);
export const fastTrackFieldsWithCommon = [...commonApplicantFields, ...fastTrackFields];

// ============================================================
// ---------- Final Export Map --------------------------------
// ============================================================
export const serviceForms = {
  oci: { schema: ociSchemaWithCommon, fields: ociFieldsWithCommon },
  visa: { schema: visaSchemaWithCommon, fields: visaFieldsWithCommon },
  "apostille-and-legalization": { schema: apostilleSchemaWithCommon, fields: apostilleFieldsWithCommon },
  "courier-and-document-delivery": { schema: courierSchemaWithCommon, fields: courierFieldsWithCommon },
  "vehicle-booking": { schema: vehicleSchemaWithCommon, fields: vehicleFieldsWithCommon },
  "flight-charter": { schema: flightCharterSchemaWithCommon, fields: flightCharterFieldsWithCommon },
  consultancy_service: { schema: consultancySchemaWithCommon, fields: consultancyFieldsWithCommon },
  driver: { schema: driverSchemaWithCommon, fields: driverFieldsWithCommon },
  miscellaneous: { schema: miscellaneousSchemaWithCommon, fields: miscellaneousFieldsWithCommon },
  event: { schema: eventSchemaWithCommon, fields: eventFieldsWithCommon },

  // ✅ Newly Added
  "travel-insurance": { schema: travelInsuranceSchemaWithCommon, fields: travelInsuranceFieldsWithCommon },
  "concert-wedding-private-tour-corporate-ground-transport": {
    schema: eventTransportSchemaWithCommon,
    fields: eventTransportFieldsWithCommon,
  },
  "idp-international-driving-license)": { schema: idpSchemaWithCommon, fields: idpFieldsWithCommon },
  "indian-pan-card": { schema: indianPanSchemaWithCommon, fields: indianPanFieldsWithCommon },
  "concert-program-tickets": { schema: concertTicketsSchemaWithCommon, fields: concertTicketsFieldsWithCommon },
  "fast-track-immigration": { schema: fastTrackSchemaWithCommon, fields: fastTrackFieldsWithCommon },
  "consultancy-service": { schema: consultancyServiceSchemaWithCommon, fields: consultancyServiceFieldsWithCommon },
  "immigration-service": { schema: immigrationServiceSchemaWithCommon, fields: immigrationServiceFieldsWithCommon },
  "consular-services": { schema: consularServicesSchemaWithCommon, fields: consularServicesFieldsWithCommon },
  "tour-packages": { schema: tourPackagesSchemaWithCommon, fields: tourPackagesFieldsWithCommon },
  "step-enrollment-assistance": { schema: stepEnrollmentSchemaWithCommon, fields: stepEnrollmentFieldsWithCommon },
  "global-entry-tsa-pre-check": { schema: globalEntrySchemaWithCommon, fields: globalEntryFieldsWithCommon },
  "fbi-fingerprinting-background-checks": {
    schema: fbiFingerprintingSchemaWithCommon,
    fields: fbiFingerprintingFieldsWithCommon,
  },
  "property-management-investment": {
    schema: propertyManagementSchemaWithCommon,
    fields: propertyManagementFieldsWithCommon,
  },
};