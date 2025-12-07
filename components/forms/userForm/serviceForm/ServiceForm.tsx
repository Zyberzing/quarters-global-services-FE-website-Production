'use client';
import React, { useState, useEffect } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CourierDocumentDeliveryForm from './subForms/CourierDocumentDeliveryForm';
import VehicleBookingForm from './subForms/VehicleBookingForm';
import FlightCharterServicesForm from './subForms/FlightCharterServicesForm';
import TravelInsuranceForm from './subForms/TravelInsuranceForm';
import ConsultancyServiceForm from './subForms/ConsultancyServiceForm';
import ConcertWeddingPrivateTourForm from './subForms/ConcertWeddingPrivateTourForm';
import IDPForm from './subForms/IDPForm';
import IndianPANCardForm from './subForms/IndianPANCardForm';
import FBIFingerprintingForm from './subForms/FBIFingerprintingForm';
import PropertyManagementForm from './subForms/PropertyManagementForm';
import STEPEnrollmentForm from './subForms/STEPEnrollmentForm';
import GlobalEntryTSAForm from './subForms/GlobalEntryTSAForm';
import TourPackagesForm from './subForms/TourPackagesForm';
import ConsularServicesForm from './subForms/ConsularServicesForm';
import FastTrackImmigrationForm from './subForms/FastTrackImmigrationForm';
import ImmigrationServiceForm from './subForms/ImmigrationServiceForm';
import { fetcher } from '@/lib/fetcher';
import { getPlatformServiceCategories, PlatformServiceCategory } from '@/services/platformService';

// Reusable function to fetch platform service package at index 0
export const fetchPlatformServicePackage = async (
  platformServiceCategoryId: string,
  toCountryId: string = '',
): Promise<string> => {
  try {
    const packageResponse = await fetcher(
      `/platform-service-category-package/get-platform-service-category-package?toCountryId=${toCountryId}&platformServiceCategoryId=${platformServiceCategoryId}`,
      {
        cache: 'no-cache',
        revalidate: 60,
      },
    );

    const packages = packageResponse?.data?.data || [];
    if (packages.length > 0) {
      return packages[0]._id; // Return package at index 0
    }

    return '';
  } catch (error) {
    console.error('Error fetching platform service package:', error);
    return '';
  }
};

const ServiceForm = () => {
  const [serviceType, setServiceType] = useState<string>('');
  const [serviceCategories, setServiceCategories] = useState<PlatformServiceCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [packageId, setPackageId] = useState<string>('');

  // Fetch service categories on component mount
  useEffect(() => {
    const fetchServiceCategories = async () => {
      try {
        setLoading(true);
        const categories = await getPlatformServiceCategories('other-services');
        setServiceCategories(categories);

        // Set the first category as default if available
        if (categories.length > 0) {
          setServiceType(categories[0].name);
        }
      } catch (error) {
        console.error('Error fetching service categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceCategories();
  }, []);

  // Fetch package when service type changes
  useEffect(() => {
    const fetchPackage = async () => {
      if (!serviceType) {
        setPackageId('');
        return;
      }

      const selectedCategory = serviceCategories.find((category) => category.name === serviceType);
      if (selectedCategory?._id) {
        try {
          const packageId = await fetchPlatformServicePackage(selectedCategory._id);
          setPackageId(packageId);
        } catch (error) {
          console.error('Error fetching package:', error);
          setPackageId('');
        }
      }
    };

    fetchPackage();
  }, [serviceType, serviceCategories]);

  // Function to render the appropriate form based on service type
  const renderServiceForm = () => {
    if (!serviceType) return null;

    // Find the selected service category to get its ID
    const selectedCategory = serviceCategories.find((category) => category.name === serviceType);
    const platformServiceId = selectedCategory?._id;

    // Map service category names to their corresponding form components
    switch (serviceType) {
      case 'Courier & Document Delivery':
        return (
          <CourierDocumentDeliveryForm
          // platformServiceId={platformServiceId}
          // packageId={packageId}
          />
        );
      case 'Vehicle Booking':
        return <VehicleBookingForm />;
      case 'Flight Charter':
        return (
          <FlightCharterServicesForm platformServiceId={platformServiceId} packageId={packageId} />
        );
      case 'Travel Insurance':
        return (
          <TravelInsuranceForm
            platformServiceId={platformServiceId}
            platformServiceCategoryPackageId={packageId}
          />
        );
      case 'Concert, Wedding, Private Tour, Corporate Ground Transport':
        return (
          <ConcertWeddingPrivateTourForm
            platformServiceId={platformServiceId}
            platformServiceCategoryPackageId={packageId}
          />
        );
      case 'IDP (International Driving license)':
        return (
          <IDPForm
            platformServiceId={platformServiceId}
            platformServiceCategoryPackageId={packageId}
          />
        );
      case 'Indian PAN Card':
        return (
          <IndianPANCardForm
            platformServiceId={platformServiceId}
            platformServiceCategoryPackageId={packageId}
          />
        );
      case 'FBI Fingerprinting & Background Checks':
        return (
          <FBIFingerprintingForm
            platformServiceId={platformServiceId}
            platformServiceCategoryPackageId={packageId}
          />
        );
      case 'Property Management & Investment':
        return (
          <PropertyManagementForm
            platformServiceId={platformServiceId}
            platformServiceCategoryPackageId={packageId}
          />
        );
      case 'STEP Enrollment Assistance':
        return (
          <STEPEnrollmentForm
            platformServiceId={platformServiceId}
            platformServiceCategoryPackageId={packageId}
          />
        );
      case 'Global Entry / TSA PreCheck':
        return (
          <GlobalEntryTSAForm
            platformServiceId={platformServiceId}
            platformServiceCategoryPackageId={packageId}
          />
        );
      case 'Tour packages':
        return (
          <TourPackagesForm
            platformServiceId={platformServiceId}
            platformServiceCategoryPackageId={packageId}
          />
        );
      case 'Consular services':
        return (
          <ConsularServicesForm
            platformServiceId={platformServiceId}
            platformServiceCategoryPackageId={packageId}
          />
        );
      case 'Consultancy Service':
        return (
          <ConsultancyServiceForm
            platformServiceId={platformServiceId}
            platformServiceCategoryPackageId={packageId}
          />
        );
      case 'Fast Track Immigration (FTI-TTP)':
        return (
          <FastTrackImmigrationForm
            platformServiceId={platformServiceId}
            platformServiceCategoryPackageId={packageId}
          />
        );
      case 'Immigration Service':
        return (
          <ImmigrationServiceForm
            platformServiceId={platformServiceId}
            platformServiceCategoryPackageId={packageId}
          />
        );
      case 'Additional Programs':
        return <ConsultancyServiceForm />;
      default:
        // For any other service types, show a generic message or default form
        return (
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">Form for {serviceType} is not yet implemented.</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="p-4 border rounded-lg grid gap-4">
        <div className="flex items-center justify-center py-8">
          <div className="text-sm text-gray-500">Loading service categories...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg grid gap-4">
      <Select onValueChange={setServiceType} value={serviceType}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select service type" />
        </SelectTrigger>
        <SelectContent>
          {serviceCategories.map((category) => (
            <SelectItem key={category._id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {renderServiceForm()}
    </div>
  );
};

export default ServiceForm;
