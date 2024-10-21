import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../components/ui/InputBox";
import Button from "../components/ui/Button";
import { propertyValidationSchema } from "../utils/validations/propertyValidation";
import { addProperty } from "../services/api/apiMethods";
import { toast } from "sonner";
import GoogleMapComponent from "../components/GoogleMapComponent";
import { useNavigate } from "react-router-dom";

const AddProperty: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(propertyValidationSchema),
    defaultValues: {
      property_name: "",
      property_type: "",
      location: {
        area: "",
        // google_maps_link: "",
        zone_number: undefined,
        street_number: undefined,
        building_number: undefined,
      },
      mode: "",
      contract_type: "",
      expected_commission: {
        rate: undefined,
      },
      photos: "",
    },
  });

  const onSubmit = (data: any) => {
    const finalData = {
      ...data,
      location: {
        ...data.location, // Retain other location fields (zone_number, street_number, etc.)
        google_maps_link: selectedLocation,
      },
    };

    addProperty(finalData)
      .then((response: any) => {
        const data = response.data;
        if (response.status === 201) {
          toast.success(data.message);
          navigate('/properties')
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  return (
    <div className="flex justify-center w-full pt-10 h-full">
      <div className="w-full max-w-4xl bg-white p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Add Property</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Property Name */}
          <InputField
            placeholder="Property Name"
            id="property_name"
            register={register}
            error={errors.property_name}
          />

          {/* Property Type */}
          <div>
            <select
              id="property_type"
              {...register("property_type")}
              className={`mt-1 block w-full border ${
                errors.property_type ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2`}
            >
              <option value="">Select Property Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Both">Both</option>
            </select>
            {errors.property_type && (
              <p className="text-black text-sm mt-1">
                {errors.property_type.message}
              </p>
            )}
          </div>

          {/* Location Fields */}
          <h3 className="text-lg font-semibold">Location</h3>
          <InputField
            placeholder="Area"
            id="location.area"
            register={register}
            error={errors.location?.area}
          />
          <div className="my-4">
            <label className="block text-sm font-medium">
              Select Property Location:
            </label>
            <GoogleMapComponent
              onLocationSelect={handleLocationSelect}
              center={{ lat: 25.276987, lng: 55.296249 }} // Set initial center to your region
            />
          </div>
          <InputField
            placeholder="Zone Number"
            id="location.zone_number"
            type="text"
            register={register}
            error={errors.location?.zone_number}
          />
          <InputField
            placeholder="Street Number"
            id="location.street_number"
            type="number"
            register={register}
            error={errors.location?.street_number}
          />
          <InputField
            placeholder="Building Number"
            id="location.building_number"
            type="number"
            register={register}
            error={errors.location?.building_number}
          />

          {/* Property Mode */}
          <div>
            <label className="block text-sm font-medium">Mode</label>
            <select
              id="mode"
              {...register("mode")}
              className={`mt-1 block w-full border ${
                errors.mode ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2`}
            >
              <option value="">Select Mode</option>
              <option value="Sales">Sales</option>
              <option value="Leasing">Leasing</option>
            </select>
            {errors.mode && (
              <p className="text-black text-sm mt-1">{errors.mode.message}</p>
            )}
          </div>

          {/* Contract Type */}
          <div>
            <label className="block text-sm font-medium">Contract Type</label>
            <select
              id="contract_type"
              {...register("contract_type")}
              className={`mt-1 block w-full border ${
                errors.contract_type ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2`}
            >
              <option value="">Select Contract Type</option>
              <option value="Exclusive">Exclusive</option>
              <option value="Non-Exclusive">Non-Exclusive</option>
            </select>
            {errors.contract_type && (
              <p className="text-black text-sm mt-1">
                {errors.contract_type.message}
              </p>
            )}
          </div>

          {/* Expected Commission */}
          <h3 className="text-lg font-semibold">Expected Commission</h3>
          <InputField
            placeholder="Commission Rate"
            id="expected_commission.rate"
            type="number"
            register={register}
            error={errors.expected_commission?.rate}
          />

          {/* Image Url */}
          <h3 className="text-lg font-semibold">Image URL</h3>
          <InputField
            placeholder="Image Urls (coma seperated)"
            id="photos"
            register={register}
            error={errors.photos}
          />

          {/* Submit Button */}
          <div>
            <Button type="submit" className="mb-20">
              Add Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
