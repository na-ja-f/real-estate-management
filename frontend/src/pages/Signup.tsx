import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  initialValues,
  validationSchema,
  FormValues,
} from "../utils/validations/signupValidation";
import InputField from "../components/ui/InputBox";
import Button from "../components/ui/Button";
import { postSignup } from "../services/api/apiMethods";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginSuccess } from "../redux/reducers/authSlice";
import { useSelector } from "react-redux";

const Signup: React.FC = () => {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (data: FormValues) => {
    postSignup(data)
      .then((response: any) => {
        const data = response.data;
        if (response.status === 201) {
          toast.success(data.message);
          dispatch(loginSuccess({ user: response.data }));
          navigate("/");
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Input */}
          <InputField
            placeholder="Name"
            id="name"
            register={register}
            error={errors.name}
          />

          {/* Email Input */}
          <InputField
            placeholder="Email"
            id="email"
            type="email"
            register={register}
            error={errors.email}
          />

          {/* Password Input */}
          <InputField
            placeholder="Password"
            id="password"
            type="password"
            register={register}
            error={errors.password}
          />

          {/* Submit Button */}
          <div>
            <Button type="submit">Sign Up</Button>
            <Link to={"/login"}>
              <p className="text-center mt-4 font-semibold underline">Login</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
