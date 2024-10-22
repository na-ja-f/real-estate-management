import React, { useCallback, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

interface GoogleMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  center: { lat: number; lng: number };
}

const GoogleMapComponent: React.FC<GoogleMapProps> = ({ onLocationSelect, center }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""
  });

  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);

  const onClickHandler = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });
      onLocationSelect(lat, lng); // Pass the coordinates back to parent
    }
  }, [onLocationSelect]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onClick={onClickHandler}
    >
      {markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default React.memo(GoogleMapComponent);
