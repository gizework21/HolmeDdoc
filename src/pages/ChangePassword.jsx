import React, { useMemo } from "react";
import FormContainer from "../components/FormContainer";
import PasswordInput from "../components/inputs/PasswordInput";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "../validationSchema/authSchema";
import { useState } from "react";
import { Home, Login, MyProfile } from "../data/urls";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import GreenButton from "../components/GreenButton";
import SuccessModal from "../components/SuccessModal";
import customAxios from "../utils/CustomAxios";
import { useSnackbar } from "notistack";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const oldPassword = watch("oldPassword");
  const { enqueueSnackbar } = useSnackbar();

  const [showPortal, setShowPortal] = useState(false);

  const closePortal = () => setShowPortal(false);

  const onSubmit = async (data) => {
    if (password !== confirmPassword) {
      return;
    }
    const response = await customAxios.post("/patient/change_password", {
      current_password: oldPassword,
      confirm_password: confirmPassword,
      new_password: password,
    });
    console.log(response);
    try {
      if (response.data.success === 1) {
        setShowPortal(true);
      } else {
        enqueueSnackbar(response.data.message, {
          variant: "error",
        });
      }
    } catch (err) {
      enqueueSnackbar(err.message, {
        variant: "error",
      });
    }
  };

  const errorMessage = useMemo(() => {
    if (password !== confirmPassword) {
      return "Password doesn't match";
    }
    return "";
  }, [password, confirmPassword]);

  const nextPage = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <SuccessModal showPortal={showPortal} closePortal={closePortal} successUrl={MyProfile} btnText={"Back to Profile"}/>
      <FormContainer
        formTitle={"Change password?"}
        rBtnText={"Continue"}
        image={"bg-changePassword"}
        nextStep={nextPage}
        loginPage
        changePassword
      >
        <div className="flex flex-col space-y-2 w-full -mt-5">
          <PasswordInput
            label="Old Password"
            fullWidth={true}
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            isValidationSet
            register={register}
            name={"oldPassword"}
            schema={changePasswordSchema.oldPassword}
            value={oldPassword}
            errorMessage={errors.oldPassword?.message}
          />
          <PasswordInput
            label="New Password"
            fullWidth={true}
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            isValidationSet
            register={register}
            name={"password"}
            schema={changePasswordSchema.password}
            value={password}
            errorMessage={
              errorMessage ? errorMessage : errors.password?.message
            }
          />
          <PasswordInput
            label="Confirm Password"
            fullWidth={true}
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            isValidationSet
            register={register}
            name={"confirmPassword"}
            value={confirmPassword}
            schema={changePasswordSchema.confirmPassword}
            errorMessage={
              errorMessage ? errorMessage : errors.confirmPassword?.message
            }
          />
        </div>
      </FormContainer>
    </>
  );
};

export default ChangePassword;
