"use client";

import { Autocomplete } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

type Props = {
  value?: string;
  onChange: (value: string) => void;
  onSelect?: (place: google.maps.places.PlaceResult) => void;
  placeholder?: string;
};

export default function GoogleAddressInput({
  value,
  onChange,
  onSelect,
  placeholder,
}: Props) {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (!place) return;

    onChange(place.formatted_address || "");
    onSelect?.(place);
  };

  return (
    <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
      options={{
        fields: ["formatted_address", "address_components", "geometry"],
      }}
    >
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Enter address"}
      />
    </Autocomplete>
  );
}
