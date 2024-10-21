export interface IProperty {
    _id: string;
    property_name: string;
    property_type: string;
    location: {
      area: string;
      google_maps_link: { lat: number; lng: number };
      zone_number: number;
      street_number: number;
      building_number: number;
    };
    mode: string;
    contract_type: string;
    expected_commission: {
      rate: number;
    };
    photos?: string[];
  }
  