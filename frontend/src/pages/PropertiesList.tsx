import React, { useEffect, useState } from "react";
import { getAllProperties } from "../services/api/apiMethods";
import { toast } from "sonner";
import PropertesTable from "../components/PropertesTable";
import { IProperty } from "../utils/types/propertyTypes";

const PropertiesList: React.FC = () => {
  const [properties, setProperties] = useState<IProperty[]>([]); // Use the IProperty type

  useEffect(() => {
    getAllProperties()
      .then((response: any) => {
        const data = response.data;
        if (response.status === 200) {
          console.log('data',data.properties);
          
          setProperties(data.properties); 
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  }, []);

  return (
    <div className="p-6 w-full">
      <PropertesTable properties={properties} />
    </div>
  );
};

export default PropertiesList;
