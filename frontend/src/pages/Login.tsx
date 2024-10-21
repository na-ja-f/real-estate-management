import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  initialValues,
  validationSchema,
  FormValues,
} from "../utils/validations/loginValidation";
import InputField from "../components/ui/InputBox";
import Button from "../components/ui/Button";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { postLogin } from "../services/api/apiMethods";
import { loginSuccess } from "../redux/reducers/authSlice";

const Login: React.FC = () => {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    postLogin(data)
      .then((response: any) => {
        const data = response.data;
        if (response.status === 200) {
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
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <Button type="submit">Login</Button>
          </div>
          <Link to={"/signup"}>
            <p className="text-center mt-4 font-semibold underline">Signup</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
