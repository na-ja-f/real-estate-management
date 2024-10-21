import * as Yup from "yup";

// Validation schema for the property form
export const propertyValidationSchema = Yup.object({
  property_name: Yup.string().required("Property name is required"),
  property_type: Yup.string().required("Property type is required"),
  location: Yup.object({
    area: Yup.string().required("Area is required"),
    // google_maps_link: Yup.string()
    //   .required("Google Maps link is required"),
    zone_number: Yup.number().required("Zone number is required"),
    street_number: Yup.number().required("Street number is required"),
    building_number: Yup.number().required("Building number is required"),
  }),
  mode: Yup.string().required("Property mode is required"),
  contract_type: Yup.string().required("Contract type is required"),
  expected_commission: Yup.object({
    rate: Yup.number().required("Commission rate is required"),
  }),
  photos: Yup.string().url("invalid Url"),
});
