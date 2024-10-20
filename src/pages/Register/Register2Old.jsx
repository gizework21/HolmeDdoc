import React, { useState } from "react";
import FormContainer from "../../components/FormContainer";
import Checkbox from "../../components/inputs/Checkbox";
import TextInput from "../../components/inputs/TextInput";
import InputDropdown from "../../components/inputs/InputDropdown";
import { SearchItems } from "../../utils/DummyData";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../../validationSchema/authSchema";
import { useForm } from "react-hook-form";
import ZipInput from '../../components/inputs/ZipInput'

const Register2 = () => {
  // const [state, setState] = useState(null)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    setError
  } = useForm();

  const zipCode = watch('zip')

  const onSubmit = (data) => {
    // console.log(data);
    navigate("/");
  };

  const signUp = () => {
    // if(!zipCode){
    //   setError('zip', 'Zip is required', { shouldValidate: true } )
    // }else if(zipCode.length === 6){
    //   setError('zip', 'Length should be 6 digits', { shouldValidate: true })
    // }
    handleSubmit(onSubmit)();
  };

  return (
    <FormContainer
      formTitle={"Register"}
      formSubTitle={
        "Let's get you setup so that you can manage your profile and start booking appointments."
      }
      rBtnText={"Sign Up"}
      image={"bg-registerForm"}
      nextStep={signUp}
    >
      <div className="flex flex-col space-y-2 w-full">
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
            placeholder={"City Name"}
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
        <Checkbox
          isValidationSet
          register={register}
          name={"certify"}
          schema={registerSchema.certify}
          errorMessage={errors.certify?.message}
          label="I certify that the information provided is accurate and data should be passed to any third party platform."
        />
      </div>
    </FormContainer>
  );
};

export default Register2;
