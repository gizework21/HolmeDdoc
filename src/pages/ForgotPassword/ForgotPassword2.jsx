import React, { useEffect, useState } from "react";
import FormContainer from "../../components/FormContainer";
import MobileNoInput from "../../components/inputs/MobileNoInput";
import StepsNew from '../../components/StepsNew'
import Otp from "../../components/inputs/Otp"
import { forgotPasswordSchema } from '../../validationSchema/authSchema'
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { useSnackbar } from "notistack";
import customAxios from '../../utils/CustomAxios.js'

let list = [
  "Mobile Number",
  "OTP Verification",
  "Reset Password",
];
const initalOtpState = {
  otp_1: "",
  otp_2: "",
  otp_3: "",
  otp_4: "",
  otp_5: "",
  otp_6: "",
};

const ForgotPassword2 = ({  nextStep, phone, setOtp }) => {

  const { register, handleSubmit, watch,  formState: { errors } } = useForm()
  const [otpCode, setOtpCode] = useState(initalOtpState);
  const [otpError, setError] = useState('')
  const [pasted, setPasted] = useState(false)
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false)

  const otp = useMemo(() => {
    // e.preventDefault();
    let otpString = "";
    for (let i = 1; i <= 6; i++) {
      otpString += otpCode[`otp_${i}`];
    }
    return otpString
  }, [otpCode]);

  useEffect(() => {
    if(otp.length === 6){
      setError('')
    }
  },[otp])

  const handleCodeChange = (e) => {
    if(e.target.value.length === 6){
      const arr = e.target.value.split('')
      setOtpCode({
        otp_1: arr[0],
        otp_2: arr[1],
        otp_3: arr[2],
        otp_4: arr[3],
        otp_5: arr[4],
        otp_6: arr[5]
      })
      setPasted(true)
      return
    }
    setPasted(false)
    if(e.target.value.length > 1){
        e.target.value = e.target.value.slice(1, 2);
    }
    else if (e.target.value > 1) {
      e.target.value = e.target.value.slice(0, 1);
    }

    setOtpCode((otpCode) => {
      return {
        ...otpCode,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = async (data) => {
    if(otp.length !== 6){
      return
    }
    setOtp(otp)
    if(isSubmitting){ return }
    setIsSubmitting(true)
    try{  
      const formData = new FormData()
      formData.append('phone', phone)
      formData.append('request_type', 'forget_password')
      formData.append('token', otp)
      const response = await customAxios.post('/patient/verify_otp', formData)
      if(response.data.success){
        nextStep()
      }else{
          enqueueSnackbar(response.data.message, {
            variant: 'error'
          })
      }
    }catch(err){
      enqueueSnackbar(err.message, {
        variant: 'error'
      })
    }
    setIsSubmitting(false)
  }

  const verifyOtp = () => {
    if(otp.length === 0){
      setError('OTP cannot be empty')
    }else if(otp.length !== 6){
      setError('Invalid OTP')
    }
    handleSubmit(onSubmit())()
  }


  return (
    <FormContainer
      formTitle={"Forgot your password?"}
      formSubTitle={
        "Dont worry, we will help you to reset."
      }
      isLoading={isSubmitting}
      rBtnText={"Next"}
      image={"bg-forgotForm"}
      nextStep={verifyOtp}
    >
      <StepsNew currentStep={2} list={list}/>
      <div className="flex flex-col w-full mt-5">
        <MobileNoInput
          label="Mobile Number"
          placeholder="XXXX XXXX XXXX"
          focusOnLoad={true}
          fullWidth={true}
          name={"phone"}
          disableInput
          displayValue={phone}
          // errorMessage="Password must contain Alphanumeric chars"
        />
        <Otp  pasted={pasted} handleCodeChange={handleCodeChange} otpCode={otpCode} errorMessage={otpError}/>
        <span className="text-grey font-light py-5">Didn't receive OTP? <button className="text-green">Resend</button></span>
      </div>
    </FormContainer>
  );
};

export default ForgotPassword2;
