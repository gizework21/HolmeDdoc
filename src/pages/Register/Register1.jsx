import React, { useMemo } from 'react'
import FormContainer from '../../components/FormContainer'
import TextInput from '../../components/inputs/TextInput'
import NewBirthdatePicker from "../../components/inputs/NewBirthdatePicker"
import MobileNoInput from "../../components/inputs/MobileNoInput"
import PasswordInput from '../../components/inputs/PasswordInput'
import { useForm } from "react-hook-form";
import { registerSchema } from '../../validationSchema/authSchema'
import { useState } from 'react'
import InputDropdown from '../../components/inputs/InputDropdown'
import CustomAxios from '../../utils/CustomAxios'
import { useSnackbar } from "notistack";
import { useDispatch } from 'react-redux'
import { setPhoneNumber, setUserName } from '../../redux/auth/auth.reducer'
import Checkbox from '../../components/inputs/Checkbox'
import { PrivacyPolicy, TermsOfService } from '../../data/urls'
import { Link } from 'react-router-dom'


const Register1 = ({ nextStep, setPhone }) => {
    const { register, handleSubmit, watch,  formState: { errors }, setValue } = useForm()
    const [birthDay, setBirthDay] = useState({ value : '', error: false})
    const password = watch('password')
    const confirmPassword = watch('confirmPassword')
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        if(!birthDay.value){
            return
        }

        if(password !== confirmPassword){
            return
        }

        // console.log(data)

        const reqObj = {
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone,
            password: data.password,
            gender: data.gender === 'Others' ? 'OTHER' : data.gender,
            dob: birthDay.value,
            email: data.email,
        }
        setIsLoading(true)
        try{
            const response = await CustomAxios.post('/patient/register', reqObj)
            if(response.data.success){
                setPhone(data.phone)
                nextStep()
            }else{
                // console.log(response)
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
        setIsLoading(false)
    }

    const selectedGender = watch('gender')

    const [state, setState] = useState(null)

    // console.log(state)
    
    const errorMessage = useMemo(() => {
        if(password !== confirmPassword){
            return "Password doesn't match"
        }
        return ""
    }, [password, confirmPassword])
    // const handleChangeByEvent = (e) => handleChange({ name: e.target.name, value: e.target.value })
    
    const nextPage = () => {
        if(!birthDay.value){
            setBirthDay({ value: null, error: true })
        }
        handleSubmit(onSubmit)()
    }
    
    const setBirthDate = (date) => {
        setBirthDay({ value: date, error: false })
    }
    return (
        <FormContainer
            formTitle={"Register"}
            formSubTitle={"Let's get you setup so that you can manage your profile and start booking appointments."}
            rBtnText={"Next"}
            isLoading={isLoading}
            image={"bg-signUpForm"}
            nextStep={nextPage}
        >
            <div className='grid xs:grid-cols-2 gap-x-4 xl:gap-x-6 gap-y-2 tall:gay-y-0 w-full'>
                <TextInput
                    label="First Name"
                    placeholder="Your first name"
                    focusOnLoad={true}
                    fullWidth={true}
                    isValidationSet
                    register={register}
                    name={"firstName"}
                    schema={registerSchema.firstName}
                    errorMessage={errors.firstName?.message}
                    // name={"firstName"}
                    // value={firstName}
                    // handleChange={handleChangeByEvent}
                // errorMessage="Password must contain Alphanumeric chars"
                />
                <TextInput
                    label="Last Name"
                    fullWidth={true}
                    placeholder="Your last name"
                    focusOnLoad={false}
                    isValidationSet
                    register={register}
                    name={"lastName"}
                    schema={registerSchema.lastName}
                    errorMessage={errors.lastName?.message}
                />
                {/* <RadioButton
                    label={"Gender"}
                    value={gender}
                    selectOption={handleChangeForRadio}
                    options={Gender}
                /> */}
                {/* <SelectDropdown 
                    label={"Gender"}
                    fullWidth={true}
                    isValidationSet
                    schema={registerSchema.gender}
                    register={register}
                    name={"gender"}
                    errorMessage={errors.gender?.message}
                    options={[ { title: 'Male', id: 1 }, { title: 'Female', id: 2 }, { title: 'Others', id: 3 } ]}
                    value={selectedGender}
                /> */}
                <InputDropdown
                    label={"Gender"}
                    isValidationSet
                    schema={registerSchema.gender}
                    register={register}
                    name={"gender"}
                    errorMessage={errors.gender?.message}
                    allowClick={true}
                    textXs
                    grayDropdownIcon={true}
                    searchDisabled
                    options={[
                        { title: "Male", id: 1 },
                        { title: "Female", id: 2 },
                        { title: "Others", id: 3 },
                    ]}
                        setValue={setValue}
                        searchTerm={watch("gender") ?? ""}
                        placeholder={"Select"}
                        selectedOption={state}
                        disableInput
                        value={selectedGender}
                        selectOption={(val) => setState(val)}
                    />
                {/* <BirthdayDatePicker 
                    setBirthDate={setBirthDate}
                    errorMessage={birthDay.error ? 'Please select your birthdate' : ''}
                /> */}
                <NewBirthdatePicker 
                    label={"DOB"}
                    fullWidth={true}
                    value={birthDay.value}
                    setBirthDate={setBirthDate}
                    errorMessage={birthDay.error ? 'Please select your birthdate' : ''}
                />
                <MobileNoInput
                    label={"Mobile Number"}
                    fullWidth={true}
                    isValidationSet
                    register={register}
                    placeholder="XXX XXX XXXX"
                    name={"phone"}
                    schema={registerSchema.phone}
                    errorMessage={errors.phone?.message}
                />
                <TextInput
                    label="Email ID"
                    placeholder="email@domain.com"
                    focusOnLoad={false}
                    fullWidth={true}
                    isValidationSet
                    register={register}
                    name={"email"}
                    schema={registerSchema.email}
                    errorMessage={errors.email?.message}
                />
                <PasswordInput
                    label="Enter Password"
                    fullWidth={true}
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    isValidationSet
                    register={register}
                    name={"password"}
                    schema={registerSchema.password}
                    value={password}
                    errorMessage={errorMessage ? errorMessage : errors.password?.message}
                />
                <PasswordInput
                    label="Confirm Password"
                    fullWidth={true}
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    isValidationSet
                    register={register}
                    name={"confirmPassword"}
                    value={confirmPassword}
                    schema={registerSchema.confirmPassword(password)}
                    errorMessage={errorMessage ? errorMessage : errors.confirmPassword?.message}
                />
                <div className='col-span-2 py-5'>
                    <Checkbox
                        isValidationSet
                        register={register}
                        name={"confirm"}
                        schema={registerSchema.confirm}
                        errorMessage={errors.confirm?.message} 
                        label={<span className='font-basic-sans-regular text-size-3'>I have read the <Link to={PrivacyPolicy} className='font-basic-sans-regular cursor-pointer font-black underline text-gray-500'>Privacy Policy</Link> and agreed to the <Link to={TermsOfService} className='font-basic-sans-regular cursor-pointer font-bold underline font-black text-gray-500'>Terms of Service</Link></span>} 
                    />
                </div>
            </div>
        </FormContainer>
    )
}

export default Register1