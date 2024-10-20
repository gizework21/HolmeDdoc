import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import _debounce from "lodash/debounce";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RollingLoaderWhite from "../../assets/images/Login/RollingLoaderWhite.svg";
import GreenButton from "../../components/GreenButton";
import HolmeddocLoader from "../../components/HolmeddocLoader";
import Image from "../../components/Image";
import InputDropdown from "../../components/inputs/InputDropdown";
import InputDropdown2 from "../../components/inputs/InputDropdown2";
import MobileNoInput from "../../components/inputs/MobileNoInput";
import NewBirthdatePicker from "../../components/inputs/NewBirthdatePicker";
import TextInput from "../../components/inputs/TextInput";
import { MyProfile } from "../../data/urls";
import { setPatientEmail, setUserName } from "../../redux/auth/auth.reducer";
import {
  createFormData,
  getAllCity,
  getAllInsuarance,
  getAllState,
  getAllZip,
} from "../../services/master";
import customAxios from "../../utils/CustomAxios";
import { bookAppointmentSchema, registerSchema } from "../../validationSchema/authSchema";
import ProfileHeader from "./ProfileHeader";

const changeDateFormat = (date, invert) => {
  if (!date) return;
  if (invert) {
    const arr = date?.split("/");
    // console.log(arr)
    return `${arr[2]}-${arr[0]}-${arr[1]}`;
  }
  const arr = date?.split("-");
  return `${arr[1]}/${arr[2]}/${arr[0]}`;
};

const schema = Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "First name is required",
    "string.empty": "First name is required",
  }),
  lastName: Joi.string().required().messages({
    "any.required": "Last name is required",
    "string.empty": "Last name is required",
  }),
  gender: Joi.string().required(),
  phone: Joi.number().required().messages({
    "any.required": "Phone is required"
  }),
  email: Joi.string().required().messages({
    "any.required": "Email is required",
    "string.empty": "Email is required"
  }),
  insurance: Joi.object().keys({
    id: Joi.number().required(),
    insurance_company_name: Joi.string().required()
  }).required().messages({
    "any.required": "Insurance is required",
    "object.base": "Insurance is required",
  }).unknown(),
  policyNumber: Joi.string().required().messages({
    "any.required": "Policy number is required",
    "string.empty": "Policy number is required",
  }),
  apartment: Joi.string().required().messages({
    "any.required": "Apartment name is required",
    "string.empty": "Apartment name is required",
  }),
  streetAddress: Joi.string().required().messages({
    "any.required": "Street address is required",
    "string.empty": "Street address is required",
  }),
  city: Joi.object()
    .keys({
      id: Joi.number().required(),
      city_name: Joi.string().required(),
    })
    .required()
    .messages({
      "any.required": "City is required",
      "object.base": "City is required",
    })
    .unknown(),
  state: Joi.object()
    .keys({
      id: Joi.number().required(),
      state_name: Joi.string().required(),
    })
    .required()
    .messages({
      "any.required": "State is required",
      "object.base": "State is required",
    })
    .unknown(),
  zip: Joi.object()
    .keys({
      id: Joi.number().required(),
      zip: Joi.string().required(),
    })
    .required()
    .messages({
      "any.required": "Zip code is required",
      "object.base": "Zip code is required",
    })
    .unknown(),
});

const EditProfile = () => {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(schema),
  });
  const [birthDay, setBirthDay] = useState({ value: null, error: false });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false)

  const zipCode = watch("zip");

  const dispatch = useDispatch()


  const onSubmit = async (data) => {
    setIsSubmitting(true)
    // console.log('2')
    if (!birthDay.value) {
      return;
    }
    const reqObj = {
      patient_first_name: data.firstName,
      patient_last_name: data.lastName,
      patient_gender:
        data.gender === "Male" ? "M" : data.gender === "Female" ? "F" : "OTHER",
      patient_dob: changeDateFormat(birthDay.value, true),
      patient_email: data.email,
      policy_number: data.policyNumber,
      state_id: data.state.id,
      city_id: data.city.id,
      apartment: data.apartment,
      address1: data.streetAddress,
      zip_code_id: data.zip.id,
      insurance_company: data.insurance.id,
    };

    const formData = createFormData(reqObj);

    // console.log(
    //   "🚀 ~ file: EditProfile.jsx:123 ~ onSubmit ~ reqObj",
    //   reqObj
    // );

    try {
      const response = await customAxios.post(
        "/patient/edit_profile",
        formData
      );
      if (response.data.success === 1) {
        // ! when name changed on edit profile it doesnt showed up in mobile menu --> Ubaid
        // ! changed it to happen on success 
        dispatch(setPatientEmail(data.email))
        dispatch(setUserName(data.firstName)) 
        navigate(MyProfile);
      } else {
        // console.log(response)
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    } catch (err) {
      // console.log(err.response.data.message)
      enqueueSnackbar(err.message, { variant: "error" });
    }
    setIsSubmitting(false)
  };
  const [state, setState] = useState(null);

  const updateProfile = () => {
    if (!birthDay.value) {
      setBirthDay({ value: null, error: true });
    }
    // console.log('1')
    handleSubmit(onSubmit)();
  };
  const setBirthDate = (date) => {
    setBirthDay({ value: date, error: false });
  };

  const [stateList, setStateList] = useState([]); //for state

  const [cityList, setCityList] = useState([]); // for city

  const [zipList, setZipList] = useState([]); // for zipCode

  const [insuranceList, setInsuranceList] = useState([]); // for insuarance

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      const response = await customAxios.post("/patient/profile");
      if (response.data.success) {
        const result = response.data.data?.result;
        setValue("firstName", result.patient_first_name);
        setValue("lastName", result.patient_last_name);
        setValue(
          "gender",
          result.patient_gender === "M"
            ? "Male"
            : result.patient_gender === "F"
            ? "Female"
            : "Others"
        );
        setValue("phone", result.patient_phone);
        setValue("apartment", result.apartment);
        setValue("policyNumber", result.policy_number);
        setValue("email", result.patient_email);
        setValue("streetAddress", result.address1);
        setBirthDay({
          value: changeDateFormat(result?.patient_dob),
          error: false,
        });
        let reqObj = {
        }
        let reqObj2 = {} 
        if(result.state_id){
          reqObj.state_id = result.state_id
          reqObj2.state_id = result.state_id
        }
        if(result.city_id){
          reqObj.city_id = result.city_id
          reqObj2.id = result.city_id
        }
        const cities = await getAllCity({
          ...reqObj2,
        });
        const insurance = await getAllInsuarance();
        const insurance_company =
          insurance.find(
            (el) => el.insurance_company_name === result.insurance_company
          )?.id ?? "";
        if(!result.apartment){
          reqObj.city_id = null
          reqObj.state_id = null
          reqObj.zip_code_id = null
        }
        setState({ ...result, insurance_company, ...reqObj } ?? {});
        const zip = await getAllZip({
          state_id: result.state_id,
          city_id: result.city_id,
        });
        const state = await getAllState({ id: reqObj.state_id});
        setCityList(cities);
        setStateList(state);
        setZipList(zip);
        setInsuranceList(insurance);
        setIsFetching(false);
      }
    })();
  }, []);

  const stateValue = watch("state");
  const cityValue = watch("city");
  const zipValue = watch("zip");

  const prevState = useRef();
  const prevCity = useRef();

  const firstRender1 = useRef(true);
  const firstRender2 = useRef(true);

  useEffect(() => {
    if(firstRender1.current){
      return
    }
    if(cityValue?.id){
      setState((v) => ({...v, city_id: cityValue.id, zip_code_id: null}))
    }
  }, [cityValue])

  useEffect(() => {
    if(firstRender1.current){
      return
    }
    if(zipValue?.id){
      setState((v) => ({...v, zip_code_id: zipValue.id}))
    }
  }, [zipValue])

  useEffect(() => {
    if (firstRender2.current) {
      firstRender2.current = false;
      return;
    }
    if (cityValue?.id === prevCity.current) {
      return;
    } else {
      prevCity.current = cityValue?.id;
    }
    (async () => {
      if (!cityValue) {
        //  setState(v => ({
        //   ...v,
        //   zip_code_id: null
        // }))
        // setValue("zip", null, { shouldValidate: true });
        return
      }
      const reqObj = {};
      if (stateValue) {
        reqObj.state_id = parseInt(stateValue.id);
      }
      if (cityValue) {
        reqObj.city_id = parseInt(cityValue.id);
      }
      const zip = await getAllZip(reqObj);
      const selectedZip = zip.find((el) => el.zip === zipValue?.zip);
      setZipList(zip);
      if (selectedZip) {
        setState((v) => ({
          ...v,
          zip_code_id: selectedZip.id,
        }));
      } else {
        // setState(v => ({
        //   ...v,
        //   zip_code_id: null
        // }))
        setValue("zip", null, { shouldValidate: true });
      }
    })();
    //call zip api
  }, [cityValue]);

  useEffect(() => {
    if (firstRender1.current) {
      firstRender1.current = false;
      return;
    }
    if (stateValue?.id === prevState.current) {
      return;
    } else {
      prevState.current = stateValue?.id;
    }
    (async () => {
      if (!stateValue) return;

      //if selected state same as current state return
      if (stateValue.id === state.state_id) return;

      //set state to empty so that previous values are not dispalyed
      setCityList([]);
      setZipList([]);

      const city = await getAllCity({
        state_id: parseInt(stateValue.id)
      })
      setCityList(city)
      const selectedCity = city.find(el => el.city_name === cityValue?.city_name)
      if (selectedCity) {
        setState((v) => ({
          ...v,
          city_id: selectedCity.id,
        }));
      } else {
        setState((v) => ({
          ...v,
          city_id: null,
          zip_code_id: null
        }))
        setValue('city', null)
        setValue('zip', null)
      }
    })()
  }, [stateValue])

  const getAllStateWhenSearch = async (searchTerm) => {
    const state = await getAllState({ name: searchTerm });
    setStateList(state)
  }

  const getAllCityWhenSearch = async (searchTerm) => {
    const cities = await getAllCity({
      name: searchTerm,
      state_id: parseInt(stateValue.id),
    });
    setCityList(cities)
  }


  const getAllZipWhenSearch = async (searchTerm) => {
    setState((v) => ({
      ...v,
      zip_code_id: null
    }))
    setValue('zip', null)
    const zip = await getAllZip({
      name: searchTerm,
      state_id: parseInt(stateValue.id),
      city_id: parseInt(cityValue.id),
    });
    setZipList(zip)
  }

  const debounceStateFn = _debounce(
    (searchTerm) => getAllStateWhenSearch(searchTerm),
    1000
  );
  const debounceCityFn = _debounce(
    (searchTerm) => getAllCityWhenSearch(searchTerm),
    1000
  );

  const handleStateSearch = (searchTerm) => {
    setState((v) => ({
      ...v,
      state_id: null,
      city_id: null,
      zip_code_id: null
    }))
    setValue('state', null)
    setValue('city', null)
    setValue('zip', null)
    debounceStateFn(searchTerm)
  }

  const handleCitySearch = (searchTerm) => {
    setState((v) => ({
      ...v,
      city_id: null,
      zip_code_id: null
    }))
    setValue('city', null)
    setValue('zip', null)
    debounceCityFn(searchTerm)
  }


  if (isFetching) {
    return (
        <div className="flex items-center justify-center w-full h-[100vh]">
            <HolmeddocLoader />
        </div>
    );
  }
  const dob = changeDateFormat(state?.patient_dob);
  return (
    <div className="pt-10 tall:pt-20 px-10">
      <ProfileHeader></ProfileHeader>
      <div className="pt-16 tall:pt-24 md:grid xs:grid-cols-2 gap-4 md:gap-x-16 xl:gap-x-32 gap-y-2 tall:gay-y-4 w-full xl:px-10">
        <div className="md:grid xs:grid-cols-2 gap-4">
          <TextInput
            label="First name"
            placeholder="Your first name"
            focusOnLoad={true}
            fullWidth={true}
            isValidationSet
            register={register}
            name={"firstName"}
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
          {/* <SelectDropdown
            label={"Gender"}
            fullWidth={true}
            isValidationSet
            schema={registerSchema.gender}
            register={register}
            name={"gender"}
            dropdownIconWithBorder
            errorMessage={errors.gender?.message}
            options={[
              { title: "Male", id: 1 },
              { title: "Female", id: 2 },
              { title: "Others", id: 3 },
            ]}
            value={selectedGender}
          /> */}
          <InputDropdown
            label={"Gender"}
            isValidationSet
            schema={registerSchema.gender}
            register={register}
            name={"gender"}
            errorMessage={errors.gender?.message}
            textXs
            allowClick
            options={[
              { title: "Male", id: 1 },
              { title: "Female", id: 2 },
              { title: "Others", id: 3 },
            ]}
            searchDisabled
            setValue={setValue}
            searchTerm={watch("gender") ?? ""}
            showDropdownIcon={true}
            placeholder={"Select"}
            selectedOption={state}
            disableInput
          />
          <NewBirthdatePicker
            label={"DOB"}
            fullWidth={true}
            value={birthDay.value}
            setBirthDate={setBirthDate}
            errorMessage={birthDay.error ? "Please select your birthdate" : ""}
            initialValue={dob}
            pickerFor="EditProfile"
          />
          <MobileNoInput
            label={"Mobile Number"}
            fullWidth={true}
            isValidationSet
            placeholder={"XXXX XXXX XX"}
            register={register}
            disableInput
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
          <InputDropdown2
            isValidationSet
            control={control}
            name={"insurance"}
            schema={bookAppointmentSchema.insurance}
            errorMessage={errors.insurance?.message}
            setValue={setValue}
            searchTerm={watch("insurance") ?? ""}
            label={"Select your insurance"}
            showDropdownIcon={true}
            options={insuranceList}
            nameKey={"insurance_company_name"}
            placeholder={"Select Insurance"}
            selectedOption={state}
            defaultId={state?.insurance_company}
            clearValueOnClick
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
        </div>
        <div className="flex flex-col space-y-1 md:space-y-4">
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
          <div className="md:w-[96%] grid md:grid-cols-4 md:gap-2 space-y-2 md:space-y-0">
            <div className="md:col-span-2">
              <InputDropdown2
                isValidationSet
                control={control}
                name={"state"}
                schema={registerSchema.state}
                errorMessage={errors.state?.message}
                setValue={setValue}
                searchTerm={watch("state") ?? ""}
                label={"State"}
                nameKey={"state_name"}
                textXs
                showDropdownIcon={true}
                options={stateList}
                placeholder={"State"}
                defaultId={state?.state_id}
                disableFilter={true}
                setSearchValue={handleStateSearch}
                setValueDuringChange
                clearValueOnClick={true}
              />
            </div>
            <div className="md:col-span-1">
              <InputDropdown2
                label="City"
                showDropdownIcon={false}
                options={cityList}
                placeholder={"City Name"}
                isValidationSet
                textXs
                control={control}
                name={"city"}
                nameKey={"city_name"}
                schema={registerSchema.city}
                errorMessage={errors.city?.message}
                setValue={setValue}
                searchTerm={watch("city") ?? ""}
                defaultId={state?.city_id}
                disableFilter={true}
                setSearchValue={handleCitySearch}
                disableInput={stateValue ? false : true}
                setValueDuringChange
                clearValueOnClick={true}
              />
            </div>
            <div className="md:col-span-1">
              <InputDropdown2
                label="Zip"
                fullWidth={true}
                placeholder="Zip Code"
                focusOnLoad={false}
                setValue={setValue}
                isValidationSet
                options={zipList}
                control={control}
                value={zipCode ? zipCode : ""}
                name={"zip"}
                nameKey={"zip"}
                schema={registerSchema.zip}
                errorMessage={errors.zip?.message}
                defaultId={state?.zip_code_id}
                disableFilter={true}
                setSearchValue={getAllZipWhenSearch}
                disableInput={cityValue ? false : true}
                setValueDuringChange
                clearValueOnClick={true}
                // errorMessage="Password must contain Alphanumeric chars"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-5 md:py-10">
        <GreenButton handleClick={updateProfile} additionalStyles={"w-[8rem] h-[3rem]"}>
            {isSubmitting ? (
                <div className="flex items-center justify-center h-full w-full">
                  <Image className="h-8" src={'/login/RollingLoaderWhite.svg'} staticUrl={RollingLoaderWhite} />
                </div>
              ) : (
                "Update"
              )}
        </GreenButton>
      </div>
    </div>
  );
};

export default EditProfile;