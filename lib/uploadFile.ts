import { fetcher } from '@/lib/fetcher';
import { toast } from 'sonner';

export interface UploadResponse {
  file: string;
  fileName: string;
  mimeType: string;
}

interface UploadedFile {
  file: string;
  fileName: string;
  mimeType: string;
  isUsed: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * Upload a file to the server using the /vehicle/upload endpoint
 * @param file - The file to upload
 * @param type - The type identifier for the file (e.g., 'ticket-passport-scan', 'vehicle-document-1')
 * @returns Promise<string | null> - Returns the file URL on success, null on failure
 */
export const uploadFile = async (file: File, type: string): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await fetcher('/vehicle/upload', {
      method: 'POST',
      body: formData,
    });

    if (response?.status && response?.data?.file) {
      return response.data.file;
    }
    return null;
  } catch (error) {
    console.error('Error uploading file:', error);
    toast.error('Failed to upload file');
    return null;
  }
};

/**
 * Upload multiple files in parallel
 * @param files - Array of objects containing file and type
 * @returns Promise<Record<string, string | null>> - Returns object with keys as identifiers and values as file URLs
 */
export const uploadMultipleFiles = async (
  files: Array<{ file: File; type: string; key: string }>,
): Promise<Record<string, string | null>> => {
  const uploadPromises = files.map(async ({ file, type, key }) => {
    const url = await uploadFile(file, type);
    return { key, url };
  });

  const results = await Promise.all(uploadPromises);

  return results.reduce(
    (acc, { key, url }) => {
      acc[key] = url;
      return acc;
    },
    {} as Record<string, string | null>,
  );
};

/**
 * Upload files with progress tracking (for future enhancement)
 * @param file - The file to upload
 * @param type - The type identifier for the file
 * @param onProgress - Optional callback for upload progress
 * @returns Promise<string | null> - Returns the file URL on success, null on failure
 */
export const uploadFileWithProgress = async (
  file: File,
  type: string,
  onProgress?: (progress: number) => void,
): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    // For now, we'll use the same endpoint
    // In the future, this could be enhanced with XMLHttpRequest for progress tracking
    const response = await fetcher('/vehicle/upload', {
      method: 'POST',
      body: formData,
    });

    if (response?.status && response?.data?.file) {
      onProgress?.(100);
      return response.data.file;
    }
    return null;
  } catch (error) {
    console.error('Error uploading file:', error);
    toast.error('Failed to upload file');
    return null;
  }
};

/**
 * Validate file before upload
 * @param file - The file to validate
 * @param options - Validation options
 * @returns boolean - Returns true if file is valid, false otherwise
 */
export const validateFile = (
  file: File,
  options: {
    maxSize?: number; // in bytes, default 5MB
    allowedTypes?: string[]; // MIME types, default allows common document types
  } = {},
): boolean => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  } = options;

  // Check file size
  if (file.size > maxSize) {
    toast.error(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
    return false;
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    toast.error('File type not supported');
    return false;
  }

  return true;
};

/**
 * Upload file with validation
 * @param file - The file to upload
 * @param type - The type identifier for the file
 * @param validationOptions - File validation options
 * @returns Promise<string | null> - Returns the file URL on success, null on failure
 */
export const uploadFileWithValidation = async (
  file: File,
  type: string,
  validationOptions?: Parameters<typeof validateFile>[1],
): Promise<string | null> => {
  if (!validateFile(file, validationOptions)) {
    return null;
  }

  return uploadFile(file, type);
};

/**
 *
 * @param file - The file to upload
 * @returns UploadedFile | null
 */
export const uploadingOnboardingDocs = async (file: File): Promise<UploadedFile | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const route = '/agency/upload';

    const response = await fetch(process.env.NEXT_PUBLIC_QUARTUS_API_URL + route, {
      method: 'POST',
      body: formData,
    });

    const responseData = await response.json();
    if (responseData?.status && responseData?.data?.file) {
      console.log({ data: responseData.data });
      return responseData?.data;
    }
    return null;
  } catch (error) {
    console.error('Error uploading onboarding file:', error);
    toast.error('Failed to upload file');
    return null;
  }
};

// Helper to safely upload a file if it exists and is a File
export const safeUpload = async (file: File | undefined): Promise<UploadedFile | null> => {
  if (file instanceof File) {
    return await uploadingOnboardingDocs(file);
  }
  return null;
};