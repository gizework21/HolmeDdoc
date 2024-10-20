import React, { useState, useEffect, useCallback } from "react";
import GreenButton from "../../components/GreenButton";
import Navbar from "./Navbar";
import RadioButton from "../../components/inputs/RadioButton";
import { VisitType } from "../../utils/DummyData";
import InputDropdown2 from "../../components/inputs/InputDropdown2";
import AppointmentDatePicker from "../../components/inputs/AppointmentDatePicker";
import { DoctorList } from "../../data/urls";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NewFooter from "../../parts/NewFooter";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import {
  getAllCity
} from "../../services/master";
import _debounce from 'lodash/debounce';
import useQuery from '../../hooks/useQuery'
import HolmeddocLoader from "../../components/HolmeddocLoader";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFilters } from "../../redux/doctor/doctor.reducer";
import moment from 'moment'
import customAxios from '../../utils/CustomAxios'
const schema = Joi.object({
  address: Joi.object()
    .keys({
      id: Joi.number().required(),
      city_name: Joi.string().required(),
    })
    .required()
    .messages({
      "any.required": "Address is required",
      "object.base": "Address is required",
    }).unknown(),
  condition: Joi.object()
    .keys({
      id: Joi.string().required(),
      title: Joi.string().required(),
    })
    .required()
    .messages({
      "any.required": "Specialty is required",
      "object.base": "Specialty is required",
    }).unknown()
});

const BookTopDoctorAppointment = () => {
  const [type, selectType] = useState(VisitType[0]);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(schema),
  });

  const [appointmentDate, setAppointmentDate] = useState({
    value: '',
    error: false,
    gwFormat: new Date()
  });
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    const temp = data.condition.id.split('-')
    let url = `?selected_date=${moment(appointmentDate.gwFormat).format("YYYY-MM-DD")}` 
    if(temp[1] === 'Speciality'){
      url += `&specialty=${data.condition.seo_url}`
      dispatch(setSelectedFilters({ filterName: 'medical_speciality_name', selected: [parseInt(temp[0])] }))
    }else{
      url += `&condition=${data.condition.seo_url}`
      dispatch(setSelectedFilters({ filterName: 'medical_condition_name', selected: [parseInt(temp[0])] }))
    }
    url += `&location=${data.address.city_name}_${data.address.id}&visit_type=${type.title}`
    // url += `&selected_date=${moment(appointmentDate.gwFormat).format("YYYY-MM-DD")}`
    dispatch(setSelectedFilters({
      filterName: 'appointment_type', 
      selected: [type.id - 1]
    }))
    navigate(DoctorList + url);
  };

  const bookAppointment = (e) => {
    e.preventDefault();
    if (!appointmentDate.value) {
      setAppointmentDate({ value: null, error: true });
    }
    handleSubmit(onSubmit)(e);
  };

  const handleAppointmentDateChange = (date, unformattedDate) => {
    setAppointmentDate({ value: date, error: false, gwFormat: unformattedDate });
  };

  const query = useQuery()

  const cityParamId = query.get('city_id')

  const [cityList, setCityList] = useState([]); // for listing out city
  const [specialityCondition, setSpecialityCondition] = useState([]); // for listing out speciality and condition

  const getCity = async (searchTerm, id) => {
    if(!searchTerm && !id) return
    const reqObj = { name: searchTerm }
    if(id){
      reqObj.zip_code_id = id
    }
    const result = await customAxios.post('/patient/master/areas', { ...reqObj });
    setCityList(result.data.data.result.map(el => ({city_name: el.city, id: el.zip_code_id})));
  }

  // const getSpecialities = async (searchTerm) => {
  //   // console.log(searchTerm)
  //   const specialities = await getAllSpeciality({
  //     name: searchTerm,
  //   });
  //   const conditions = await getAllMedicalConditions({
  //     name: searchTerm,
  //   });
    // const result = specialities?.map((item) => {
    //   let obj = {};
    //   obj.keyName = item.medical_speciality_name;
    //   obj.id = item.id + '-Speciality' ;
    //   obj.code = item.medical_speciality_code;
    //   return obj;
    // });
  //   const temp = conditions?.map((item) => {
  //     let obj = {};
  //     obj.keyName = item.medical_condition_name;
  //     obj.id = item.id + '-Condition';
  //     obj.code = item.medical_condition_code;
  //     return obj;
  //   });
  //   const arr = []
  //   if(result.length > 0){
  //     arr.push({ title: 'Specialities', id: 1, options: result  })
  //   }
  //   if(temp.length > 0){
  //     arr.push({ title: 'Conditions', id:2,  options: temp  })
  //   }
  //   setSpecialityCondition([...arr]);
  // }

  // useEffect(() => {
  //   getSpecialities('')
  // }, [])

  const { specialities, conditions } = useSelector(state => state.master)

  const getSpecialities = (searchTerm) => {
      const filteredSpecialities = specialities.filter(item => item.title.toLowerCase().includes(searchTerm)).map((item) => {
        let obj = {};
        obj.title = item.title;
        obj.id = item.id + '-Speciality' ;
        obj.seo_url = item.seo_url
        return obj;
      });
      const filteredConditions = conditions.filter(item => item.title.toLowerCase().includes(searchTerm)).map((item) => {
        let obj = {};
        obj.title = item.title;
        obj.id = item.id + '-Condition' ;
        obj.seo_url = item.seo_url
        return obj;
      });
      let arr = []
      if(filteredSpecialities.length > 0){
              arr.push({
                  title: 'Specialities',
                  id : arr.length,
                  options: filteredSpecialities
              })
      }
      if(filteredConditions.length > 0){
              arr.push({
                  title: 'Conditions',
                  id : arr.length,
                  options: filteredConditions
              })
      }
      setSpecialityCondition(arr)
  }

  useEffect(() => {
    getSpecialities('')
  }, [specialities, conditions])

  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    (async() => {
      setIsFetching(true)
      if(cityParamId){
        await getCity('', cityParamId)
      }
      setIsFetching(false)
    })()
  }, [cityParamId])

  // ! Cant search specialities with Capital letter on make an appointment page --> Ubaid
  const debounceSpecialityFn =_debounce((searchTerm) => getSpecialities(searchTerm.toLowerCase()), 1000)
  const debounceCityFn =_debounce((searchTerm) => getCity(searchTerm), 1000)


  return (
    <div className="flex flex-col">
      <Navbar />
      {isFetching && <div className="flex justify-center items-center"><div className="h-[50%]"><HolmeddocLoader /></div></div>}
      {!isFetching && <div className="relative flex-1 pb-20">
        <div className="hidden md:block w-[40rem] h-[20rem] lg:w-[50rem] lg:h-[25rem] rounded-br-full rounded-bl-full z-10 bg-green/[17%] absolute  left-1/2 transform -translate-x-1/2" />
        <div className="w-full flex justify-center relative z-40  md:mt-20">
          <div className="flex flex-col md:w-[32rem] lg:w-[34.5rem] bg-white px-10 py-20 md:rounded-xl md:shadow-md">
            <h1 className="md:text-size-8 lg:text-size-11 font-bold text-gray-800 tracking-[4.5px]">
              Book Top Doctors Appointment
            </h1>
            <span className="my-4 font-light text-size-5 text-gray-500 tracking-[0.4px]">
              Thinking to consult a doctor this week? Use Holmeddoc to find the
              best doctors near you.
            </span>
            <div className="space-y-4">
              <InputDropdown2
                nameKey={"city_name"}
                isValidationSet
                name={"address"}
                schema={schema.address}
                errorMessage={errors.address?.message}
                control={control}
                setValue={setValue}
                searchTerm={watch("city") ?? ""}
                size={"large"}
                showDropdownIconWithoutBorder={true}
                options={cityList}
                showDropdownWhenSearch={true}
                placeholder={"City"}
                fullWidth
                defaultId={cityParamId ? cityParamId : null}
                setSearchValue={debounceCityFn}
                disableFilter={true}
                clearValueOnClick={true}
              />
              <InputDropdown2
                nameKey={"title"}
                isValidationSet
                name={"condition"}
                schema={schema.condition}
                errorMessage={errors.condition?.message}
                control={control}
                setValue={setValue}
                searchTerm={watch("condition") ?? ""}
                size={"large"}
                showDropdownIconWithoutBorder={true}
                options={specialityCondition}
                placeholder={"Specialty, Condition"}
                fullWidth
                disableFilter={true}
                setSearchValue={debounceSpecialityFn}
                bifurcatedOptions
                clearValueOnClick={true}
              />
              <AppointmentDatePicker
                value={appointmentDate.value}
                setBirthDate={handleAppointmentDateChange}
                // errorMessage={
                //   appointmentDate.error
                //     ? "Please select an appointment date"
                //     : ""
                // }
              />
              <div className="space-y-2">
                <label className="text-size-6 tracking-[3px] text-gray-400">
                  Type of Visit
                </label>
                <RadioButton
                  value={type}
                  options={VisitType}
                  selectOption={(item) => selectType(item)}
                  size="large"
                  fullWidth
                />
              </div>
              <div className="text-center">
                <GreenButton
                  type={'submit'}
                  handleClick={bookAppointment}
                  additionalStyles={
                    "w-[10rem] text-size-6 font-bold tracking-[3px]"
                  }
                >
                  Search
                </GreenButton>
              </div>
            </div>
          </div>
        </div>
      </div>}
      <NewFooter />
    </div>
  );
};

export default BookTopDoctorAppointment;

// import React, { useState } from "react";
// import GreenButton from "../../components/GreenButton";
// import Navbar from "./Navbar";
// import RadioButton from "../../components/inputs/RadioButton";
// import { VisitType } from "../../utils/DummyData";
// import InputDropdown from "../../components/inputs/InputDropdown";
// import { SearchItems, Boolean } from "../../utils/DummyData";
// import AppointmentDatePicker from "../../components/inputs/AppointmentDatePicker";
// import { bookTopDoctorAppointmentSchema } from "../../validationSchema/authSchema";
// import {  DoctorList } from "../../data/urls";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import NewFooter from "../../parts/NewFooter";

// const BookTopDoctorAppointment = () => {
//   const [type, selectType] = useState(VisitType[0]);
//   const [state, setState] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm();
//   const [appointmentDate, setAppointmentDate] = useState({
//     value: "",
//     error: false,
//   });

//   const navigate = useNavigate();

//   const onSubmit = (data) => {
//     console.log(data);
//     navigate(DoctorList);
//   };

//   const bookAppointment = () => {
//     if (!appointmentDate.value) {
//       setAppointmentDate({ value: null, error: true });
//     }
//     handleSubmit(onSubmit)();
//   };

//   const handleAppointmentDateChange = (date) => {
//     setAppointmentDate({ value: date, error: false });
//   };

//   return (
//     <div className="flex flex-col">
//       <Navbar />
//       <div className="relative flex-1 pb-20">
//         <div className="hidden md:block w-[40rem] h-[20rem] lg:w-[50rem] lg:h-[25rem] rounded-br-full rounded-bl-full z-10 bg-green/[17%] absolute  left-1/2 transform -translate-x-1/2" />
//         <div className="w-full flex justify-center relative z-40  md:mt-20">
//           <div className="flex flex-col md:w-[32rem] lg:w-[34.5rem] bg-white px-10 py-20 md:rounded-xl md:shadow-md">
//             <h1 className="md:text-size-8 lg:text-size-11 font-bold text-gray-800 tracking-[4.5px]">
//               Book Top Doctors Appointment
//             </h1>
//             <span className="my-4 font-light text-size-5 text-gray-500 tracking-[0.4px]">
//               Thinking to consult a doctor this week? Use Holmeddoc to find the
//               best doctors near you.
//             </span>
//             <div className="space-y-4">
//               <InputDropdown
//                 isValidationSet
//                 register={register}
//                 name={"address"}
//                 schema={bookTopDoctorAppointmentSchema.address}
//                 errorMessage={errors.address?.message}
//                 setValue={setValue}
//                 searchTerm={watch("address") ?? ""}
//                 size={"large"}
//                 showDropdownIconWithoutBorder={true}
//                 options={SearchItems}
//                 placeholder={"City, Zip Code"}
//                 fullWidth
//                 selectedOption={state}
//                 selectOption={(val) => setState(val)}
//               />
//               <InputDropdown
//                 isValidationSet
//                 register={register}
//                 name={"condition"}
//                 schema={bookTopDoctorAppointmentSchema.condition}
//                 errorMessage={errors.condition?.message}
//                 setValue={setValue}
//                 searchTerm={watch("condition") ?? ""}
//                 size={"large"}
//                 showDropdownIconWithoutBorder={true}
//                 options={SearchItems}
//                 placeholder={"Speciality, Condition, Doctor..."}
//                 fullWidth
//                 selectedOption={state}
//                 selectOption={(val) => setState(val)}
//               />
//               <InputDropdown
//                 isValidationSet
//                 register={register}
//                 name={"reason"}
//                 schema={bookTopDoctorAppointmentSchema.reason}
//                 errorMessage={errors.reason?.message}
//                 setValue={setValue}
//                 searchTerm={watch("reason") ?? ""}
//                 size={"large"}
//                 showDropdownIconWithoutBorder={true}
//                 options={SearchItems}
//                 placeholder={"Reason for visit"}
//                 fullWidth
//                 selectedOption={state}
//                 selectOption={(val) => setState(val)}
//               />
//               <AppointmentDatePicker
//                 value={appointmentDate.value}
//                 setBirthDate={handleAppointmentDateChange}
//                 errorMessage={
//                   appointmentDate.error
//                     ? "Please select an appointment date"
//                     : ""
//                 }
//               />
//               <div className="space-y-2">
//                 <label className="text-size-6 tracking-[3px] text-gray-400">
//                   Type of Visit
//                 </label>
//                 <RadioButton
//                   value={type}
//                   options={VisitType}
//                   selectOption={(item) => selectType(item)}
//                   size="large"
//                   fullWidth
//                 />
//               </div>
//               <div className="text-center">
//                 <GreenButton
//                   handleClick={bookAppointment}
//                   additionalStyles={
//                     "w-[10rem] text-size-6 font-bold tracking-[3px]"
//                   }
//                 >
//                   Search
//                 </GreenButton>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <NewFooter />
//     </div>
//   );
// };

// export default BookTopDoctorAppointment;
