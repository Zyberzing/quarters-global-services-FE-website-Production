import { PERMISSIONS_LIST_ENUM } from "@/hooks/useAccessControl/permissions";
import { ZodIssue } from "zod/v3";

export type ApplicationPayload = {
  applications: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    countryCode: string;
    company: string;
    status: string;
    applicationSource: string;
    address: {
      addressLine1: string;
      addressLine2?: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    currentLegalAddress: {
      addressLine1: string;
      addressLine2?: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    fromCountryId: string | null;
    toCountryId: string | null;
    platformServices: {
      platformServiceId: string;
      platformServiceCategoryId: string;
      platformServiceCategoryPackageAddonsId: any[];
      platformServiceCategoryPackageId: string | undefined;
    }[];
    serviceFields: {
      serviceType: string;
    };
  }[];
};


export type UserSession = {
  id: string;
  token: string;
};



export type ErrorInstance = { response: { data: { message: string } } };
export type ErrorInstance2 = {
  data: { message: string; errors: Record<string, string> | ZodIssue[] };
};
export type ErrorInstanceCombine = { message?: string } & ErrorInstance2 & ErrorInstance;


export type ApiPagination = {
  count: number;
  currentPage: number;
  totalPages: number;
};

export const applicationSources = ['AdminPortal', 'AgentPortal', 'Website'] as const;
export type ApplicationSource = (typeof applicationSources)[number];

export enum UserTypeENUM {
  ADMIN = 'admin',
  SUBADMIN = 'sub-admin',
  AGENT = 'agent',
  USER = 'user',
}

export const applicationStatuses = [
  'Draft',
  'Submitted',
  'Under Review',
  'Verification Pending',
  'Verified',
  'Additional Information Required',
  'Resubmitted',
  'Approved',
  'Rejected',
  'In Progress',
  'Ready for Dispatch',
  'Dispatched',
  'Delivered',
  'Cancelled',
  'Payment Pending',
  'Payment Completed',
  'Biometric Scheduled',
  'Biometric Completed',
  'Interview Scheduled',
  'On Hold',
] as const;
export type ApplicationStatus = (typeof applicationStatuses)[number];


export type UserDataType = {
  _id: string;
  role: UserTypeENUM;
  email: string;
  phone: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  countryCode?: string;
  country?: string;
  otp?: string | null;
  otpExpiryTime?: string | null;
  profilePicture?: string | null;
  isVerified: boolean;
  status: ApplicationStatus;
  isDeleted: boolean;
  deletedBy?: string | null;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  subAdminRoleId: {
    _id: string;
    name: string;
    permissions: PERMISSIONS_LIST_ENUM[];
  } | null;
};

export type RoleDataType = {
  _id: string;
  name: string;
  description: string;
  permissions: PERMISSIONS_LIST_ENUM[];
  isDeleted: boolean;
  deletedBy: any;
  deletedAt: any;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
