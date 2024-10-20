import React, { useState } from "react";
import FormContainer from "../../components/FormContainer";
import MobileNoInput from "../../components/inputs/MobileNoInput";
import PasswordInput from "../../components/inputs/PasswordInput";
import Checkbox from "../../components/inputs/Checkbox";
import StepsNew from '../../components/StepsNew'
import { forgotPasswordSchema } from '../../validationSchema/authSchema'
import { useForm } from "react-hook-form";
import customAxios from '../../utils/CustomAxios.js'
import { useSnackbar } from "notistack";

let list = [
  "Mobile Number",
  "OTP Verification",
  "Reset Password",
];

const ForgotPassword1 = ({ nextStep, setPhone }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false)

  

  const onSubmit = async (data) => {
    setPhone(data.phone)
    if(isSubmitting){ return }
    setIsSubmitting(true)
    try{
      const response = await customAxios.post('/patient/forgot_password', {
        phone: data.phone
      })
      // console.log(response)
      if(response.data.success){
        nextStep()
      }else{
        enqueueSnackbar(response.data.message, {
          variant: 'error'
        })
      }
    }catch(err){
      // console.log(err)
      enqueueSnackbar(err.message, {
        variant: 'error'
      })
    }
    setIsSubmitting(false)
  }

  return (
    <FormContainer
      formTitle={"Forgot your password?"}
      formSubTitle={
        "Dont worry, we will help you to reset."
      }
      image={"bg-forgotForm"}
      rBtnText={"Next"}
      isLoading={isSubmitting}
      nextStep={handleSubmit(onSubmit)}
      forgotPassword
    >
      <StepsNew currentStep={1} list={list} />
      {/* <img src={require("../../assets/images/Login/1.jpg")}/> */}
      <div className="flex flex-col space-y-4 w-full mt-5">
        <MobileNoInput
          label="Mobile Number"
          placeholder="XXXX XXXX XXXX"
          focusOnLoad={true}
          fullWidth={true}
          isValidationSet
          register={register}
          name={"phone"}
          schema={forgotPasswordSchema.phone}
          errorMessage={errors.phone?.message}
        // errorMessage="Password must contain Alphanumeric chars"
        />
        <span className="text-gray-400 font-light">Please Note, You would receive an OTP to verify the mobile number.</span>
      </div>
    </FormContainer>
  );
};

export default ForgotPassword1;
