import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyDetail } from "../services/api/apiMethods"; // Define this API method
import { IProperty } from "../utils/types/propertyTypes";
import { toast } from "sonner";
import MapComponent from "../components/MapViewComponent";

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<IProperty | null>(null);

  useEffect(() => {
    if (id) {
      getPropertyDetail(id)
        .then((response: any) => {
          const data = response.data;
          if (response.status === 200) {
            setProperty(data.property);
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    }
  }, [id]);

  if (!property) {
    return <div>Loading property details...</div>;
  }

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">{property.property_name}</h1>
      <p>Type: {property.property_type}</p>
      <p>Area: {property.location.area}</p>
      <p>Mode: {property.mode}</p>
      <p>Contract Type: {property.contract_type}</p>
      <p>Expected Commission: {property.location.google_maps_link.lat}</p>
      <div className="my-4">
        <label className="block text-lg font-semibold">Property Location on Google Maps:</label>
        <MapComponent
          location={property.location.google_maps_link}
        />
      </div>
    </div>
  );
};

export default PropertyDetails;
