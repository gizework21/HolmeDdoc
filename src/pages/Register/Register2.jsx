import React, { useMemo, useState, useEffect } from 'react'
import FormContainer from '../../components/FormContainer'
import Otp from "../../components/inputs/Otp"
import { Home, Login } from '../../data/urls';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { setUserName } from '../../redux/auth/auth.reducer';
import customAxios from '../../utils/CustomAxios.js'

const initalOtpState = {
    otp_1: "",
    otp_2: "",
    otp_3: "",
    otp_4: "",
    otp_5: "",
    otp_6: "",
  };
  
const Register2 = ({ phone }) => {
    const [otpCode, setOtpCode] = useState(initalOtpState);
    const [otpError, setError] = useState('')
    const [pasted, setPasted] = useState(false)
    const [timeLeft, setTimeLeft] = useState(30);
    const [isSubmitting, setIsSubmitting] = useState(false)

    // const dispatch = useDispatch()

    useEffect(() => {
      if (!timeLeft) return;
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [timeLeft]);

    const navigate = useNavigate()

    // const user = useSelector(state => state.auth.phoneNumber).slice(-2)

    const {enqueueSnackbar} = useSnackbar()

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

    const verifyOtp = async () => {
        if(otp.length === 0){
            setError('OTP cannot be empty')
            return
        }else if(otp.length !== 6){
            setError('Invalid OTP')
            return
        }
        if(isSubmitting){ return }
        setIsSubmitting(true)
        try{  
          const formData = new FormData()
          formData.append('phone', phone)
          formData.append('request_type', 'register')
          formData.append('token', otp)
          const response = await customAxios.post('/patient/verify_otp', formData)
          if(response.data.success){
            navigate(Login)
            enqueueSnackbar('Registered Succesfully', {variant : 'success'})
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
    
   
    return (
        <FormContainer
            formTitle={"OTP Verification"}
            formSubTitle={`Enter 6 digit verification code sent to your mobile number +1 XXX XXX X${phone.slice(-2)}`}
            rBtnText={"Verify"}
            image={"bg-registerForm"}
            nextStep={verifyOtp}
            isLoading={isSubmitting}
            loginPage
            subtitleInOneline
        >
            <div className='w-full mt-5 space-y-8'>
                <div>
                    <Otp noLabel pasted={pasted} largeInput handleCodeChange={handleCodeChange} otpCode={otpCode} errorMessage={otpError}/>
                    <h1 className='text-green float-right text-size-8 -mt-2'>0:<span>{timeLeft > 9 ? timeLeft : `0${timeLeft}`}</span></h1>
                </div>
                <div>
                    <span className="text-gray-500 tracking-[2px] font-light text-size-10">Didn't receive OTP? <button className="text-green/50 underline font-light tracking-[1px]">Resend</button></span>
                </div>
            </div>
        </FormContainer>
    )
}

export default Register2