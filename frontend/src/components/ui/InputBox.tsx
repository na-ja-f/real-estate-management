import React from "react";
import { FieldError } from "react-hook-form";

interface InputFieldProps {
  placeholder: string;
  id: string;
  type?: string;
  register: any; // react-hook-form's `register` function
  error?: FieldError; // To handle validation errors
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  id,
  type = "text",
  register,
  error,
}) => {
  return (
    <div>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        className={`mt-1 p-2 block w-full border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm`}
      />
      {error && <p className="text-black text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default InputField;
