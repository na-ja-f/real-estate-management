import * as Yup from "yup";

export interface FormValues {
  name: string;
  email: string;
  password: string;
}

export const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
};

export const validationSchema = Yup.object({
  name: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
