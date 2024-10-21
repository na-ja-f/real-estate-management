import React from "react";
import { IProperty } from "../utils/types/propertyTypes";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  properties: IProperty[];
}

const PropertesTable: React.FC<Props> = ({ properties }) => {
  const navigate = useNavigate();
  //  check to handle empty or undefined properties
  if (!properties || properties.length === 0) {
    return <div>No properties found.</div>;
  }

  const handleRowClick = (id: string) => {
    navigate(`/property-details/${id}`); // Navigate to the details page for the selected property
  };

  return (
    <div className="p-6">
      <div className="mb-2 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Properties</h2>
        <Link to={"/add-property"}>
          <h2 className="text-xl border rounded-lg bg-black text-white py-2 px-6 cursor-pointer font-semibold">
            Add Property
          </h2>
        </Link>
      </div>
      <p className="mb-4 text-sm font-semibold">
        * Click any property to view its details
      </p>
      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search Properties..."
          className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:border-blue-500"
        />
      </div>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-6">Property Name</th>
            <th className="py-3 px-6">Type</th>
            <th className="py-3 px-6">Area</th>
            <th className="py-3 px-6">Mode</th>
            <th className="py-3 px-6">Contract Type</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr
              className="border-t hover:cursor-pointer"
              key={property._id}
              onClick={() => handleRowClick(property._id)}
            >
              <td className="py-3 px-6">{property.property_name}</td>
              <td className="py-3 px-6">{property.property_type}</td>
              <td className="py-3 px-6">{property.location.area}</td>
              <td className="py-3 px-6">{property.mode}</td>
              <td className="py-3 px-6">{property.contract_type}</td>
              <td className="py-3 px-6">{property.expected_commission.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button className="px-4 py-2 bg-gray-200 rounded-lg">Previous</button>
        <span>Page 1 of 1</span>
        <button className="px-4 py-2 bg-gray-200 rounded-lg">Next</button>
      </div>
    </div>
  );
};

export default PropertesTable;
