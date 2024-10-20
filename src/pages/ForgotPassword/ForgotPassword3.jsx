import React, { useState } from "react";
import FormContainer from "../../components/FormContainer";
import PasswordInput from "../../components/inputs/PasswordInput";
import StepsNew from '../../components/StepsNew'
import { useNavigate } from 'react-router-dom'
import { forgotPasswordSchema } from '../../validationSchema/authSchema'
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { Login } from "../../data/urls";
import { useSnackbar } from "notistack";
import customAxios from '../../utils/CustomAxios.js'

let list = [
    "Mobile Number",
    "OTP Verification",
    "Reset Password",
];

const ForgotPassword3 = ({ nextStep, otp, phone }) => {
    const navigate = useNavigate()
    
    const { register, handleSubmit, watch,  formState: { errors } } = useForm()
    const password = watch('password')
    const confirmPassword = watch('confirmPassword')
    const { enqueueSnackbar } = useSnackbar();
    const [isSubmitting, setIsSubmitting] = useState(false)

    const errorMessage = useMemo(() => {
        if(password !== confirmPassword){
            return "Password doesn't match"
        }
        return ""
    }, [password, confirmPassword])

    const onSubmit = async (data) => {
        if(password !== confirmPassword){
            return
        }
        if(isSubmitting){ return }
        setIsSubmitting(true)
        try{
        const response = await customAxios.post('/patient/update_password', {
            phone,
            token: otp,
            password: data.password,
            password_confirmation: data.confirmPassword
        })
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
    return (
        <FormContainer
            formTitle={"Forgot your password?"}
            formSubTitle={
                "Dont worry, we will help you to reset."
            }
            rBtnText={"Reset"}
            image={"bg-forgotForm"}
            nextStep={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
        >
            <StepsNew currentStep={3} list={list} />
            <div className="flex flex-col space-y-2 w-full mt-5">
                <PasswordInput
                    label="Enter password"
                    fullWidth={true}
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    isValidationSet
                    register={register}
                    name={"password"}
                    value={password}
                    schema={forgotPasswordSchema.password}
                    errorMessage={errorMessage ? errorMessage : errors.password?.message}
                // errorMessage="Password must contain Alphanumeric chars"
                />
                <PasswordInput
                    label="Confirm Password"
                    fullWidth={true}
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    isValidationSet
                    register={register}
                    value={confirmPassword}
                    name={"confirmPassword"}
                    schema={forgotPasswordSchema.confirmPassword(password)}
                    errorMessage={errorMessage ? errorMessage : errors.confirmPassword?.message}
                // errorMessage="Password must contain Alphanumeric chars"
                />
            </div>
        </FormContainer>
    );
};

export default ForgotPassword3;
