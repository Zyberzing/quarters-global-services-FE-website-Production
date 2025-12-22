"use client";

import { Autocomplete } from "@react-google-maps/api";
import { useRef } from "react";
import { Input } from "@/components/ui/input";

interface Props {
  value?: string;
  onChange: (val: string) => void;
  onSelect?: (place: google.maps.places.PlaceResult) => void;
  placeholder?: string;
}

export default function GoogleAddressInput({
  value,
  onChange,
  onSelect,
  placeholder,
}: Props) {
  const autoRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handleLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autoRef.current = autocomplete;
  };

  const handlePlaceChanged = () => {
    if (!autoRef.current) return;

    const place = autoRef.current.getPlace();
    onChange(place.formatted_address || "");
    onSelect?.(place);
  };

  return (
    <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
      <Input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Enter address"}
        className="w-full"
      />
    </Autocomplete>
  );
}
