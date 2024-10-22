// MapComponent.tsx
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { IProperty } from '../utils/types/propertyTypes'; // Adjust the import based on your project structure

interface MapProps {
    location: IProperty['location']['google_maps_link'];
}

const containerStyle = {
    width: '100%',
    height: '400px' // Adjust the height as necessary
};

const center = (lat: number, lng: number) => ({
    lat,
    lng
});

const MapComponent: React.FC<MapProps> = ({ location }) => {
    const { lat, lng } = location;

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center(lat, lng)}
                zoom={15} // Adjust zoom level as necessary
            >
                <Marker position={{ lat, lng }} />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
