import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import MobileNoInput from "../components/inputs/MobileNoInput";
import PasswordInput from "../components/inputs/PasswordInput";
import { Home } from "../data/urls";
import { setUserName, signIn } from "../redux/auth/auth.reducer";
import customAxios from "../utils/CustomAxios";
import { loginSchema } from "../validationSchema/authSchema";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const isLoggedIn = useSelector(
    (state) => state.auth.currentUser?.remember_token
  );
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const name = useSelector((state) => state.auth.userName);
  console.log("🚀 ~ file: Login.jsx:30 ~ Login ~ name:", name);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(Home);
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = async (data) => {
    if (isAuthenticating) {
      return;
    }
    setIsAuthenticating(true);
    try {
      const formData = new FormData();
      formData.append("phone", data.phone);
      formData.append("password", data.password);
      for (var pair of formData.entries()) {
        // console.log(pair[0] + ", " + pair[1]);
      }
      const response = await customAxios.post("/patient/login", formData);
      if (response.data.success) {
        dispatch(signIn(response.data.data?.result));
        dispatch(setUserName(response.data.data?.result?.patient_first_name));
        navigate(Home);
      } else {
        enqueueSnackbar(response.data.message, {
          variant: "error",
        });
      }
    } catch (err) {
      console.log(err);
      enqueueSnackbar(err.message, {
        variant: "error",
      });
    }
    setIsAuthenticating(false);
  };
  return (
    <FormContainer
      formTitle={"Login"}
      formSubTitle={
        "We care for your body. It's the only place you have to live in."
      }
      rBtnText={"Login"}
      isLoading={isAuthenticating}
      image={"bg-loginForm"}
      loginPage
      lBtnText={
        <p className="font-thin font-basic-sans-regular tracking-[1px] h-[1rem]">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="font-semibold font-basic-sans-regular tracking-[1px]"
          >
            Signup
          </button>
        </p>
      }
      nextStep={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col space-y-2 w-full">
        <MobileNoInput
          label="Mobile Number"
          placeholder=" XXXX XXXX XXXX"
          focusOnLoad={true}
          fullWidth={true}
          isValidationSet
          register={register}
          name={"phone"}
          schema={loginSchema.phone}
          errorMessage={errors.phone?.message}
        />
        <PasswordInput
          label="Password"
          fullWidth={true}
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          isValidationSet
          register={register}
          name={"password"}
          value={watch("password")}
          schema={loginSchema.password}
          errorMessage={errors.password?.message}
        />
        <div className="w-full lg:w-[95%] pb-3">
          <button
            onClick={() => navigate("/forgotPassword")}
            className="-mt-1.5 md:-mt-6 float-right underline font-thin font-basic-sans-regular text-gray-700 text-size-4"
          >˳
            Forgot your Password?
          </button>
        </div>
      </div>
    </FormContainer>
  );
};

export default Login;
