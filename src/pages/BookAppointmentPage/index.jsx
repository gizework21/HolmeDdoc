import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DoctorCardMedium from "../../components/DoctorCards/DoctorCardMedium";
import GreenButton from "../../components/GreenButton";
import HolmeddocLoader from "../../components/HolmeddocLoader";
import Checkbox from "../../components/inputs/Checkbox";
import DateInput from "../../components/inputs/DateInput";
import TextInput from "../../components/inputs/TextInput";
import InputDropdown2 from "../../components/inputs/InputDropdown2";
import RadioButton from "../../components/inputs/RadioButton";
import { BookingSuccess, Login } from "../../data/urls";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { setBookingData } from "../../redux/bookingSuccess";
import { decrypt } from "../../utils/crypto";
import CustomAxios from "../../utils/CustomAxios";
import { Boolean, VisitType } from "../../utils/DummyData";
import { bookAppointmentSchema } from "../../validationSchema/authSchema";
import axios from 'axios';

const schema = Joi.object({
  insurance: Joi.object()
    .keys({
      id: Joi.number().required(),
      insurance_company_name: Joi.string().required(),
    })
    .required()
    .messages({
      "any.required": "Insurance is required",
      "object.base": "Insurance is required",
    }),
  condition: Joi.object()
    .keys({
      id: Joi.number().required(),
      medical_condition_name: Joi.string().required(),
    })
    .required()
    .messages({
      "any.required": "Condition is required",
      "object.base": "Condition is required",
    }),
  clinicAddress: Joi.object()
    .keys({
      id: Joi.number().required(),
      address: Joi.string().required(),
    })
    .required()
    .messages({
      "any.required": "Address is required",
      "object.base": "Address is required",
    }),
  certify: Joi.bool().invalid(false).required().messages({
    "any.invalid": "Please indicate that you have provided correct information",
  }),
});

const BookAppointmentPage = () => {
  const navigate = useNavigate();
  const [visited, selectVisited] = useState(Boolean[0]);
  const [type, selectType] = useState(VisitType[0]);
  const dispatch = useDispatch();
  const myRef = useRef(null);
  const bookingId = useParams().bookingId;

  // const query = useQuery()
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(schema),
  });
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  // const [availability, setAvailability] = useState({
  //   date: null,
  //   time: null,
  // });
  // const [availabilityError, setAvailabilityError] = useState("");
  const isLoggedIn = useIsLoggedIn();
  const [doctorEmail, setDoctorEmail] = useState("");
  const [selectedAppointmentTime, setSelectedAppointmentTime] = useState("");
  const [reasonForAppointment, setReasonForAppointment] = useState("");
  


  // console.log(doctorEmail)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Login);
    }
  }, [isLoggedIn, navigate]);

  // const availabilityData = useMemo(() => transformAvailability(data?.time_slots?.[type.title]), [data, type])

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      // const doctorId = query.get('doctor_id')
      // const dateId = query.get('date_id')
      // const timeId = query.get('time_id')
      // const type = query.get('type')
      const [doctorId, date, type, time, timeId] = decrypt(bookingId);
      // if(dateId){
      //   setAvailability(v => ({...v, date: parseInt(dateId)}))
      // }
      // if(timeId){
      //   setAvailability(v => ({...v, time: parseInt(timeId)}))
      // }
      if (type) {
        let typeId = type === "InPerson" ? 0 : 1;
        selectType(VisitType[typeId]);
      }
      const response = await CustomAxios.post("/patient/book_appointment", {
        doctor_id: doctorId,
      });
      if (response.data.success) {
        const appointmentTime =
          moment(date).format("dddd") +
          ", " +
          moment(date).format("MMMM Do") +
          ", " +
          time;
        setSelectedAppointmentTime(appointmentTime);
        setData(response.data.data?.result);
      }
      setIsFetching(false);
    })();
  }, []);

  // useEffect(() => {
  //   const dateId = query.get('date_id')
  //   const type = query.get('type')
  //   if(!availabilityData){
  //     return
  //   }
  //   if(!type && dateId){
  //     if(availabilityData?.[parseInt(dateId)]?.timeSlots?.length === 0){
  //       selectType(VisitType[1])
  //     }
  //   }
  // }, [availabilityData])

  // console.log(data)

  const createOrder = async (amount) => {
    try {
      const response = await fetch('http://localhost:5000/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: amount, // Send amount in paise
        })
      });
  
      // Check if the order creation was successful
      if (!response.ok) {
        throw new Error('Order creation failed');
        
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error creating order:", error);
      enqueueSnackbar("Error creating order:", {
        variant: "error",
      });
      return null; // Return null if order creation fails
    }
  };


   
   
       //directtly book function
  const onSubmitDirectly = async (formData) => {
    // if (!availability.time) {
    //   return;
    // }

    const paramArr = decrypt(bookingId);
    const doctorId = paramArr[0];
    const date = paramArr[1];
    const time = paramArr[3];
    const appointment_time_id = paramArr[4];
    const timeId = paramArr[5];
    // const id = query.get('doctor_id');
    // const fullDate = availabilityData.find((el, idx) => idx === availability.date).computedDate
    // const time = availabilityData.find((el, idx) => idx === availability.date).timeSlots.find(el => el.id === availability.time).time

    const reqObj = {
      doctor_id: doctorId,
      insurance_id: formData.insurance.id,
      medical_condition: formData.condition.id,
      visit_type: type.title,
      appointment_date: date,
      time_slot_id: timeId,
      appointment_time_id: appointment_time_id,
      reason_for_appointment: reasonForAppointment,
      transaction_id: "54nmggc65454",
      payment_status: "1",
    };
    console.log(reqObj);

    const obj = {
      doctorName: data.doctor_details.name,
      visitType: type.title,
      date: date,
      clinicAddress: formData.clinicAddress.address,
      time: time,
      condition: formData.condition.medical_condition_name,
      visitedBefore: visited.title,
      practiceArea: "",
      insurance: formData.insurance.insurance_company_name,
      reason: formData.condition.medical_condition_name,
      mail: doctorEmail,
    };
    try {
      const response = await CustomAxios.post(
        "/patient/save_appointment",
        reqObj
      );
      console.log("hello");
      if (response.data.success) {
        obj.appointment_number = response.data.data.result.appointment_number;
        dispatch(setBookingData(obj));
        navigate(BookingSuccess + `/${doctorId}`);
      } else {
        enqueueSnackbar(response.data.message, {
          variant: "error",
        });
      }
    } catch (err) {
      // console.log(err)
      enqueueSnackbar(err.message, {
        variant: "error",
      });
    }

   
  };

   



   
   const onSubmit = async (formData) => {
    // if (!availability.time) {
    //   return;
    // }
    const Amount = Number(data?.doctor_details?.consultation_rate);
    const order = await createOrder(Amount); // Example: 500 INR


    if (!order) {
      // If order creation fails, stop the function execution
      enqueueSnackbar("Failed to create payment order. Please try again.", {
        variant: "error",
      });
      return;
    }

    
    const handlePayment = async () => {
      const RAZORPAY_KEY = "rzp_live_xfQ1vi23l3sFzy";
      const options = {
        key: RAZORPAY_KEY, // Enter your Key ID
        amount: (order.amount * 100),
        currency: order.currency,
        name: "Holmeddoc",
        description: "Pay for your appointment with doctor",
        image: "/logo.png",
        order_id: order.id, // This is the order ID returned by Razorpay
        handler: function (response) {
          if (response.razorpay_payment_id) {
            // Payment successful
            alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
            processBooking(formData, order.id, response.razorpay_payment_id);
          } else {
            // Payment failed or was cancelled
            // alert('Payment failed or cancelled. Please try again.');
            enqueueSnackbar('Payment failed or cancelled. Please try again.', {
              variant: "error",
            });
            return; // Stop further execution if payment fails
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Your Business Address",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
  
    await handlePayment();
  };

const processBooking = async (formData, orderId, paymentId) => {
    const paramArr = decrypt(bookingId);
    const doctorId = paramArr[0];
    const date = paramArr[1];
    const time = paramArr[3];
    const appointment_time_id = paramArr[4];
    const timeId = paramArr[5];
    // const id = query.get('doctor_id');
    // const fullDate = availabilityData.find((el, idx) => idx === availability.date).computedDate
    // const time = availabilityData.find((el, idx) => idx === availability.date).timeSlots.find(el => el.id === availability.time).time

    const reqObj = {
      doctor_id: doctorId,
      insurance_id: formData.insurance.id,
      medical_condition: formData.condition.id,
      visit_type: type.title,
      appointment_date: date,
      time_slot_id: timeId,
      appointment_time_id: appointment_time_id,
      reason_for_appointment: reasonForAppointment,
      transaction_id: paymentId,
      payment_status: "1",
    };
    console.log(reqObj);

    const obj = {
      doctorName: data.doctor_details.name,
      visitType: type.title,
      date: date,
      clinicAddress: formData.clinicAddress.address,
      time: time,
      condition: formData.condition.medical_condition_name,
      visitedBefore: visited.title,
      practiceArea: "",
      insurance: formData.insurance.insurance_company_name,
      reason: formData.condition.medical_condition_name,
      mail: doctorEmail,
    };
    try {
      const response = await CustomAxios.post(
        "/patient/save_appointment",
        reqObj
      );
      console.log("hello");
      if (response.data.success) {
        obj.appointment_number = response.data.data.result.appointment_number;
        dispatch(setBookingData(obj));
        navigate(BookingSuccess + `/${doctorId}`);
      } else {
        enqueueSnackbar(response.data.message, {
          variant: "error",
        });
      }
    } catch (err) {
      // console.log(err)
      enqueueSnackbar(err.message, {
        variant: "error",
      });
    }
};   




  useEffect(() => {
    for (let key in errors) {
      if (key === "insurance" || key === "condition") {
        myRef.current.scrollIntoView();
      }
    }
  }, [errors]);

  const bookAppointment = (e) => {
    e.preventDefault();
    // if (!availability.time) {
    //   setAvailabilityError("Please select appointment time");
    // }
    handleSubmit(onSubmit)(e);
  };

  const bookAppointmentDirect = (e) => {
    e.preventDefault();
    // if (!availability.time) {
    //   setAvailabilityError("Please select appointment time");
    // }
    handleSubmit(onSubmitDirectly)(e);
  };


  // console.log(data?.doctor_details.consultation_rate)

  return (
    <div className="sm:mt-10 lg:mt-20 flex items-center justify-center">
      {isFetching && <HolmeddocLoader />}
      {!isFetching && (
        <div className="max-w-[770px] flex flex-col items-center justify-center space-y-10 md:space-y-20 p-5 mt-5 md:mt-0 md:py-16">
          <div ref={myRef}>
            <h1
              className="font-basic-sans-bold leading-[40px] md:leading-[70px] 
                text-size-11 md:text-[32px] text-gray-900 tracking-[3px] md:tracking-[7.8px] sm:text-center md:pb-3"
            >
              Book an appointment
            </h1>
            <span className="text-gray-500 text-size-5 md:text-size-7 font-thin">
              Fill out the below details and select the date and time to quickly
              book an appointment
            </span>
          </div>
          <div className="md:w-[90%] self-start space-y-3">
            <DoctorCardMedium
              info={data?.doctor_details}
              setDoctorEmail={setDoctorEmail}
            />
            <InputDropdown2
              isValidationSet
              control={control}
              name={"insurance"}
              schema={bookAppointmentSchema.insurance}
              errorMessage={errors.insurance?.message}
              setValue={setValue}
              fullWidth
              clearValueOnClick={true}
              label={"Select your insurance"}
              showDropdownIcon={true}
              options={data.insurance}
              nameKey={"insurance_company_name"}
              placeholder={"Select Insurance"}
              labelFont={"text-gray-600"}
            />
            <InputDropdown2
              isValidationSet
              control={control}
              name={"condition"}
              schema={bookAppointmentSchema.condition}
              errorMessage={errors.condition?.message}
              setValue={setValue}
              fullWidth
              clearValueOnClick={true}
              label={"What's the reason for your visit?"}
              showDropdownIcon={true}
              nameKey={"medical_condition_name"}
              options={data.conditions}
              placeholder={"Select Condition"}
              labelFont={"text-gray-600"}
            />
            <RadioButton
              value={visited}
              options={Boolean}
              fullWidth
              selectOption={(item) => selectVisited(item)}
              label={"Have you visited before?"}
              labelFont={"text-gray-600"}
            />
            <RadioButton
              value={type}
              options={VisitType}
              fullWidth
              disabled={true}
              selectOption={(item) => selectType(item)}
              label={"Type of Visit"}
              labelFont={"text-gray-600"}
            />
            <InputDropdown2
              isValidationSet
              control={control}
              name={"clinicAddress"}
              schema={bookAppointmentSchema.clinicAddress}
              errorMessage={errors.clinicAddress?.message}
              setValue={setValue}
              fullWidth
              nameKey={"address"}
              label={"Clinic address"}
              showDropdownIcon={true}
              options={data.clinic_address}
              placeholder={"Clinic Address"}
              labelFont={"text-gray-600"}
              defaultId={data?.clinic_address?.[0].id}
            />
            {/* <DateAndSlot
            labelFont={"text-gray-600"}
            setError={setAvailabilityError}
            availability={availabilityData}
            setAvailability={setAvailability}
            errorMessage={availabilityError}
            initialValue={availability}
          /> */}
            <DateInput
              placeholder="Appointment Time"
              defaultValue={selectedAppointmentTime}
              label={"Appointment Time"}
            />
            <TextInput
              label="Reason For Appointment"
              name="reasonForAppointment"
              placeholder="Enter your reason for appointment"
              fullWidth={true}
              register={(name, schema) => ({
                name,
                ...schema,
              })}
              isValidationSet={true}
              value={reasonForAppointment} 
              onChange={(e) => setReasonForAppointment(e.target.value)} 
              schema={bookAppointmentSchema.reasonForAppointment}
              errorMessage={errors.reasonForAppointment?.message}
            />

            <div className="py-1" />
            <Checkbox
              isValidationSet
              register={register}
              name={"certify"}
              schema={bookAppointmentSchema.certify}
              errorMessage={errors.certify?.message}
              fontColor="text-gray-900"
              label="I Certify that the information provided by me is accurate for insurance and payment"
            />
            <div className="w-full flex items-center justify-center py-6">
              <GreenButton handleClick={bookAppointment}>
               Pay and Book an appointment
              </GreenButton>
              <GreenButton handleClick={bookAppointmentDirect}>
                Book an appointment test Directly
              </GreenButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointmentPage;
