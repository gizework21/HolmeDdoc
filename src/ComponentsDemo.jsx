import React from "react";

function ComponentsDemo(props) {
  let list = [
    "Mobile Number",
    "OTP Verification",
    "Reset Password",
  ];
  const returnNewList = (list) => {
    // console.log(list)
  };
  return (
    <>
      {/* <div className="w-full flex flex-col lg:flex-row justify-between">
      <SearchFilter returnNewList={returnNewList} list={languageList} showLimit={3} title="Languages" />

      <StepsNew currentStep={1} list={list}/>
            <MobileNoInput
        label="First name"
        placeholder="Your first name"
        handleChange={handleChange}
        focusOnLoad={true}
        fullWidth={true}
      />
      <TextInput
        label="First name"
        placeholder="Your first name"
        nodeRef={nodeRef}
        focusOnLoad={true}
        handleChange={handleChange}
        errorMessage="Password must contain Alphanumeric chars"
      />
       <PasswordInput
        label="First name"
        placeholder="Your first name"
        nodeRef={nodeRef}
        fullWidth={true}
        errorMessage="Password must contain Alphanumeric chars"
      />
      <Otp />
      <BirthdayDatePicker />
      <RadioButton
        label={"Gender"}
        value={state}
        selectOption={(item) => setState(item)}
        options={Gender}
      /> //Get Gender data from DUMMY DATA 
      <InputDropdown label={"State"} showDropdownIcon={true} options={SearchItems} placeholder={"City Name"} selectedOption={state} selectOption={val => setState(val)} />
      <Checkbox label="label"   
          value={value},
          handleChange={handleChange},
          id,
          isChecked
      />
      <ExternalControlledCarousel/>
       <div className="w-full lg:w-[50%] overflow-hidden"> <MultiCarousel /></div>
      </div> */}
      {/* <div className="w-full lg:w-[50%] overflow-hidden"><MultiCarouselCustom/></div> */}
      {/* <Filter /> */}
      {/* <Accordion title={AccordionDummy.title} options={AccordionDummy.options}/> */}
      {/* <YellowHoverBlueButton name="test"/> */}
      {/* <MainHeaderText /> */}
      {/* <TopSearchedSpecialties/> */}
      {/* <Card
        name="Jonathan Chen, DO"
        type="Primary Care Doctor"
        tag="Highly Recommended"
        location="New York, NY"
        rating="4.86"
        review="261"
        desc="My appointment with Dr.Chen was amazing! Dr.Chen is very polite, friendly, and informative. His bedside manner is terrific. I get really nervous about seeing doctors and Dr.Chen made me very..."
      /> */}
      {/* <BlueButton name="See All"/>
      <YellowButton name="See All"/> */}
      {/* <div>
        {count}
        <br />
        <button
          onClick={() => {
            dispatch(decrement());
          }}
        >
          +
        </button>
        <br />
        <button
          onClick={() => {
            dispatch(increment());
          }}
        >
          -
        </button>
        <br />
      </div> */}
    </>
  );
}

export default ComponentsDemo;

//Availability Component(for displaying date and time)
// <Availability availabilty={AvailaibiltyData}/> get data from DUMMY DATA

//For Only Date Component
{/* <AvailabilityDate 
  availability={availability} 
  selectedDate={state} 
  selectDate={(idx) => setState(idx)}
  showCalendar
/> */}
//availability: array of dates
//selectedDate: current selected date(currently works using index)
//selectDate: function to select current date(set index of selected date)
//showCalender: boolean for calendar icon




