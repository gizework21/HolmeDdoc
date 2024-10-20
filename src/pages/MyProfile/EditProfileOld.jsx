import React, { useMemo } from 'react'
import FormContainer from '../../components/FormContainer'
import TextInput from '../../components/inputs/TextInput'
import RadioButton from "../../components/inputs/RadioButton"
import BirthdayDatePicker from "../../components/inputs/BirthdayDatePicker"
import MobileNoInput from "../../components/inputs/MobileNoInput"
import { useForm } from "react-hook-form";
import { registerSchema } from '../../validationSchema/authSchema'
import { useState } from 'react'
import { Gender } from '../../utils/DummyData'
import ZipInput from '../../components/inputs/ZipInput'
import InputDropdown from "../../components/inputs/InputDropdown";
import { SearchItems } from "../../utils/DummyData";
import { bookAppointmentSchema } from "../../validationSchema/authSchema";
import { Bars3Icon } from '@heroicons/react/20/solid'

const EditProfile = () => {
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm()
    const [birthDay, setBirthDay] = useState({ value: null, error: false })
    const [gender, setGender] = useState(Gender[0])
    const zipCode = watch('zip')
    const onSubmit = data => {
        if (!birthDay.value) {
            return
        }
        // console.log(data);
        // nextStep()
    }
    const [state, setState] = useState(null)

    const password = watch('password')
    const confirmPassword = watch('confirmPassword')

    const errorMessage = useMemo(() => {
        if (password !== confirmPassword) {
            return "Password doesn't match"
        }
        return ""
    }, [password, confirmPassword])
    // const handleChangeByEvent = (e) => handleChange({ name: e.target.name, value: e.target.value })

    const nextPage = () => {
        if (!birthDay.value) {
            setBirthDay({ value: null, error: true })
        }
        handleSubmit(onSubmit)()
    }

    const handleChangeForRadio = (item) => setGender(item)

    const setBirthDate = (date) => {
        setBirthDay({ value: date, error: false })
    }
    return (
        <FormContainer
            formTitle={"Update Profile"}
            rBtnText={"Edit Profile"}
            profilePage
            nextStep={nextPage}
        >
            <div className='md:grid xs:grid-cols-2 gap-4 xs:gap-x-8 gap-y-2 tall:gay-y-4 w-full xl:px-10'>
                <TextInput
                    label="First name"
                    placeholder="Your first name"
                    focusOnLoad={true}
                    fullWidth={true}
                    isValidationSet
                    register={register}
                    name={"firstName"}
                    schema={registerSchema.firstName}
                    errorMessage={errors.firstName?.message}
                />
                <TextInput
                    label="Last name"
                    fullWidth={true}
                    placeholder="Your last name"
                    focusOnLoad={false}
                    isValidationSet
                    register={register}
                    name={"lastName"}
                    schema={registerSchema.lastName}
                    errorMessage={errors.lastName?.message}
                />
                <RadioButton
                    label={"Gender"}
                    value={gender}
                    selectOption={handleChangeForRadio}
                    options={Gender}
                />
                <BirthdayDatePicker
                    setBirthDate={setBirthDate}
                    errorMessage={birthDay.error ? 'Please select your birthdate' : ''}
                />
                <MobileNoInput
                    label={"Mobile Number"}
                    fullWidth={true}
                    isValidationSet
                    placeholder={"XXXX XXXX XX"}
                    register={register}
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
                <InputDropdown
                    isValidationSet
                    register={register}
                    name={"insurance"}
                    schema={bookAppointmentSchema.insurance}
                    errorMessage={errors.insurance?.message}
                    setValue={setValue}
                    searchTerm={watch('insurance') ?? ''}
                    label={"Select your insurance"}
                    showDropdownIcon={true}
                    options={SearchItems}
                    placeholder={"Select Insurance"}
                    selectedOption={state}
                    selectOption={val => setState(val)}
                />
                <TextInput
                    label="Policy Number"
                    fullWidth={true}
                    focusOnLoad={false}
                    isValidationSet
                    register={register}
                    name={"policyNumber"}
                    placeholder={"Policy number"}
                    schema={registerSchema.policyNumber}
                    errorMessage={errors.policyNumber?.message}
                />
                <div className="flex flex-col space-y-2 col-span-2">
                    <TextInput
                        label="Apartment/Building/Unit"
                        placeholder="Building Name, Apartment"
                        focusOnLoad={true}
                        fullWidth={true}
                        isValidationSet
                        register={register}
                        name={"apartment"}
                        schema={registerSchema.apartment}
                        errorMessage={errors.apartment?.message}
                    // errorMessage="Password must contain Alphanumeric chars"
                    />
                    <TextInput
                        label="Street Address"
                        fullWidth={true}
                        placeholder="Locality"
                        focusOnLoad={false}
                        isValidationSet
                        register={register}
                        name={"streetAddress"}
                        schema={registerSchema.streetAddress}
                        errorMessage={errors.streetAddress?.message}
                    // errorMessage="Password must contain Alphanumeric chars"
                    />
                    <div className="grid md:grid-cols-4 gap-2 space-y-2 md:space-y-0">
                        <div className="md:col-span-2">
                            <InputDropdown
                                label="City"
                                showDropdownIcon={false}
                                options={SearchItems}
                                placeholder={"City Name"}
                                isValidationSet
                                register={register}
                                name={"city"}
                                schema={registerSchema.city}
                                errorMessage={errors.city?.message}
                                setValue={setValue}
                                searchTerm={watch('city') ?? ''}
                            />
                        </div>
                        <InputDropdown
                            isValidationSet
                            register={register}
                            name={"state"}
                            schema={registerSchema.state}
                            errorMessage={errors.state?.message}
                            setValue={setValue}
                            searchTerm={watch('state') ?? ''}
                            label={"State"}
                            showDropdownIcon={true}
                            options={SearchItems}
                            placeholder={"State"}
                        />
                        <ZipInput
                            label="Zip"
                            fullWidth={true}
                            placeholder="Zip Code"
                            focusOnLoad={false}
                            setValue={setValue}
                            isValidationSet
                            register={register}
                            value={zipCode ? zipCode : ''}
                            name={"zip"}
                            schema={registerSchema.zip}
                            errorMessage={errors.zip?.message}
                        // errorMessage="Password must contain Alphanumeric chars"
                        />
                    </div>
                </div>
            </div>
        </FormContainer>
    )
}

export default EditProfile